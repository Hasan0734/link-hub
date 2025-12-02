import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { schema } from "@/db/schema";
import VerifyEmail from "@/components/email/verify-email";
import sendEmail from "./helper/sendEmail";
import PasswordResetEmail from "@/components/email/password-reset-email";

export const auth = betterAuth({
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,

    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        user,
        url,
        token,
        subject: "Reset your password",
        template: PasswordResetEmail({
          username: user.name,
          email: user.email,
          resetUrl: url,
        }),
      });
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail({
        user,
        url,
        token,
        subject: "Verify your email",
        template: VerifyEmail({ username: user.name, verifyUrl: url }),
      });
    },
    expiresIn: 3600,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  plugins: [nextCookies()],
});
