"use server";
import { db } from "@/lib/prisma";
import { ApplyStatus } from "@prisma/client";

export default async function confirmApplication(
  postId: string,
  userId: string,
) {
  try {
    await db.apply.update({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
      data: {
        status: ApplyStatus.CONFIRMED,
      },
    });
    await db.apply.updateMany({
      where: {
        postId,
        userId: {
          not: userId,
        },
        status: {
          not: {
            in: [ApplyStatus.ACCEPTED, ApplyStatus.CONFIRMED],
          },
        },
      },
      data: {
        status: ApplyStatus.REJECTED,
      },
    });
  } catch (error) {
    throw new Error("No se pudo confirmar la aplicacion");
  }
}
