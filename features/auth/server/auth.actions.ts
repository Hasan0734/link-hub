"use server";

import { db } from "@/db";
import { profiles, users } from "@/db/schema";
import bcrypt from "bcryptjs";
import {
  LoginUserSchemaType,
  registerUserSchema,
  UserSchemaType,
} from "@/features/auth/auth.schema";
import { eq } from "drizzle-orm";


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

  const hashPaassword = await bcrypt.hash(password, 10);

  try {
    const checkUsername = await db
      .select()
      .from(profiles)
      .where(eq(profiles.username, username));

    if (checkUsername.length > 0) {
      return {
        success: false,
        message: "Username already taken.",
        fieldErrors: { username: "Username already taken." },
      };
    }

    const existuser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existuser.length > 0) {
      return {
        success: false,
        message: "Email already in used.",
        fieldErrors: { email: "This email is already registered." },
      };
    }

    const user = await db
      .insert(users)
      .values({
        email,
        password: hashPaassword,
      })
      .returning();

    await db
      .insert(profiles)
      .values({
        username,
        name,
        userId: user[0].id,
      })
      .returning();
     
    return { success: true, message: "Registration successful!" };
  } catch (error: unknown) {
    return {
      success: false,
      message: "User creation failed",
    };
  }
}

export async function loginUser(data: LoginUserSchemaType) {
  return { success: true, data };
}
