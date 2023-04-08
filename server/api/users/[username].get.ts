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

  const username = event.context.params?.username;

  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true, name: true, username: true },
  });

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  }

  return user;
});
