import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { NuxtAuthHandler } from '#auth';

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    newUser: '/auth/signup',
    signIn: '/auth/signin',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      // @ts-expect-error
      session.user = token.user;
      return session;
    },
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'username and password',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: any) => {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username.trim().toLowerCase(),
          },
        });

        if (!user) {
          return null;
        }

        const passwordValid = await compare(credentials.password.trim(), user.password);

        if (!passwordValid) {
          return null;
        }

        return {
          ...user,
          password: undefined,
        };
      },
    }),
  ],
});
