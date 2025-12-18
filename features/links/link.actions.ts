"use server";
import { db } from "@/db";
import { pages } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getAuth } from "@/lib/getAuth";
import { revalidatePath } from "next/cache";
import { PageSchema, PageSchemaType } from "./link.schema";

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

export const updatePage = async (
  data: PageSchemaType,
  id: string
) => {
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

    const findItem = await db.query.pages.findFirst({
      where: eq(pages.id, id),
    });

    if (!findItem) {
      return {
        status: true,
        message: "Page doesn't not exist.",
      };
    }

    const values = {
      title: data.title,
      slug: data.slug,
      customDomain: data?.customDomain,
      isPublic: data?.isPublic
    };

    await db
      .update(pages)
      .set({ ...values })
      .where(and(eq(pages.userId, user.id), eq(pages.id, id)));

    revalidatePath("/pages");

    // 4. Return a cleaner success object.
    return { status: true, message: "Page updated successfully 🎉" };
  } catch (error: any) {
    console.error("Error updating page:", error);
    return {
      status: false,
      message: "Failed to update page. A server error occurred.",
      error: error.message,
    };
  }
};

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