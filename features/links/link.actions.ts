"use server";
import { db } from "@/db";
import { links, pages } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getAuth } from "@/lib/getAuth";
import { revalidatePath } from "next/cache";
import { LinkSchema, LinkSchemaType } from "./link.schema";

export const createLink = async (data: LinkSchemaType) => {
  const validatedFields = LinkSchema.safeParse(data);

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


    const values = {
      title: data.title,
      url: data.url as string,
      icon: data.icon,
      color: data.color
    };

    await db.insert(links).values({ userId: user.id, ...values });

    revalidatePath("/links");

    // 4. Return a cleaner success object.
    return { status: true, message: "Link added successfully 🎉" };
  } catch (error: any) {
    console.error("Error creating link:", error);
    return {
      status: false,
      message: "Failed to create new link. A server error occurred.",
      error: error.message,
    };
  }
};

// export const updatePage = async (
//   data: PageSchemaType,
//   id: string
// ) => {
//   const validatedFields = PageSchema.safeParse(data);

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

//     const findItem = await db.query.pages.findFirst({
//       where: eq(pages.id, id),
//     });

//     if (!findItem) {
//       return {
//         status: true,
//         message: "Page doesn't not exist.",
//       };
//     }

//     const values = {
//       title: data.title,
//       slug: data.slug,
//       customDomain: data?.customDomain,
//       isPublic: data?.isPublic
//     };

//     await db
//       .update(pages)
//       .set({ ...values })
//       .where(and(eq(pages.userId, user.id), eq(pages.id, id)));

//     revalidatePath("/pages");

//     // 4. Return a cleaner success object.
//     return { status: true, message: "Page updated successfully 🎉" };
//   } catch (error: any) {
//     console.error("Error updating page:", error);
//     return {
//       status: false,
//       message: "Failed to update page. A server error occurred.",
//       error: error.message,
//     };
//   }
// };

export const deleteLink = async (id: string) => {
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
      .delete(links)
      .where(and(eq(links.id, id), eq(links.userId, user.id)));

    revalidatePath("/links");

    return {
      status: true,
      message: "Link deleted successfully.",
    };
  } catch (error) {
    return {
      status: false,
      message: "Link delete failed.",
    };
  }
};