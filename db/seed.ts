import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { users } from "./schema";

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL!,
  });

  await client.connect();
  const db = drizzle(client);

  console.log("🌱 Starting seed...");

  //users

  const user1 = await db
    .insert(users)
    .values({ password: "Jahid Hasan", email: "Jahid@example.com" });


     console.log("Users created:", user1);
}
