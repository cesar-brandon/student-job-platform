"use server";
import { db } from "@/lib/prisma";

export async function markNotificationAsRead(notificationId: string) {
  try {
    await db.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        read: true,
      },
    });
  } catch (error) {
    throw new Error("No se pudo marcar como leido el post");
  }
}
