"use server"
import { shortLinks } from "./../db/schema";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { getAuth } from "./getAuth";

export const checkCustomAlias = async (alias: string) => {
  const session = await getAuth();

  if (!session) {
    return { status: true, message: "Unauthenticated", data: [] };
  }

  const data = await db.query.shortLinks.findMany({
    where: eq(shortLinks.customAlias, alias),
  });

  
  if (data.length) {
    return {
      status: false,
      message: "This alias is available.",
    };
  }

  return { status: true, message: "Already taken!" };
};
