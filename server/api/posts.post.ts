import { H3Event, useBase } from 'h3';
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

  const { content } = await useValidatedBody(event, createPostSchema);

  const post = await prisma.post.create({
    data: {
      // @ts-expect-error
      authorId: session.user.id,
      content,
    },
  });

  return post;
});
