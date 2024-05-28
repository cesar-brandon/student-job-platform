import { db } from "../../../lib/prisma";
import * as bcrypt from "bcrypt";
import { signToken } from "@/lib/jwt";

interface RequestBody {
  username: string;
  password: string;
}

const POST = async (request: Request) => {
  try {
    console.log("Request received", request);
    const body: RequestBody = await request.json();
    console.log("Parsed body", body);

    const user = await db.user.findFirst({
      where: {
        username: body.username,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    if (!(await bcrypt.compare(body.password, user.password || ""))) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { password, ...userWithoutPassword } = user;
    const accessToken = signToken(userWithoutPassword);
    const result = {
      ...userWithoutPassword,
      accessToken,
    };
    return new Response(JSON.stringify(result));
  } catch (error) {
    console.log("error", error);
    return new Response("Error", { status: 500 });
  }
};

export { POST };
