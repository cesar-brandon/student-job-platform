import { db } from "@/lib/prisma";

const GET = async (request: Request) => {
  if (!request.headers.get("identifier")) {
    return new Response("Email or code is required", { status: 400 });
  }
  const identifier = request.headers.get("identifier");
  let codeFilter = null;

  if (identifier) {
    const parsedValue = parseInt(identifier);
    if (!Number.isNaN(parsedValue)) {
      codeFilter = parsedValue;
    }
  }

  const student = await db.student.findFirst({
    where: {
      OR: [
        {
          email: identifier as string,
        },
        {
          code: codeFilter,
        },
      ],
    },
  });
  if (!student) return new Response("Student not found", { status: 404 });

  return new Response(JSON.stringify(student));
};

export { GET };
