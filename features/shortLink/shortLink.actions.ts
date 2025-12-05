import { db } from "@/db";
import { shortLinks } from "@/db/schema";
import { getAuth } from "@/lib/getAuth";
import { ShortLinkSchema, shortLinkSchemaType } from "./shortLink.schema";

export const createShortLink = async (data: shortLinkSchemaType) => {
   const validatedFields = ShortLinkSchema.safeParse(data);
 
   if (!validatedFields.success) {
     const errors = validatedFields.error.flatten().fieldErrors;
 
     return {
       success: false,
       message: "Field validation failed",
       fieldErrors: errors,
     };
   }
 
    try {

    const values = {
        originalUrl: data.originalUrl,
        shortCode: data.shortCode,
        customAlias: data.customAlias,
        password: data.password,
        expiresAt: data.expiresAt
    }

    const session = await getAuth();
    const user = session?.user;

    if (!user?.id) {
      return {
        status: false,
        message: "User not authenticated",
      };
    }

    const created = await db.insert(shortLinks).values({userId: user.id, ...values });
 
    return created
} catch (error: any) {
    return {
      status: false,
      message: "Failed to create new short links.",
      error: error.message,
    };
  }
};
