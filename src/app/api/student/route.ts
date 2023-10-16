import { db } from "@/lib/prisma";

export async function GET(request: Request) {
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

  try {
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
      include: {
        User: {
          select: {
            image: true,
          }
        }
      }
    });
    if (!student) return new Response("Student not found", { status: 404 });

    return new Response(JSON.stringify(student));
  } catch (error) {
    return new Response("Error", { status: 500 });
  }

};
