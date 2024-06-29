import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";

async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const comments = await db.comment.findMany({
      where: {
        postId: params.id,
      },
      include: {
        author: true,
        votes: true,
        replies: {
          include: {
            author: true,
            votes: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(comments), {
      status: 200,
    });
  } catch (error) {
    return new Response("ERROR_GETTING_COMMENTS_FROM_POST", {
      status: 500,
    });
  }
}

export { GET };
