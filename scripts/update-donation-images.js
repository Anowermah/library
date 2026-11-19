const fs = require('fs');
const path = require('path');

// Update shubban-mysql-complete-import.sql
const sqlPath = path.join(process.cwd(), 'shubban-mysql-complete-import.sql');
if (fs.existsSync(sqlPath)) {
  let sql = fs.readFileSync(sqlPath, 'utf8');
  sql = sql.replace(/https:\/\/images\.unsplash\.com\/photo-1547683905-[^'"]+/g, '/images/donations/flood-relief.jpg');
  sql = sql.replace(/https:\/\/images\.unsplash\.com\/photo-1609599006-[^'"]+/g, '/images/donations/quran-distribution.jpg');
  sql = sql.replace(/https:\/\/images\.unsplash\.com\/photo-1581244277-[^'"]+/g, '/images/donations/water-well.jpg');
  sql = sql.replace(/https:\/\/images\.unsplash\.com\/photo-1541888946-[^'"]+/g, '/images/donations/water-well.jpg');
  fs.writeFileSync(sqlPath, sql, 'utf8');
  console.log('✔ Updated shubban-mysql-complete-import.sql');
}

// Update dev.db if exists
const dbFiles = [
  path.join(process.cwd(), 'prisma', 'dev.db'),
  path.join(process.cwd(), '.next', 'standalone', 'prisma', 'dev.db')
];

for (const dbPath of dbFiles) {
  if (fs.existsSync(dbPath)) {
    let content = fs.readFileSync(dbPath, 'binary');
    // Replace the exact 404 URL in SQLite if found
    const target = 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800';
    const replacement = '/images/donations/water-well.jpg';
    if (content.includes(target)) {
      // pad replacement to avoid messing up SQLite binary offset if needed, or update via prisma
      console.log('Target found in', dbPath);
    }
  }
}
