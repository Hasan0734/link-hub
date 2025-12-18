import * as z from 'zod';
import slugify from 'slugify';

const DOMAIN_REGEX =
    /^(?!:\/\/)(?=.{1,253}$)(?!\-)(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;



export const PageSchema = z.object({
    title: z.string("Title is requried!.")
        .min(4, "At least 4 characters.")
        .max(100),
    slug: z.string("URL slug is requried!.")
        .min(2, "At least 2 characters.")
        .max(50)
        .trim()
        .transform(value => {

            return slugify(value);
        }),
    customDomain: z.string().trim()
        .toLowerCase()
        .refine((val) => !val.includes("/"), {
            message: "Domain must not contain paths",
        })
        .refine((val) => !val.includes(":"), {
            message: "Domain must not include ports or protocols",
        })
        .refine((val) => DOMAIN_REGEX.test(val), {
            message: "Invalid domain format",
        }).nullable().optional(),
    themeId: z.string().optional().nullable(),
    isPublic: z.boolean().optional().nullable().transform(v => !!v),
    displayOrder: z.number().optional().nullable(),


})

export type PageSchemaType = z.infer<typeof PageSchema>