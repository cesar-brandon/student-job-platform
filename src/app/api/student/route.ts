import { db } from "@/lib/prisma";

const GET = async (request: Request) => {
  if (!request.headers.get("identifier")) {
    return new Response("Email or code is required", { status: 400 });
  }
  // const identifier = request.headers.get("identifier");
  // let codeFilter = null;
  //
  // if (identifier) {
  //   if (!isNaN(identifier)) {
  //     codeFilter = parseInt(identifier);
  //   }
  // }

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
  if (!student) return new Response("Student not found", { status: 404 });

  return new Response(JSON.stringify(student));
};

export { GET };
