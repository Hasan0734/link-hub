"use server";

import { db } from "@/db";
import { profiles } from "@/db/schema";
import {
  LoginUserSchemaType,
  registerUserSchema,
  UserSchemaType,
} from "@/features/auth/auth.schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function createUser(data: UserSchemaType) {
  const validatedFields = registerUserSchema.safeParse(data);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Field validation failed",
      fieldErrors: errors,
    };
  }

  const { name, email, password, username } = validatedFields.data;

  try {
    const checkUsername = await db
      .select()
      .from(profiles)
      .where(eq(profiles.username, username));

    if (checkUsername.length > 0) {
      return {
        success: false,
        message: "Username already taken.",
      };
    }

    const res = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    await db.insert(profiles).values({
      name,
      username,
      userId: res.user.id,
    });

    return { success: true, message: "Registration successful!" };
  } catch (error) {
    return {
      success: false,
      message: "User creation failed",
      error: error as Error,
    };
  }
}

export const signIn = async (data: LoginUserSchemaType) => {
  try {
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
        rememberMe: true,
      },
    });
    return { success: true, message: "Login successful" };
  } catch (error) {
    return {
      success: false,
      message: "Login failed",
      error: error as Error,
    };
  }
};
