"use server";

import { db } from "@/db";
import { account, profiles, user } from "@/db/schema";
import bcrypt from "bcryptjs";
import {
  LoginUserSchemaType,
  registerUserSchema,
  UserSchemaType,
} from "@/features/auth/auth.schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

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
      },
    });
    return {success: true, message: "Login successful"};
  } catch (error) {
    return {
      success: false,
      message: "Login failed",
      error: error as Error,
    };
  }
};

//  try {
//     const checkUsername = await db
//       .select()
//       .from(profiles)
//       .where(eq(profiles.username, username));

//     if (checkUsername.length > 0) {
//       return {
//         success: false,
//         message: "Username already taken.",
//         fieldErrors: { username: "Username already taken." },
//       };
//     }

//     const existuser = await db.select().from(user).where(eq(user.email, email));

//     if (existuser.length > 0) {
//       return {
//         success: false,
//         message: "Email already in used.",
//         fieldErrors: { email: "This email is already registered." },
//       };
//     }

//     const [newUser] = await db
//       .insert(user)
//       .values({
//         email,
//         name,
//       })
//       .returning();

//     const _ = await db
//       .insert(account)
//       .values({ password: hashPaassword, userId: newUser.id });

//     await db
//       .insert(profiles)
//       .values({
//         name,
//         username,
//         userId: newUser.id,
//       })
//       .returning();

//     return { success: true, message: "Registration successful!" };
//   } catch (error: unknown) {
//     return {
//       success: false,
//       message: "User creation failed",
//     };
//   }
