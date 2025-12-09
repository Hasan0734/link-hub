import * as z from "zod";

export const ShortLinkSchema = z.object({
  originalUrl: z
    .string("Original url is requried!")
    .url("Please enter valied url"),
  shortCode: z
    .string("Original url is requried!")
    .min(8, "Short code must be 8 char.")
    .max(20, "Short code is too long"),
  customAlias: z
    .string()
    .min(8, "Custom alias must be 8 char.")
    .max(50, "Custom alias is too long.")
    .regex(/^[a-zA-Z0-9]+$/, "Only text accepted")
    .optional(),
  password: z.string().min(4, "Minimum 4 chart requried!").max(255).optional(),
  expiresAt: z.date("Please enter valied date.").optional(),
});

export type shortLinkSchemaType = z.infer<typeof ShortLinkSchema>;
