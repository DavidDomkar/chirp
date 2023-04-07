import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Augment the default NextAuth types to include id in user data
   */
  interface Session {
    user: {
      id: string;
      username: string;
      name: string;
    } & DefaultSession['user'];
  }
}
