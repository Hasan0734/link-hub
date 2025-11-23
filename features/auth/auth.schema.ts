import * as z from "zod";

export const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at leas 2 char long")
    .max(100, "Name must be less than 100 char long"),
  username: z
    .string()
    .min(2, "Username must be at least 2 char long")
    .max(50, "Username must be less than 50 char long")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens"
    ),
  email: z
    .email("Please enter a valid email address")
    .trim()
    .max(255)
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/.*[A-Z].*/, "Password must contain at least one uppercase letter")
    .regex(/.*[a-z].*/, "Password must contain at least one lowercase letter")
    .regex(/.*\d.*/, "Password must contain at least one number")
    .regex(
      /.*[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export const registerUserWithConfirmSchema = registerUserSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserSchemaType = z.infer<typeof registerUserSchema>;
export type UserWithConfirmSchemaType = z.infer<typeof registerUserWithConfirmSchema>;



export const loginUserSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .trim()
    .max(255)
    .toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;