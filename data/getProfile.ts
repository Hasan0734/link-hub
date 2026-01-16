import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getProfileData = async (userId: string) => {
  "use cache";

  const data = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });


  return data;
};
