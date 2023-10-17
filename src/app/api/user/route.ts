import { db } from "@/lib/prisma";

const GET = async (request: Request) => {
  if (!request.headers.get("identifier")) {
    return new Response("Email or username is required", { status: 400 });
  }
  try {
    const user = await db.user.findFirst({
      where: {
        OR: [
          {
            email: request.headers.get("identifier") as string,
          },
          {
            username: request.headers.get("identifier") as string,
          },
        ],
      },
      select: {
        createdAt: true,
        name: true,
        username: true,
        image: true,
        Student: {
          select: {
            name: true,
            lastname: true,
          },
        },
      },
    });
    if (!user) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(user));
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};

export { GET };
