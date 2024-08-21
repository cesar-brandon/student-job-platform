import { db } from "@/lib/prisma";

export async function notifyApplicationAccepted(userId: string) {
  await db.notification.create({
    data: {
      title: "Postulación aceptada",
      message:
        "¡Felicidades! Tu postulación ha sido aceptada. Por favor, procede a confirmar tu postulación para completar el proceso.",
      url: "/apply",
      userId,
    },
  });
}
