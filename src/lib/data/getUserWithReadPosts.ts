import { cache } from "react";
import { db } from "@/lib/prisma";
import { Session } from "next-auth";

const getUserWithReadPosts = async (session: Session) => {
  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      readPosts: true,
    },
  });

  return user;
};
export default cache(getUserWithReadPosts);
