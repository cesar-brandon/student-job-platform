import { cache } from "react";
import { db } from "@/lib/prisma";

const getUsers = async () => {
  const users = await db.user.findMany();
  return users;
};

export default cache(getUsers);
