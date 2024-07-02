import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q");

  if (!q) return new Response("Consulta invalida", { status: 400 });

  const session = await getAuthSession();
  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  const results = await db.user.findMany({
    where: {
      OR: [
        {
          name: {
            startsWith: q,
          },
        },
        {
          username: {
            startsWith: q,
          },
        },
      ],
    },
    include: {
      _count: true,
    },
    take: 5,
  });

  return new Response(JSON.stringify(results));
}
