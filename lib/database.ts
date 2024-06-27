import { PrismaClient } from '@prisma/client';

export default function getConnection() {
  const prisma = new PrismaClient();
  return prisma;
}