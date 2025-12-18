"use server";
import { db } from "@/db";
import { shortLinks } from "@/db/schema";
import { and, eq, or } from "drizzle-orm";
import { getAuth } from "@/lib/getAuth";
import { ShortLinkSchema, shortLinkSchemaType } from "./shortLink.schema";
import { revalidatePath } from "next/cache";
import bycript from "bcryptjs";
import * as z from "zod";
import { redirect } from "next/navigation";

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
    const existingLink = await db
      .select({ shortCode: shortLinks.shortCode })
      .from(shortLinks)
      .where(
        or(
          eq(shortLinks.shortCode, data.shortCode),
          eq(shortLinks.customAlias, data.customAlias ? data.customAlias : "")
        )
      )
      .limit(1);

    if (existingLink.length > 0) {
      return {
        status: false,
        message: `The short code or alias '${data.shortCode}' is already in use. Please choose a different one.`,
      };
    }

    const values = {
      originalUrl: data.originalUrl,
      shortCode: data.shortCode,
      customAlias: data.customAlias,
      password: data?.password ? data.password : null,
      expiresAt: data.expiresAt,
    };

    await db.insert(shortLinks).values({ userId: user.id, ...values });

    revalidatePath("/short-urls");

    // 4. Return a cleaner success object.
    return { status: true, message: "Short link created successfully 🎉" };
  } catch (error: any) {
    console.error("Error creating short link:", error);
    return {
      status: false,
      message: "Failed to create new short link. A server error occurred.",
      error: error.message,
    };
  }
};

export const updateShortLink = async (
  data: shortLinkSchemaType,
  id: string
) => {
  const validatedFields = ShortLinkSchema.safeParse(data);

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
    // const existingLink = await db
    //   .select({ shortCode: shortLinks.shortCode })
    //   .from(shortLinks)
    //   .where(
    //     or(
    //       eq(shortLinks.customAlias, data.customAlias ? data.customAlias : "")
    //     )
    //   )
    //   .limit(1);

    // if (existingLink.length > 0) {
    //   return {
    //     status: false,
    //     message: `The short code or alias '${data.shortCode}' is already in use. Please choose a different one.`,
    //   };
    // }


    const findItem = await db.query.shortLinks.findFirst({
      where: eq(shortLinks.id, id),
    });

    if (!findItem) {
      return {
        status: true,
        message: "Short url doesn't not exist.",
      };
    }

    console.log(data.expiresAt)

    const values = {
      originalUrl: data.originalUrl,
      customAlias: data.customAlias,
      password: data?.password,
      expiresAt: data?.expiresAt,
    };

    await db
      .update(shortLinks)
      .set({ ...values })
      .where(and(eq(shortLinks.userId, user.id), eq(shortLinks.id, id)));

    revalidatePath("/short-urls");

    // 4. Return a cleaner success object.
    return { status: true, message: "Short link updated successfully 🎉" };
  } catch (error: any) {
    console.error("Error updating short link:", error);
    return {
      status: false,
      message: "Failed to update short link. A server error occurred.",
      error: error.message,
    };
  }
};

export const deleteShortLink = async (id: string) => {
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
      .delete(shortLinks)
      .where(and(eq(shortLinks.id, id), eq(shortLinks.userId, user.id)));

    revalidatePath("/short-urls");

    return {
      status: true,
      message: "Url deleted successfully.",
    };
  } catch (error) {
    return {
      status: false,
      message: "Url delete failed.",
    };
  }
};

const LinkPasswordSchema = z.object({
  password: z.string("Password is requred."),
});
