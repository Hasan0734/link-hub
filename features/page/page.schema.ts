import * as z from 'zod';
import slugify from 'slugify';


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
    customDomain: z.string().optional(),
    themeId: z.string().optional(),
})

export type PageSchemaType = z.infer<typeof PageSchema>