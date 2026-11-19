// scripts/prepare-cpanel.js — Automates standalone packaging for cPanel deployment
const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else if (exists) {
    const parentDir = path.dirname(dest);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

console.log('🚀 Preparing Next.js standalone bundle for cPanel...');

const standaloneDir = path.join(__dirname, '..', '.next', 'standalone');

if (!fs.existsSync(standaloneDir)) {
  console.error('❌ Error: .next/standalone folder not found. Please run "npm run build" first!');
  process.exit(1);
}

// 1. Copy public folder to .next/standalone/public
const publicSrc = path.join(__dirname, '..', 'public');
const publicDest = path.join(standaloneDir, 'public');
console.log('📦 Copying public/ assets to standalone...');
copyRecursiveSync(publicSrc, publicDest);

// 2. Copy .next/static to .next/standalone/.next/static
const staticSrc = path.join(__dirname, '..', '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');
console.log('📦 Copying .next/static to standalone...');
copyRecursiveSync(staticSrc, staticDest);

// 3. Copy prisma schema & sqlite db to .next/standalone/prisma
const prismaSrc = path.join(__dirname, '..', 'prisma');
const prismaDest = path.join(standaloneDir, 'prisma');
console.log('📦 Copying prisma/ schema and database to standalone...');
copyRecursiveSync(prismaSrc, prismaDest);

// 3.1 Ensure standalone prisma schema uses MySQL for cPanel
const standaloneSchemaPath = path.join(prismaDest, 'schema.prisma');
if (fs.existsSync(standaloneSchemaPath)) {
  let sContent = fs.readFileSync(standaloneSchemaPath, 'utf8');
  sContent = sContent.replace('provider = "sqlite"', 'provider = "mysql"');
  fs.writeFileSync(standaloneSchemaPath, sContent);
}

// 3.2 Copy MySQL import dump to standalone
const sqlDumpSrc = path.join(__dirname, '..', 'shubban-mysql-complete-import.sql');
if (fs.existsSync(sqlDumpSrc)) {
  fs.copyFileSync(sqlDumpSrc, path.join(standaloneDir, 'shubban-mysql-complete-import.sql'));
}

// 4. Ensure production .env exists with MySQL connection string
const envDest = path.join(standaloneDir, '.env');
const envContent = `DATABASE_URL="mysql://anowerit_library:L1S%7DE%2C%7BkP%3Fb45Kr@localhost:3306/anowerit_library"
NODE_ENV="production"
NEXTAUTH_SECRET="shubban-library-secret-key-328904712895719827591823"
NEXTAUTH_URL="https://library.atrbd.com"
`;
fs.writeFileSync(envDest, envContent);

// 5. Copy multi-platform Prisma engine binaries to standalone
const prismaClientSrc = path.join(__dirname, '..', 'node_modules', '.prisma', 'client');
const prismaClientDest = path.join(standaloneDir, 'node_modules', '.prisma', 'client');
if (fs.existsSync(prismaClientSrc)) {
  console.log('📦 Copying multi-platform Prisma engines (Linux & Windows) to standalone...');
  copyRecursiveSync(prismaClientSrc, prismaClientDest);
}

// 6. Patch .next/standalone/server.js for Phusion Passenger & Anti-Loop Safeguards
const standaloneServerPath = path.join(standaloneDir, 'server.js');
if (fs.existsSync(standaloneServerPath)) {
  console.log('🛡️ Patching standalone server.js with Phusion Passenger socket support & anti-loop guards...');
  let serverCode = fs.readFileSync(standaloneServerPath, 'utf8');

  // Replace hardcoded port and hostname
  serverCode = serverCode.replace(
    /const currentPort = parseInt\(process\.env\.PORT, 10\) \|\| 3000\s*const hostname = process\.env\.HOSTNAME \|\| '0\.0\.0\.0'/,
    `const isRealPassenger = typeof PhusionPassenger !== 'undefined';
let currentPort;
let hostname;
if (isRealPassenger) {
  currentPort = 'passenger';
  hostname = undefined;
} else if (process.env.PORT && !isNaN(parseInt(process.env.PORT, 10))) {
  currentPort = parseInt(process.env.PORT, 10);
  hostname = process.env.HOSTNAME || '0.0.0.0';
} else {
  currentPort = 3000;
  hostname = process.env.HOSTNAME || '0.0.0.0';
}`
  );

  // Replace fast-exit crash loop with 10s cooldown
  serverCode = serverCode.replace(
    /\.catch\(\(err\) => \{\s*console\.error\(err\);\s*process\.exit\(1\);\s*\}\);/,
    `.catch((err) => {
  console.error('Fatal Next.js standalone server error:', err);
  // Anti-loop safeguard: sleep 10 seconds before exit to prevent Passenger rapid respawn loops
  setTimeout(() => {
    process.exit(1);
  }, 10000);
});`
  );

  fs.writeFileSync(standaloneServerPath, serverCode);
}

console.log('\n✅ cPanel Standalone package successfully prepared in: .next/standalone/');
console.log('💡 You can now simply zip the contents of ".next/standalone" and upload to cPanel!');
