import { getAuth } from './../lib/getAuth';
import { pages } from "./../db/schema";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";

export const getPages = async () => {
    const session = await getAuth();

    if (!session) {
        return { status: true, message: "unauthenticated", data: [] };
    }

    const data = await db.query.pages.findMany({
        where: eq(pages.userId, session?.user.id),
        orderBy: desc(pages.createdAt)
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return { status: true, data };
};
