import { headers } from "next/headers"
import { parseUserAgent } from "./parseUserAgent";

export const getClientMeta = async () => {
    const h = await headers();

    const ip =
        h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        h.get("x-real-ip") ??
        "0.0.0.0";

    const userAgent = h.get("user-agent") ?? "unknown";

    const result = parseUserAgent(userAgent);

    return { ip, userAgent: result.os }
}