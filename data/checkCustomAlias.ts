"use server";
import { shortLinks } from "../db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getAuth } from "../lib/getAuth";

export const checkCustomAlias = async (alias: string) => {
  if (alias.length <= 8) {
    return {
      status: false,
      message: "Minimum 8 char.",
    };
  }
  const reg = /^[a-zA-Z0-9]+$/;
  if (!reg.test(alias)) {
    return {
      status: false,
      message: "Only text accepted.",
    };
  }

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
      message: "Not available",
    };
  }

  return { status: true, message: "Alias is available" };
};
