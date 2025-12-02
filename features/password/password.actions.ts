"use server";

import { headers } from "next/headers";
import {
  changePasswordSchema,
  ChangePasswordType,
  passwordSchema,
  ResetPasswordType,
} from "./password.schema";
import { auth } from "@/lib/auth";

export const changePassword = async (data: ChangePasswordType) => {
  const validation = changePasswordSchema.safeParse(data);
  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    return {
      status: false,
      message: "Field validation failed",
      fieldErrors: errors,
    };
  }
  try {
    await auth.api.changePassword({
      body: {
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
        revokeOtherSessions: true,
      },
      headers: await headers(),
    });

    return {
      status: true,
      message: "Password changed successfully.",
    };
  } catch (error) {
    return {
      status: false,
      message: "Password change failed.",
      error: error as Error,
    };
  }
};

export const resetPassword = async (data: ResetPasswordType, token: string) => {
  const validation = passwordSchema.safeParse(data);
  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    return {
      status: false,
      message: "Field validation failed",
      fieldErrors: errors,
    };
  }

  const res = await auth.api.resetPassword({
    body: { newPassword: data.newPassword, token },
    headers: await headers(),
  });


  if (res.status) {
    return {
      ...res,
      message: "Password successfully.",
    };
  }

  return {
    ...res,
    message: "Something to wrong to change password.",
  };
};
