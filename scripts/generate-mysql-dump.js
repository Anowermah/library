const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('⚡ Step 1: Generating MySQL DDL schema via Prisma...');
  const mysqlSchemaPath = path.join(__dirname, '..', 'prisma', 'schema.mysql.prisma');
  
  // Ensure schema.mysql.prisma exists
  const baseSchema = fs.readFileSync(path.join(__dirname, '..', 'prisma', 'schema.prisma'), 'utf8');
  fs.writeFileSync(mysqlSchemaPath, baseSchema.replace('provider = "sqlite"', 'provider = "mysql"'));

  const ddlSql = execSync(`npx prisma migrate diff --from-empty --to-schema-datamodel "${mysqlSchemaPath}" --script`, {
    encoding: 'utf8',
    env: { ...process.env, DATABASE_URL: 'mysql://anowerit_library:dummy@localhost:3306/anowerit_library' }
  });

  console.log('⚡ Step 2: Extracting data from SQLite (dev.db)...');
  const prisma = new PrismaClient();
  
  // Helper to escape SQL values
  function escapeValue(val) {
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'boolean') return val ? 1 : 0;
    if (typeof val === 'number') return val;
    if (val instanceof Date) {
      return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
    }
    // String escape
    const escaped = String(val)
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\0/g, '\\0')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r');
    return `'${escaped}'`;
  }

  let dataSql = '\n-- ==============================================\n-- DATA INSERTS FROM SHUBBAN SQLITE DATABASE\n-- ==============================================\n';
  dataSql += 'SET NAMES utf8mb4;\n';
  dataSql += 'SET FOREIGN_KEY_CHECKS = 0;\n\n';

  // Find all models in Prisma
  const models = Object.keys(prisma).filter(k => 
    !k.startsWith('_') && 
    !k.startsWith('$') && 
    typeof prisma[k]?.findMany === 'function'
  );

  let totalRows = 0;
  for (const model of models) {
    try {
      const rows = await prisma[model].findMany();
      if (!rows || rows.length === 0) continue;

      totalRows += rows.length;
      console.log(`  -> Model ${model}: ${rows.length} rows`);

      const tableName = model; // In prisma, table names match model unless @@map
      const cols = Object.keys(rows[0]);
      
      dataSql += `-- Model: ${model} (${rows.length} rows)\n`;
      dataSql += `DELETE FROM \`${tableName}\`;\n`;
      
      const batchSize = 100;
      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        const colList = cols.map(c => `\`${c}\``).join(', ');
        const valuesList = batch.map(row => {
          return `(${cols.map(c => escapeValue(row[c])).join(', ')})`;
        }).join(',\n');

        dataSql += `INSERT INTO \`${tableName}\` (${colList}) VALUES\n${valuesList};\n`;
      }
      dataSql += '\n';
    } catch (err) {
      console.warn(`  ⚠️ Skipped ${model}: ${err.message}`);
    }
  }

  dataSql += 'SET FOREIGN_KEY_CHECKS = 1;\n';

  const finalSql = `-- ================================================================\n-- SHUBBAN LIBRARY — COMPLETE MYSQL / PHPMYADMIN DATABASE DUMP\n-- Generated on: ${new Date().toISOString()}\n-- Database: anowerit_library\n-- ================================================================\n\nSET FOREIGN_KEY_CHECKS = 0;\nSET NAMES utf8mb4;\n\n${ddlSql}\n\n${dataSql}`;

  const destPath = path.join(__dirname, '..', 'prisma', 'shubban-mysql-complete-import.sql');
  const rootDestPath = path.join(__dirname, '..', 'shubban-mysql-complete-import.sql');
  
  fs.writeFileSync(destPath, finalSql);
  fs.writeFileSync(rootDestPath, finalSql);

  console.log(`\n🎉 SUCCESS! Generated complete MySQL import file (${totalRows} total rows):`);
  console.log(`   -> ${destPath}`);
  console.log(`   -> ${rootDestPath}`);

  await prisma.$disconnect();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
