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
  password: z.union([
    z.literal(""),
    z.string().min(4, "Minimum 4 char required!").max(255),
  ]).optional().nullable(),

  expiresAt: z.preprocess(
    (val) => (val === "" ? null : val),
    z.date({ message: "Please select valid date." })
      .optional()
      .nullable()
  ),
});

export type shortLinkSchemaType = z.infer<typeof ShortLinkSchema>;
