"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const sendVerificationEmail = async (email: string) => {
  const res = await auth.api.sendVerificationEmail({
    body: {
      email,
      callbackURL: "/",
    },
    headers: await headers(),
  });

  if (res.status) {
    return {
      ...res,
      message: "Email was sent successfully. Check your inbox.",
    };
  }

  return {
    ...res,
    message: "Sending email was failed. Contact us",
  };
};

export const sendResetPassLink = async (email: string) => {
  const res = await auth.api.requestPasswordReset({
    body: {
      email,
      redirectTo: `${process.env.BETTER_AUTH_URL}/reset-password`,
    },
    headers: await headers(),
  });

  return res;
};


