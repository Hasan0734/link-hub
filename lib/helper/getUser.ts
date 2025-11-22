import { db } from '@/db';
import { users } from '@/db/schema';

async function getUsers() {
  return await db.select().from(users);
}

export default getUsers;
