// scripts/prepare-cpanel.js — Automates standalone packaging & anti-loop guards for cPanel deployment
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function copyRecursiveSync(src, dest, ignore = []) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      if (ignore.includes(childItemName)) return;
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName), ignore);
    });
  } else if (exists) {
    const parentDir = path.dirname(dest);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

console.log('================================================================');
console.log('🚀 SHUBBAN LIBRARY — PREPARING CPANEL STANDALONE DEPLOYMENT BUNDLE');
console.log('================================================================');

const rootDir = path.join(__dirname, '..');
const standaloneDir = path.join(rootDir, '.next', 'standalone');

if (!fs.existsSync(standaloneDir)) {
  console.error('❌ Error: .next/standalone folder not found. Please run "npm run build" first!');
  process.exit(1);
}

// 1. Copy public folder to .next/standalone/public
const publicSrc = path.join(rootDir, 'public');
const publicDest = path.join(standaloneDir, 'public');
console.log('📦 Step 1: Copying public/ assets to standalone...');
copyRecursiveSync(publicSrc, publicDest);

// 2. Copy .next/static to .next/standalone/.next/static
const staticSrc = path.join(rootDir, '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');
console.log('📦 Step 2: Copying .next/static to standalone...');
copyRecursiveSync(staticSrc, staticDest);

// 3. Copy prisma schema to .next/standalone/prisma
const prismaSrc = path.join(rootDir, 'prisma');
const prismaDest = path.join(standaloneDir, 'prisma');
console.log('📦 Step 3: Copying prisma schema to standalone...');
copyRecursiveSync(prismaSrc, prismaDest, ['dev.db', 'dev.db-journal', 'dev.db-wal', 'dev.db-shm', 'dev.db.bak', 'dev.db.bak2']);

// 3.1 Ensure standalone prisma schema uses MySQL for cPanel
const standaloneSchemaPath = path.join(prismaDest, 'schema.prisma');
const mysqlSchemaSrc = path.join(rootDir, 'prisma', 'schema.mysql.prisma');
if (fs.existsSync(mysqlSchemaSrc)) {
  fs.copyFileSync(mysqlSchemaSrc, standaloneSchemaPath);
} else if (fs.existsSync(standaloneSchemaPath)) {
  let sContent = fs.readFileSync(standaloneSchemaPath, 'utf8');
  sContent = sContent.replace('provider = "sqlite"', 'provider = "mysql"');
  fs.writeFileSync(standaloneSchemaPath, sContent);
}

// 3.2 Copy MySQL import dump directly into standalone root for easy access
const sqlDumpSrc = path.join(rootDir, 'shubban-mysql-complete-import.sql');
if (fs.existsSync(sqlDumpSrc)) {
  console.log('📦 Step 3.2: Copying shubban-mysql-complete-import.sql to standalone...');
  fs.copyFileSync(sqlDumpSrc, path.join(standaloneDir, 'shubban-mysql-complete-import.sql'));
}

// 4. Ensure production .env exists with MySQL connection string
console.log('⚙️ Step 4: Writing production .env with encoded MySQL credentials...');
const envDest = path.join(standaloneDir, '.env');
const envContent = `DATABASE_URL="mysql://anowerit_library:L1S%7DE%2C%7BkP%3Fb45Kr@localhost:3306/anowerit_library"
NODE_ENV="production"
NEXTAUTH_SECRET="shubban-library-secret-key-328904712895719827591823"
NEXTAUTH_URL="https://library.atrbd.com"
PORT=3000
`;
fs.writeFileSync(envDest, envContent);

// 5. Copy multi-platform Prisma engine binaries to standalone
const prismaClientSrc = path.join(rootDir, 'node_modules', '.prisma', 'client');
const prismaClientDest = path.join(standaloneDir, 'node_modules', '.prisma', 'client');
if (fs.existsSync(prismaClientSrc)) {
  console.log('📦 Step 5: Copying multi-platform Prisma engines (Linux RHEL/Debian & Windows) to standalone...');
  copyRecursiveSync(prismaClientSrc, prismaClientDest);
}

// 6. Copy .htaccess to standalone root
const htaccessSrc = path.join(rootDir, '.htaccess');
const htaccessDest = path.join(standaloneDir, '.htaccess');
if (fs.existsSync(htaccessSrc)) {
  console.log('📦 Step 6: Copying optimized Apache .htaccess to standalone...');
  fs.copyFileSync(htaccessSrc, htaccessDest);
}

// 7. Patch .next/standalone/server.js for Phusion Passenger & Anti-Loop Safeguards
const standaloneServerPath = path.join(standaloneDir, 'server.js');
if (fs.existsSync(standaloneServerPath)) {
  console.log('🛡️ Step 7: Injecting Phusion Passenger socket support & anti-loop safeguards into server.js...');
  let serverCode = fs.readFileSync(standaloneServerPath, 'utf8');

  // Insert Anti-Loop global handlers right at the top
  const antiLoopPreamble = `// [Anti-Loop Safeguard] Prevent CloudLinux NPROC exhaustion and rapid Passenger restart loops
process.on('uncaughtException', (err) => {
  console.error('[Anti-Loop] Uncaught Exception:', err);
  setTimeout(() => process.exit(1), 30000);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Anti-Loop] Unhandled Rejection:', reason);
  setTimeout(() => process.exit(1), 30000);
});
`;
  if (!serverCode.includes('[Anti-Loop]')) {
    serverCode = antiLoopPreamble + serverCode;
  }

  // Replace hardcoded port and hostname
  serverCode = serverCode.replace(
    /const currentPort = parseInt\(process\.env\.PORT, 10\) \|\| 3000\s*const hostname = process\.env\.HOSTNAME \|\| '0\.0\.0\.0'/,
    `const isRealPassenger = typeof PhusionPassenger !== 'undefined';
let currentPort;
let hostname;
if (isRealPassenger) {
  currentPort = 'passenger';
  hostname = undefined;
  try { PhusionPassenger.configure({ autoInstall: false }); } catch (e) {}
} else if (process.env.PORT && !isNaN(parseInt(process.env.PORT, 10))) {
  currentPort = parseInt(process.env.PORT, 10);
  hostname = process.env.HOSTNAME || '0.0.0.0';
} else if (process.env.PORT) {
  currentPort = process.env.PORT;
  hostname = undefined;
} else {
  currentPort = 3000;
  hostname = process.env.HOSTNAME || '0.0.0.0';
}`
  );

  // Replace fast-exit crash loop with 30s cooldown
  serverCode = serverCode.replace(
    /\.catch\(\(err\) => \{\s*console\.error\(err\);\s*process\.exit\(1\);\s*\}\);/,
    `.catch((err) => {
  console.error('[Anti-Loop] Fatal Next.js standalone server error:', err);
  // Sleep 30 seconds before exit to prevent Passenger rapid respawn loops
  setTimeout(() => {
    process.exit(1);
  }, 30000);
});`
  );

  fs.writeFileSync(standaloneServerPath, serverCode);
}

// 8. Package into shubban-ready-deploy.zip
const zipDest = path.join(rootDir, 'shubban-ready-deploy.zip');
console.log('\n🗜️ Step 8: Creating production deployment ZIP archive: shubban-ready-deploy.zip ...');
try {
  // Remove old zip if exists
  if (fs.existsSync(zipDest)) {
    fs.unlinkSync(zipDest);
  }
  // Create zip using tar
  execSync(`tar -a -c -f "${zipDest}" -C "${standaloneDir}" .`, { stdio: 'inherit' });
  const stat = fs.statSync(zipDest);
  console.log(`✅ shubban-ready-deploy.zip created successfully! (${(stat.size / (1024 * 1024)).toFixed(2)} MB)`);
} catch (err) {
  console.error('⚠️ Could not create zip archive automatically:', err.message);
}

console.log('\n================================================================');
console.log('🎉 ALL CPANEL DEPLOYMENT ARTIFACTS ARE READY!');
console.log('📍 Standalone directory: .next/standalone/');
console.log('📦 Deployment archive:   shubban-ready-deploy.zip');
console.log('🗄️ MySQL Database dump:  shubban-mysql-complete-import.sql');
console.log('================================================================');
