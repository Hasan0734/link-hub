import * as z from "zod";

export const ShortLinkSchema = z.object({
  originalUrl: z.string("Original url is requried!"),
  shortCode: z
    .string("Original url is requried!")
    .max(20, "Short code is too long"),
  customAlias: z.string().max(50, "Custom alias is too long.").optional(),
  password: z.string().max(255).optional(),
  expiresAt: z.date().optional(),
});

export type shortLinkSchemaType = z.infer<typeof ShortLinkSchema>;
