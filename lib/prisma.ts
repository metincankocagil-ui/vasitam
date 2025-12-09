// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

if (process.env.DEBUG?.includes('prisma')) {
  const filtered = process.env.DEBUG.split(',')
    .map((token) => token.trim())
    .filter((token) => token && !token.startsWith('prisma'));
  if (filtered.length > 0) {
    process.env.DEBUG = filtered.join(',');
  } else {
    delete process.env.DEBUG;
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: [],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
