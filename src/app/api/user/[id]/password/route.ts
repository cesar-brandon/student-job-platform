import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { PasswordValidator } from "@/lib/validators/password";
import * as bcrypt from "bcrypt";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();

    const { verifyPassword } = PasswordValidator.parse(body);

    await db.user.update({
      where: { id: session.user.id },
      data: { password: await bcrypt.hash(verifyPassword, 10) },
    });

    return new Response("OK");
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
