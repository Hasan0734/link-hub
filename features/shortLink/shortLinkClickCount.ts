

import { db } from "@/db"
import { shortLinks } from "@/db/schema"

import { eq, sql } from "drizzle-orm"



export const UpdateLinkClickCount = async (id: string) => {

    try {
        const link = await db.query.shortLinks.findFirst({ where: eq(shortLinks.id, id) });

        if (!link) {
            console.log("Link not found")
        }

        await db.update(shortLinks).set({ clicks: sql`${shortLinks.clicks} + 1` }).where(eq(shortLinks.id, id))

        console.log('link clicked', id)
    } catch (error) {
        console.log(error)
    }
}