import { privateRoles } from "@/config";
import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";
import { ApplyStatus } from "@prisma/client";

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    if (!privateRoles.includes(session.user.role))
      return new Response("Unauthorized", { status: 401 });

    const applications = await db.apply.findMany({
      where: {
        postId: params.id,
      },
      include: {
        user: true,
      },
    });

    const order = {
      [ApplyStatus.CONFIRMED]: 1,
      [ApplyStatus.ACCEPTED]: 2,
      [ApplyStatus.PENDING]: 3,
      [ApplyStatus.VIEWED]: 4,
      [ApplyStatus.APPLIED]: 5,
      [ApplyStatus.REJECTED]: 6,
    };

    applications.sort((a, b) => order[a.status] - order[b.status]);

    return new Response(JSON.stringify(applications), {
      status: 200,
    });
  } catch (error) {
    return new Response("ERROR_GETTING_APPLICATIONS_FROM_POST", {
      status: 500,
    });
  }
}

export { GET };
