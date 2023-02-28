import { prisma } from '../utils/prisma';

export default defineNitroPlugin(async (_) => {
  await prisma.$connect();
});
