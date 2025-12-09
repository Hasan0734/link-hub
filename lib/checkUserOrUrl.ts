"use server";
import { profiles, shortLinks } from "./../db/schema";
import { db } from "@/db";
import { eq, or } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

export const checkUserOrUrl = async (text: string) => {
  const userProfile = await db.query.profiles.findFirst({
    where: eq(profiles.username, text),
  });

  if (userProfile) {
    return {
      status: true,
      message: "Found the user profile.",
      type: "PROFILE",
      ...userProfile,
    };
  }

  const shortLink = await db.query.shortLinks.findFirst({
    where: or(eq(shortLinks.customAlias, text), eq(shortLinks.shortCode, text)),
  });

  if (shortLink) {
    return {
      status: true,
      message: "Found the link",
      type: "LINK",
      ...shortLink
    };
  }
  notFound();
  //  redirect("/not-found")
};
