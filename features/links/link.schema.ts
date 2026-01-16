import * as z from 'zod';

export const LinkSchema = z.object({
    title: z.string("Title is requried!.")
        .min(4, "At least 4 characters.")
        .max(100),
    url: z.string().trim()
        .url("Invalid URL format.")
        .toLowerCase()
        .nullable(),
    icon: z.string().optional().nullable(),
    color: z.string().optional().nullable(),
    isActive: z.boolean().transform(v => !!v),
    displayOrder: z.number().optional().nullable(),


})

export type LinkSchemaType = z.infer<typeof LinkSchema>


// .refine((val) => !val.includes("/"), {
//             message: "URL must not contain paths",
//         })
//         .refine((val) => !val.includes(":"), {
//             message: "URL must not include ports or protocols",
//         })
//         .refine((val) => DOMAIN_REGEX.test(val), {
//             message: "Invalid URL format",
//         })