import { db } from "@/lib/prisma";

const GET = async (request: Request) => {
  if (!request.headers.get("identifier")) {
    return new Response("Email or username is required", { status: 400 });
  }

  const user = await db.user.findFirst({
    where: {
      OR: [
        {
          email: request.headers.get("identifier") as string,
        },
        {
          name: request.headers.get("identifier") as string,
        },
      ],
    },
    select: {
      createdAt: true,
      name: true,
      Student: {
        select: {
          name: true,
          lastname: true,
          image: true,
        },
      },
    },
  });
  if (!user) return new Response("User not found", { status: 404 });

  return new Response(JSON.stringify(user));
};

export { GET };
