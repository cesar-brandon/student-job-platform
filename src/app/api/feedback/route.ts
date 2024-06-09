import getSession from "@/lib/getSession";
import { db } from "@/lib/prisma";

interface RequestBody {
  userId: string;
  score: number;
  text: string;
}

export async function POST(req: Request, res: Response) {
  try {
    const { userId, score, text }: RequestBody = await req.json();
    const session = await getSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const feedback = await db.feedback.create({
      data: {
        userId,
        score,
        text,
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("ERROR_CREATING_FEEDBACK", { status: 500 });
  }
}
