import { PrismaClient } from '@prisma/client';

export * from '../../utils/schemas';

export const prisma = new PrismaClient();
