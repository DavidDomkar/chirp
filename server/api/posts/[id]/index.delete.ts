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

  await prisma.$transaction(async (tx) => {
    const post = await tx.post.findUnique({ where: { id } });

    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
      });
    }

    if (post.authorId !== session.user.id) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
      });
    }

    await tx.post.delete({
      where: {
        id,
      },
    });
  });

  sendNoContent(event);
});
