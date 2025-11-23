import { db } from '@/db';
import { user } from '@/db/schema';

async function getUsers() {
  return await db.select().from(user);
}

export default getUsers;
