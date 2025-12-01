import * as z from "zod";

export const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/.*[A-Z].*/, "Password must contain at least one uppercase letter")
      .regex(/.*[a-z].*/, "Password must contain at least one lowercase letter")
      .regex(/.*\d.*/, "Password must contain at least one number")
      .regex(
        /.*[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password do not match.",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = passwordSchema.safeExtend({
  currentPassword: z.string().min(8, "Please give me the your password."),
});

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;

export type ForgotPasswodType = z.infer<typeof passwordSchema>;
