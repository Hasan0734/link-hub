import * as z from "zod";

export const UserProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at leas 2 char long")
    .max(100, "Name must be less than 100 char long")
    .optional(),
  username: z
    .string()
    .min(2, "Username must be at least 2 char long")
    .max(50, "Username must be less than 50 char long")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens"
    )
    .optional(),


  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  themeId: z.string().optional(),
  image: z.file().optional()
});

export type UserProfileSchemaType = z.infer<typeof UserProfileSchema>;
