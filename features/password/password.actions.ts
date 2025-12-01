"use server";

import { headers } from "next/headers";
import {
  changePasswordSchema,
  ChangePasswordType,
  ForgotPasswodType,
} from "./password.schema";
import { auth } from "@/lib/auth";

export const changePassword = async (data: ChangePasswordType) => {
  const validation = changePasswordSchema.safeParse(data);
  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    return {
      success: false,
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
      success: true,
      message: "Password changed successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Password change failed.",
      error: error as Error,
    };
  }
};

export const forgotPassword = async (data: ForgotPasswodType) => {};
