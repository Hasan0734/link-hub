"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import * as z from "zod";

const emailSchema = z.object({
  email: z.string().email("Please enter your register email"),
});

type emailSchemaType = z.infer<typeof emailSchema>;

export const sendVerificationEmail = async (data: emailSchemaType) => {
  const validation = emailSchema.safeParse(data);
  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    return {
      status: false,
      message: "Field validation failed",
      fieldErrors: errors,
    };
  }

  const res = await auth.api.sendVerificationEmail({
    body: {
      email: data.email,
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

export const sendResetPassLink = async (data: emailSchemaType) => {
  const validation = emailSchema.safeParse(data);
  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    return {
      status: false,
      message: "Field validation failed",
      fieldErrors: errors,
    };
  }

  const res = await auth.api.requestPasswordReset({
    body: {
      email: data.email,
      redirectTo: `${process.env.BETTER_AUTH_URL}/reset-password`,
    },
    headers: await headers(),
  });
  return res;
};
