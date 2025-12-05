import { shortLinks } from "./../db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getAuth } from "./getAuth";

export const getShortLinks = async () => {
  const session = await getAuth();

  if (!session) {
    return { status: true, message: "unauthenticated", data: [] };
  }

  const data = await db.query.shortLinks.findMany({
    where: eq(shortLinks.userId, session?.user.id),
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return { status: true, data };
};
