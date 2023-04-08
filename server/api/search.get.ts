import { H3Event } from 'h3';
import { useValidatedQuery } from 'h3-zod';
import { getServerSession } from '#auth';

export default defineEventHandler(async (event: H3Event) => {
  const session = await getServerSession(event);

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { q } = await useValidatedQuery(event, searchSchema);

  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: q,
      },
    },
    select: {
      name: true,
      username: true,
    },
  });

  return {
    users,
  };
});
