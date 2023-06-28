import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
  username: string;
  password: string;
}

const POST = async (request: Request) => {
  const body: RequestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.username,
    },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }
  if (!(await bcrypt.compare(body.password, user.password))) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { password, ...userWithoutPassword } = user;
  return new Response(JSON.stringify(userWithoutPassword));
};

export { POST };
