import { db } from "@/lib/prisma";

const GET = async (request: Request) => {
  if (!request.headers.get("identifier")) {
    return new Response("Email or username is required", { status: 400 });
  }

  const student = await db.student.findFirst({
    where: {
      OR: [
        {
          email: request.headers.get("identifier") as string,
        },
        {
          code: parseInt(request.headers.get("identifier") as string),
        },
      ],
    },
  });
  if (!student) return new Response("User not found", { status: 404 });

  return new Response(JSON.stringify(student));
};

export { GET };
