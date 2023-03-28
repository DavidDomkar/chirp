import { Type } from '@sinclair/typebox';
import { hash } from 'bcrypt';

export default defineEventHandler(async (event) => {
  const { username, password } = await validateBody(
    event,
    Type.Object({
      username: Type.String({
        format: 'trimmed',
        minLength: 3,
      }),
      password: Type.String({
        format: 'trimmed',
        minLength: 8,
      }),
    }),
  );

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({
    data: {
      name: username,
      username: username.toLowerCase(),
      password: hashedPassword,
    },
  });

  sendNoContent(event, 201);
});
