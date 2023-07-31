import { verifyToken } from "@/lib/jwt";
import { db } from "@/lib/prisma";

const GET = async (
  request: Request,
  { params }: { params: { id: number } }
) => {
  const accessToken = request.headers.get("Authorization");
  if (!accessToken || !verifyToken(accessToken)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userPosts = await db.post.findMany({
    where: { authorId: +params.id },
  });
  return new Response(JSON.stringify(userPosts));
};

export { GET };
