import { hash } from 'bcrypt';
import { H3Event } from 'h3';
import { useValidatedBody, z } from 'h3-zod';

export default defineEventHandler(async (event: H3Event) => {
  const { username, password } = await useValidatedBody(event, signUpSchema);

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (user) {
    throw createError({
      statusCode: 409,
      statusMessage: 'This username is already taken!',
    });
  }

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({
    data: {
      name: username,
      username,
      password: hashedPassword,
    },
  });

  sendNoContent(event, 200);
});
