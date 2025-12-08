"use server";
import { db } from "@/db";
import { shortLinks } from "@/db/schema";
import { and, eq, or } from "drizzle-orm";
import { getAuth } from "@/lib/getAuth";
import { ShortLinkSchema, shortLinkSchemaType } from "./shortLink.schema";
import { revalidatePath } from "next/cache";
import bycript from "bcryptjs";
import { nanoid } from "nanoid";

export const createShortLink = async (data: shortLinkSchemaType) => {
  console.log(data);

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
    // 1. Determine the final short code: Use customAlias if provided, otherwise generate one.
    const finalShortCode = data.customAlias || nanoid(8);

    // 2. Check if the short code is already in use
    const existingLink = await db
      .select({ shortCode: shortLinks.shortCode })
      .from(shortLinks)
      .where(
        or(
          eq(shortLinks.shortCode, finalShortCode),
          eq(shortLinks.customAlias, data.customAlias ? data.customAlias : "")
        )
      )
      .limit(1);

    if (existingLink.length > 0) {
      return {
        status: false,
        message: `The short code or alias '${finalShortCode}' is already in use. Please choose a different one.`,
      };
    }

    const values = {
      originalUrl: data.originalUrl,
      shortCode: finalShortCode,
      customAlias: data.customAlias,
      password: data?.password ? bycript.hashSync(data.password, 10) : null,
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
