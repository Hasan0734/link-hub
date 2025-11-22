"use server";

import * as z from "zod";

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
  .min(8, "Password must be at least 8 characters long")
  .max(15, "Password cannot be more than 15 characters long")
  .regex(/.*[A-Z].*/, "Password must contain at least one uppercase letter")
  .regex(/.*[a-z].*/, "Password must contain at least one lowercase letter")
  .regex(/.*\d.*/, "Password must contain at least one number")
  .regex(/.*[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});

export async function createUser(initialState: any, formData: FormData) {
  const validatedFields = UserSchema.safeParse({
    email: formData.get("email"),
  });
  // ...
}
