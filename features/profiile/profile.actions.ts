"use server";

import { db } from "@/db";
import { profiles } from "@/db/schema";

import { UserProfileSchemaType } from "./profile.schema";
import { getAuth } from "@/lib/getAuth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateProfile = async (data: UserProfileSchemaType) => {
  try {
    // const { name, username, bio, avatarUrl, themeId } = data;

    const session = await getAuth();
    const user = session?.user;

    if (!user?.id) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    await db.update(profiles).set(data).where(eq(profiles.userId, user.id));
    revalidatePath("/settings");
    return { success: true, message: "User profile updated" };
  } catch (error) {
    return {
      success: false,
      message: "User profile update failed",
      error: error as Error,
    };
  }
};
