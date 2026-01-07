import * as z from 'zod';
import slugify from 'slugify';

const DOMAIN_REGEX =
    /^(?!:\/\/)(?=.{1,253}$)(?!\-)(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;



export const LinkSchema = z.object({
    title: z.string("Title is requried!.")
        .min(4, "At least 4 characters.")
        .max(100),

    url: z.string().trim()
        .url("Invalid URL format.")
        .toLowerCase()
        .nullable().optional(),
    icon: z.string().optional().nullable(),
    color: z.string().optional().nullable(),
    isActive: z.boolean().optional().nullable().transform(v => !!v),
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