import { getAuthSession } from "@/lib/auth";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, content, filters, id } = PostValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.post.create({
      data: {
        title,
        content,
        filters,
        authorId: session.user.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "No se pudo publicar en este momento. Inténtalo más tarde",
      { status: 500 },
    );
  }
}
