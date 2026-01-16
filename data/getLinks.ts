import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { getAuth } from "../lib/getAuth";
import { links } from "@/db/schema";

export const getLinks = async () => {
    const session = await getAuth();

    if (!session) {
        return { status: true, message: "unauthenticated", data: [] };
    }

    const data = await db.query.links.findMany({
        where: eq(links.userId, session?.user.id),
        orderBy: desc(links.createdAt)
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return { status: true, data };
};
