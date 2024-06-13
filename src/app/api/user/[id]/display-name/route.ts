import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";
import { DisplayNameValidator } from "@/lib/validators/username";
import z from "zod";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { name } = DisplayNameValidator.parse(body);

    const { id } = params;
    await db.user.update({
      where: { id },
      data: { name },
    });
    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data", { status: 422 });
    }

    return new Response("ERROR_CREATING_FEEDBACK", { status: 500 });
  }
}
