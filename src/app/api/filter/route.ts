import { db } from "@/lib/prisma";

export async function POST(req: Request): Promise<Response> {
  try {
    const { title, type, options } = await req.json();

    const filter = await db.filter.create({
      data: {
        title,
        type,
        options: options,
      },
    });

    return new Response(JSON.stringify(filter), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error post filter", { status: 500 });
  }
}

export async function GET(req: Request): Promise<Response> {
  try {
    const filters = await db.filter.findMany();
    return new Response(JSON.stringify(filters), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error get filters", { status: 500 });
  }
}
