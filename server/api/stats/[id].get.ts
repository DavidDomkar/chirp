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

  const posts = await prisma.post.findMany({
    where: {
      authorId: session.user.id,
    },
    include: {
      _count: {
        select: {
          likes: true,
          dislikes: true,
        },
      },
    },
  });

  return {
    user: {
      name: session.user.name,
      username: session.user.username,
    },
    totalPosts: posts.length,
    totalLikes: posts.reduce((acc, post) => acc + post._count.likes, 0),
    totalDislikes: posts.reduce((acc, post) => acc + post._count.dislikes, 0),
  };
});
