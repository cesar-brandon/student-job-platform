import { notifyApplicationAccepted } from "@/actions/notification/application-accepted";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { ApplyStatusRequestBody } from "@/types/apply";
import { ApplyStatus } from "@prisma/client";

//WARNING: las rutas de las aplicaciones estan dispersas y desordenadas
export async function PATCH(req: Request) {
  try {
    const body: ApplyStatusRequestBody = await req.json();
    const { userId, postId, status } = body;

    const session = await getAuthSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    await db.apply.update({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
      data: { status },
    });
    if (status === ApplyStatus.ACCEPTED) {
      await notifyApplicationAccepted(userId);
    }

    return new Response("OK");
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
