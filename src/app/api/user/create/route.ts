import { db } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

interface RequestBody {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

const POST = async (request: Request) => {
  const body: RequestBody = await request.json();

  const user = await db.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
      role: body.role,
    },
  });

  const { password, ...result } = user;
  return new Response(JSON.stringify(result));
};

export { POST };
