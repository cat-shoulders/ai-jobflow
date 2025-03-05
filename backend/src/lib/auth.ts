import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import * as schema from '@/db/schema';

export const auth = betterAuth({
  appName: 'AiJobProcessor',
  trustedOrigins: ['http://localhost:5173'],
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log(user, url, token);
      // await sendEmail({
      //   to: user.email,
      //   subject: 'Reset your password',
      //   text: `Click the link to reset your password: ${url}`,
      // });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // await sendEmail({
      //   to: user.email,
      //   subject: 'Verify your email address',
      //   text: `Click the link to verify your email: ${url}`,
      // });
    },
  },
});
