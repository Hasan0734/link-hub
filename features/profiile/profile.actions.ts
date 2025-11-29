"use server";

import { db } from "@/db";
import { profiles } from "@/db/schema";

import { UserProfileSchema, UserProfileSchemaType } from "./profile.schema";
import { getAuth } from "@/lib/getAuth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getProfileData } from "@/lib/getProfile";
import { uploadImage } from "@/lib/uploadImage";

export const updateProfile = async (data: UserProfileSchemaType) => {
  const validatedFields = UserProfileSchema.safeParse(data);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Field validation failed",
      fieldErrors: errors,
    };
  }

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

    if (data.image) {
      const image = new FormData();

      image.append("image", data.image);

      const imageData = await uploadImage(image);
      console.log({ imageData });
    }

    // const profile = await getProfileData(user.id);
    // if (!profile) {
    //   await db.insert(profiles).values({
    //     name: data.name as string,
    //     username: data.username as string,
    //     userId: user.id,
    //   });
    //   revalidatePath("/settings");
    //   revalidatePath("/profile")
    //   return { success: true, message: "User profile updated" };
    // }

    // await db.update(profiles).set(data).where(eq(profiles.userId, user.id));
    // revalidatePath("/settings");
    return { success: true, message: "User profile updated" };
  } catch (error) {
    return {
      success: false,
      message: "User profile update failed",
      error: error as Error,
    };
  }
};
