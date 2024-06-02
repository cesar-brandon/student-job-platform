import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const bookmarks = await db.bookmark.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        post: {
          include: {
            author: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(bookmarks), {
      status: 200,
    });
  } catch (e) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
