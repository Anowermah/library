const fs = require('fs');
const path = require('path');

console.log('🔍 Starting Comprehensive Leakage & Security Audit across codebase...\n');

const findings = [];

function walkDir(dir, callback) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (['node_modules', '.next', '.git', 'dist'].includes(item)) continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

// 1. Audit API routes for missing auth & leaking passwordHash
const srcDir = path.join(__dirname, '..', 'src');

walkDir(srcDir, (filePath) => {
  const relPath = path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
  const ext = path.extname(filePath);
  if (!['.ts', '.tsx', '.js', '.jsx', '.mjs'].includes(ext)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // Check 1: Leaking passwordHash in Prisma queries or API responses
  if (content.includes('prisma.user.') || content.includes('prisma.admin.')) {
    // Check if query selects or returns without filtering passwordHash
    lines.forEach((line, idx) => {
      if (line.match(/prisma\.user\.(findMany|findFirst|findUnique)/) && !content.includes('passwordHash') && !content.includes('select:')) {
        // Potential leak of passwordHash if entire user object is fetched and returned
        findings.push({
          file: relPath,
          line: idx + 1,
          category: 'security_data_leak',
          severity: 'high',
          issue: 'User fetched without select/omit projection; may leak passwordHash to client',
          snippet: line.trim()
        });
      }
    });
  }

  // Check 2: Direct return of user object containing passwordHash
  if (relPath.startsWith('src/app/api/') && content.includes('NextResponse.json(')) {
    lines.forEach((line, idx) => {
      if (line.match(/return\s+NextResponse\.json\(\s*\{\s*user\b/) || line.match(/return\s+NextResponse\.json\(\s*user\b/)) {
        if (!content.includes('delete user.passwordHash') && !content.includes('passwordHash: false') && !content.includes('excludePassword')) {
          findings.push({
            file: relPath,
            line: idx + 1,
            category: 'security_data_leak',
            severity: 'critical',
            issue: 'API directly returns user object in response; verify passwordHash is stripped',
            snippet: line.trim()
          });
        }
      }
    });
  }

  // Check 3: Admin API routes without auth/session validation
  if (relPath.startsWith('src/app/api/admin/')) {
    const hasAuthCheck = content.includes('getServerSession') || 
                         content.includes('verifyToken') || 
                         content.includes('verifyAdmin') || 
                         content.includes('authOptions') ||
                         content.includes('cookies()') ||
                         content.includes('headers()') ||
                         content.includes('role === \'ADMIN\'') ||
                         content.includes('role === \'SUPER_ADMIN\'');
    if (!hasAuthCheck) {
      findings.push({
        file: relPath,
        line: 1,
        category: 'security_rbac_leak',
        severity: 'critical',
        issue: 'Admin API route appears to lack authentication or admin role check',
        snippet: relPath
      });
    }
  }

  // Check 4: dangerouslySetInnerHTML without DOMPurify or sanitize
  if (content.includes('dangerouslySetInnerHTML')) {
    lines.forEach((line, idx) => {
      if (line.includes('dangerouslySetInnerHTML')) {
        const hasSanitize = content.includes('sanitize') || content.includes('DOMPurify') || content.includes('cleanHtml');
        if (!hasSanitize) {
          findings.push({
            file: relPath,
            line: idx + 1,
            category: 'security_xss_leak',
            severity: 'high',
            issue: 'dangerouslySetInnerHTML used without visible sanitization filter',
            snippet: line.trim()
          });
        }
      }
    });
  }

  // Check 5: Hardcoded secrets, keys, or passwords
  lines.forEach((line, idx) => {
    if (line.match(/(secret|password|apiKey|api_key|privateKey|token)\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}['"]/i)) {
      if (!line.includes('process.env') && !line.includes('NEXTAUTH_SECRET') && !line.includes('placeholder') && !line.includes('example')) {
        findings.push({
          file: relPath,
          line: idx + 1,
          category: 'security_credential_leak',
          severity: 'critical',
          issue: 'Possible hardcoded credential or token detected',
          snippet: line.trim().substring(0, 80)
        });
      }
    }
  });

  // Check 6: Path traversal in file handling or uploads
  if (content.includes('fs.readFile') || content.includes('fs.writeFileSync') || content.includes('fs.createReadStream')) {
    lines.forEach((line, idx) => {
      if (line.match(/path\.join\([^)]*params\./) || line.match(/path\.join\([^)]*req\./) || line.match(/path\.join\([^)]*body\./)) {
        if (!content.includes('basename') && !content.includes('normalize') && !content.includes('..')) {
          findings.push({
            file: relPath,
            line: idx + 1,
            category: 'security_path_traversal',
            severity: 'high',
            issue: 'Path joined with request/params without explicit path traversal validation',
            snippet: line.trim()
          });
        }
      }
    });
  }
});

console.log(`\n========================================`);
console.log(`Found ${findings.length} potential issues to verify:`);
console.log(`========================================\n`);

findings.forEach((f, i) => {
  console.log(`[${f.severity.toUpperCase()}] ${f.category} in ${f.file}:${f.line}`);
  console.log(`   Issue: ${f.issue}`);
  console.log(`   Code:  ${f.snippet}\n`);
});

fs.writeFileSync(path.join(__dirname, '..', 'leakage-audit-findings.json'), JSON.stringify(findings, null, 2));
