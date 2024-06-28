import { privateRoles } from "@/config";
import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";

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
