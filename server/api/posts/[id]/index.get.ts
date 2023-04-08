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

  const posts = await prisma.post.findMany({
    where: {
      authorId: id,
    },
    include: {
      author: {
        select: {
          name: true,
          username: true,
        },
      },
      likes: {
        select: {
          user: {
            select: {
              name: true,
              username: true,
            },
          },
        },
      },
      dislikes: {
        select: {
          user: {
            select: {
              name: true,
              username: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return posts;
});
