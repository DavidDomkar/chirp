import { H3Event } from 'h3';
import { useValidatedBody } from 'h3-zod';
import { getServerSession } from '#auth';

export default defineEventHandler(async (event: H3Event) => {
  const session = await getServerSession(event);

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { content } = await useValidatedBody(event, postSchema);

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

  const updatedPost = await prisma.post.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });

  return updatedPost;
});
