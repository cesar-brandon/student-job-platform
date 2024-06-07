import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

interface RequestBody {
  name: string;
  email: string;
  address: string;
  phone: string;
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
        address: body.address,
        phone: body.phone,
      },
    });

    return new Response(JSON.stringify(enterprise));
  } catch (error) {
    return new Response("ERROR_CREATING_ENTERPRISE", { status: 500 });
  }
};

const GET = async (request: Request) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const enterprises = await db.enterprise.findMany();
    return new Response(JSON.stringify(enterprises));
  } catch (error) {
    return new Response("ERROR_GETTING_ENTERPRISES", { status: 500 });
  }
};

export { POST, GET };
