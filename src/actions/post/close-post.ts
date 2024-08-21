"use server";
import { db } from "@/lib/prisma";
import { PostStatus } from "@prisma/client";

export async function closePost(postId: string) {
  try {
    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        status: PostStatus.CLOSED,
      },
    });
  } catch (error) {
    throw new Error("No se pudo marcar como leido el post");
  }
}
