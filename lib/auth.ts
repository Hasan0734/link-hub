import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { schema } from "@/db/schema";
import VerifyEmail from "@/components/email/verify-email";
import sendEmail from "./helper/sendEmail";
import PasswordResetEmail from "@/components/email/password-reset-email";
import PasswordChanged from "@/components/email/password-changed";
import AccountDeletionConfirmation from "@/components/email/AccountDeletation";

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

    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        user,
        subject: "Reset your password",
        template: PasswordResetEmail({
          username: user.name,
          email: user.email,
          resetUrl: url,
        }),
      });
    },
    onPasswordReset: async ({ user }) => {
      await sendEmail({
        user,
        subject: "Password successfully changed",
        template: PasswordChanged({
          username: user.name,
          email: user.email,
        }),
      });
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        user,
        subject: "Verify your email",
        template: VerifyEmail({ username: user.name, verifyUrl: url }),
      });
    },
    expiresIn: 3600,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendEmail({
          user,
          subject: "Confirm your account deletion request",
          template: AccountDeletionConfirmation({ email: user.email, url }),
        });
      },
    },
  },

  plugins: [nextCookies()],
});
