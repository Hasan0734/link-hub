

import { db } from "@/db"
import { shortLinks, shortLinkVisits } from "@/db/schema"
import { getClientMeta } from "@/lib/getClientMeta"

import { eq, sql } from "drizzle-orm"



export const UpdateLinkClickCount = async (id: string) => {

    try {

        const { ip, userAgent } = await getClientMeta();

        const link = await db.query.shortLinks.findFirst({ where: eq(shortLinks.id, id) });

        if (!link) {
            console.log("Link not found")
        }

        await db.update(shortLinks).set({ clicks: sql`${shortLinks.clicks} + 1` }).where(eq(shortLinks.id, id));
        const res = await db.insert(shortLinkVisits).values({ userAgent, ip, shortLinkId: id }).returning();

        console.log("Added user agent", res)

    } catch (error) {
        console.log(error)
    }
}