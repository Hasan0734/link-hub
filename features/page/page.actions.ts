"use server";
import { db } from "@/db";
import { pages } from "@/db/schema";
import { and, eq, or } from "drizzle-orm";
import { getAuth } from "@/lib/getAuth";
import { revalidatePath } from "next/cache";
import { PageSchema, PageSchemaType } from "./page.schema";

export const createPage = async (data: PageSchemaType) => {
    const validatedFields = PageSchema.safeParse(data);

    if (!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors;

        return {
            success: false,
            message: "Field validation failed",
            fieldErrors: errors,
        };
    }

    const session = await getAuth();
    const user = session?.user;

    if (!user?.id) {
        return {
            status: false,
            message: "User not authenticated",
        };
    }

    try {
        // 2. Check if the short code is already in use
        const existingPage = await db
            .select({ slug: pages.slug })
            .from(pages)
            .where(
                eq(pages.slug, data.slug ? data.slug : "")
            )
            .limit(1);

        if (existingPage.length > 0) {
            return {
                status: false,
                message: `This'${data.slug}' is already in use. Please choose a different one.`,
            };
        }

        const values = {
            title: data.title,
            slug: data.slug,
            customDomain: data.customDomain,
            themeId: data.themeId
        };

        await db.insert(pages).values({ userId: user.id, ...values });

        revalidatePath("/pages");

        // 4. Return a cleaner success object.
        return { status: true, message: "Page added successfully 🎉" };
    } catch (error: any) {
        console.error("Error creating page:", error);
        return {
            status: false,
            message: "Failed to create new apge. A server error occurred.",
            error: error.message,
        };
    }
};

// export const updateShortLink = async (
//   data: shortLinkSchemaType,
//   id: string
// ) => {
//   const validatedFields = ShortLinkSchema.safeParse(data);

//   if (!validatedFields.success) {
//     const errors = validatedFields.error.flatten().fieldErrors;

//     return {
//       success: false,
//       message: "Field validation failed",
//       fieldErrors: errors,
//     };
//   }

//   const session = await getAuth();
//   const user = session?.user;

//   if (!user?.id) {
//     return {
//       status: false,
//       message: "User not authenticated",
//     };
//   }

//   try {
//     // 2. Check if the short code is already in use
//     // const existingLink = await db
//     //   .select({ shortCode: shortLinks.shortCode })
//     //   .from(shortLinks)
//     //   .where(
//     //     or(
//     //       eq(shortLinks.customAlias, data.customAlias ? data.customAlias : "")
//     //     )
//     //   )
//     //   .limit(1);

//     // if (existingLink.length > 0) {
//     //   return {
//     //     status: false,
//     //     message: `The short code or alias '${data.shortCode}' is already in use. Please choose a different one.`,
//     //   };
//     // }


//     const findItem = await db.query.shortLinks.findFirst({
//       where: eq(shortLinks.id, id),
//     });

//     if (!findItem) {
//       return {
//         status: true,
//         message: "Short url doesn't not exist.",
//       };
//     }

//     console.log(data.expiresAt)

//     const values = {
//       originalUrl: data.originalUrl,
//       customAlias: data.customAlias,
//       password: data?.password,
//       expiresAt: data?.expiresAt,
//     };

//     await db
//       .update(shortLinks)
//       .set({ ...values })
//       .where(and(eq(shortLinks.userId, user.id), eq(shortLinks.id, id)));

//     revalidatePath("/short-urls");

//     // 4. Return a cleaner success object.
//     return { status: true, message: "Short link updated successfully 🎉" };
//   } catch (error: any) {
//     console.error("Error creating short link:", error);
//     return {
//       status: false,
//       message: "Failed to create new short link. A server error occurred.",
//       error: error.message,
//     };
//   }
// };

export const deletePage = async (id: string) => {
  const session = await getAuth();
  const user = session?.user;

  if (!user?.id) {
    return {
      status: false,
      message: "User not authenticated",
    };
  }

  try {
    await db
      .delete(pages)
      .where(and(eq(pages.id, id), eq(pages.userId, user.id)));

    revalidatePath("/pages");

    return {
      status: true,
      message: "Page deleted successfully.",
    };
  } catch (error) {
    return {
      status: false,
      message: "Page delete failed.",
    };
  }
};