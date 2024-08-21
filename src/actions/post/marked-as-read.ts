"use server";
import { db } from "@/lib/prisma";

export async function markPostAsRead(postId: string, userId: string) {
  try {
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        readBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    throw new Error("No se pudo marcar como leido el post");
  }
}
