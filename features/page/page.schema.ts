import * as z from 'zod';


export const PageSchema = z.object({
    title: z.string("Title is requried")
        .min(4, "At least 4 characters.")
        .max(100),
    slug: z.string("Slug is requried").max(50),
    customDomain: z.string().optional(),
    themeId: z.string().optional(),
})

export type PageSchemaType = z.infer<typeof PageSchema>