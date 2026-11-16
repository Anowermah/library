import { PrismaClient } from '@prisma/client';

// Normalize DATABASE_URL for SQLite:
// Prisma resolves relative SQLite paths from the prisma/schema.prisma directory.
// 'file:./prisma/dev.db' improperly attempts to load 'prisma/prisma/dev.db'.
// Auto-correct to 'file:./dev.db' to ensure bulletproof stability across both local and cPanel environments.
let dbUrl = process.env.DATABASE_URL || 'file:./dev.db';

if (dbUrl.includes('file:./prisma/')) {
  dbUrl = dbUrl.replace('file:./prisma/', 'file:./');
  process.env.DATABASE_URL = dbUrl;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
