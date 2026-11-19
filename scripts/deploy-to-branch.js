// scripts/deploy-to-branch.js — Automatically builds and pushes ready-to-run production bundle to 'production' branch on GitHub
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const STANDALONE_DIR = path.join(ROOT_DIR, '.next', 'standalone');

console.log('====================================================');
console.log('🚀 SHUBBAN LIBRARY — AUTOMATED GIT DEPLOYMENT');
console.log('====================================================');

// 1. Run Next.js Production Build
console.log('\n📦 Step 1: Building Next.js production bundle locally...');
execSync('npm run build', { cwd: ROOT_DIR, stdio: 'inherit' });

// 2. Prepare Standalone Bundle for cPanel
console.log('\n⚡ Step 2: Preparing cPanel standalone bundle...');
require('./prepare-cpanel.js');

// 3. Ensure .htaccess and .env are inside standalone
if (fs.existsSync(path.join(ROOT_DIR, '.htaccess'))) {
  fs.copyFileSync(
    path.join(ROOT_DIR, '.htaccess'),
    path.join(STANDALONE_DIR, '.htaccess')
  );
}
if (fs.existsSync(path.join(ROOT_DIR, 'public', '.htaccess'))) {
  const publicDest = path.join(STANDALONE_DIR, 'public');
  if (!fs.existsSync(publicDest)) fs.mkdirSync(publicDest, { recursive: true });
  fs.copyFileSync(
    path.join(ROOT_DIR, 'public', '.htaccess'),
    path.join(publicDest, '.htaccess')
  );
}

// 4. Ensure production .env exists with MySQL connection string
const envPath = path.join(STANDALONE_DIR, '.env');
const envContent = `DATABASE_URL="mysql://anowerit_library:L1S%7DE%2C%7BkP%3Fb45Kr@localhost:3306/anowerit_library"
NODE_ENV="production"
NEXTAUTH_SECRET="shubban-library-secret-key-328904712895719827591823"
NEXTAUTH_URL="https://library.atrbd.com"
`;
fs.writeFileSync(envPath, envContent);

// Copy MySQL dump to standalone for cPanel import
const sqlDumpSrc = path.join(ROOT_DIR, 'shubban-mysql-complete-import.sql');
if (fs.existsSync(sqlDumpSrc)) {
  fs.copyFileSync(sqlDumpSrc, path.join(STANDALONE_DIR, 'shubban-mysql-complete-import.sql'));
}

// 5. Initialize git in standalone and push to 'production' branch
console.log('\n🚀 Step 3: Pushing compiled production build to GitHub branch "production"...');
const runInStandalone = (cmd) => execSync(cmd, { cwd: STANDALONE_DIR, stdio: 'inherit' });

// Remove existing .git if present in standalone to start fresh
const gitDir = path.join(STANDALONE_DIR, '.git');
if (fs.existsSync(gitDir)) {
  fs.rmSync(gitDir, { recursive: true, force: true });
}

runInStandalone('git init -b production');
runInStandalone('git config user.name "Shubban Deployer"');
runInStandalone('git config user.email "deploy@shubban.com"');
runInStandalone('git remote add origin git@github.com:Anowermah/shubban-marketplace.git');
runInStandalone('git add -A');
runInStandalone('git commit -m "chore(release): automated production build for cPanel"');
runInStandalone('git push -f origin production');

console.log('\n====================================================');
console.log('🎉 SUCCESS! Production build pushed to branch: production');
console.log('Now in cPanel Terminal, you simply run:');
console.log('   cd /home/anowerit/library.atrbd.com');
console.log('   git pull origin production');
console.log('   touch tmp/restart.txt');
console.log('====================================================');
