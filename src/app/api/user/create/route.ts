import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

interface RequestBody {
  name: string;
  username: string;
  email: string;
  password: string;
  role?: UserRole;
  userId?: string;
}

const POST = async (request: Request) => {
  try {
    // const session = await getAuthSession();
    // if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const body: RequestBody = await request.json();

    let userAssociated = null;

    if (body.userId) {
      userAssociated = await db.user.findFirst({
        where: {
          id: body.userId,
        },
      });
    }

    if (!userAssociated || userAssociated === null) {
      const user = await db.user.create({
        data: {
          name: body.name,
          username: body.username,
          email: body.email,
          password: await bcrypt.hash(body.password, 10),
          role: body.role,
        },
      });

      const { password, ...result } = user;
      return new Response(JSON.stringify(result));
    }

    const user = await db.user.update({
      where: {
        id: body.userId,
      },
      data: {
        name: body.username,
        password: await bcrypt.hash(body.password, 10),
      },
    });

    const { password, ...result } = user;
    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};

export { POST };
