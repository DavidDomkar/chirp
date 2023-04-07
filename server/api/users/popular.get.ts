import { H3Event } from 'h3';
import { getServerSession } from '#auth';

export default defineEventHandler(async (event: H3Event) => {
  const session = await getServerSession(event);

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const users = await prisma.user.findMany({
    take: 20,
    select: {
      name: true,
      username: true,
    },
    orderBy: {
      posts: {
        _count: 'desc',
      },
    },
  });

  return users;
});
