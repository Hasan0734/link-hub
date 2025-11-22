"use server";

import { UserSchema } from "@/components/forms/RegisterForm";
import * as z from "zod";



export async function createUser(initialState: any, formData: FormData) {
  const validatedFields = UserSchema.safeParse({
    email: formData.get("email"),
  });
  // ...
}
