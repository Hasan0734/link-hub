
"use server";

import bycript from 'bcryptjs';
import { db } from "@/db";
import { shortLinks } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as z from "zod"
import { redirect } from 'next/navigation';
import { UpdateLinkClickCount } from './shortLinkClickCount';


const LinkPasswordSchema = z.object({
    password: z.string("Password is requred."),
});

export async function checkPassword(
    prevState: { error?: string | null },
    formData: FormData
) {
    const validated = LinkPasswordSchema.safeParse({
        password: formData.get("password"),
    });

    if (!validated.success) {
        return { error: "Password is required" };
    }

    const submittedPassword = validated.data.password;

    const link = await db.query.shortLinks.findFirst({
        where: eq(shortLinks.id, formData.get("id") as string),
    });

    if (!link) {
        return { error: "Invalid link" };
    }
    if (!link.password) {
        return { error: "Incorrent password" }
    }
    // const compairePassword = bycript.compareSync(
    //     submittedPassword,
    //     link.password
    // );

    if (link.password !== submittedPassword) {
        return { error: "Incorrect password" };
    }

    if (link.expiresAt && link.expiresAt < new Date()) {
        return { error: "Link is expired." }
    }
    await UpdateLinkClickCount(link.id)

    redirect(link.originalUrl)

}
