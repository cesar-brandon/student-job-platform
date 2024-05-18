import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const student = await db.student.findFirst({
      where: {
        userId: params.userId,
      },
      include: {
        User: {
          select: {
            image: true,
            username: true,
            name: true,
          },
        },
      },
    });
    if (!student) return new Response("Student not found", { status: 404 });
    return new Response(JSON.stringify(student));
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
