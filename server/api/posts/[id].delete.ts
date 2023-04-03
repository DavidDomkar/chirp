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

  const id = event.context.params?.id;

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  }

  // @ts-expect-error
  if (post.authorId !== session.user.id) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    });
  }

  await prisma.post.delete({
    where: {
      id,
    },
  });

  sendNoContent(event, 200);
});
