import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

const DELETE = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    await db.post.delete({ where: { id: params.id } });

    return new Response("Deleted");
  } catch (error) {
    return new Response("ERROR_DELETING_ENTERPRISE", { status: 500 });
  }
};

const PATCH = async (req: Request) => {
  try {
    const body = await req.json();

    const { title, content, filters, id, address } = PostValidator.parse(body);

    const session = await getAuthSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    await db.post.upsert({
      where: { id },
      create: {
        title,
        content,
        authorId: session.user.id,
        filters,
        address,
      },
      update: {
        title,
        content,
        filters,
        address,
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
};

export { DELETE, PATCH };
