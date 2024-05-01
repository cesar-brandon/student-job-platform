import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { PostApplyValidator } from "@/lib/validators/apply";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { postId } = PostApplyValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // check if user is a student
    if (session.user.role !== "STUDENT") {
      return new Response("Unauthorized", { status: 401 });
    }

    // check if user has already applied to this post
    const existingApply = await db.apply.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    });

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    if (existingApply) {
      await db.apply.delete({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id,
          },
        },
      });

      return new Response("Apply deleted", { status: 200 });
    }

    await db.apply.create({
      data: {
        userId: session.user.id,
        postId,
      },
    });

    return new Response("Apply created", { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
}
