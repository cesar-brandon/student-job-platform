import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

interface RequestBody {
  name: string;
  email: string;
}

const POST = async (request: Request) => {
  try {
    const body: RequestBody = await request.json();
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const enterprise = await db.enterprise.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });

    return new Response(JSON.stringify(enterprise));
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};

export { POST };
