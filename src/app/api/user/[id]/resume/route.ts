import { z } from "zod";
import { db } from "@/lib/prisma";
import { ResumeValidator } from "@/lib/validators/resume";
import getSession from "@/lib/getSession";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { professionalSummary, skills, experience, projects } =
      ResumeValidator.parse(body);

    const session = await getSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const student = await db.student.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!student) return new Response("Student not found", { status: 404 });

    await db.student.update({
      where: {
        id: student.id,
      },
      data: {
        resume: {
          professionalSummary,
          skills: skills.map((skill) => ({ name: skill })),
          experience: experience.map((exp) => ({
            title: exp.title,
            company: exp.company,
            location: exp.location,
            startDate: new Date(exp.startDate),
            endDate: new Date(exp.endDate),
            description: exp.description,
          })),
          projects: projects.map((project) => ({
            name: project.name,
            description: project.description,
            url: project.url,
          })),
        },
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "No se pudo publicar en este momento. Inténtalo más tarde",
      { status: 500 },
    );
  }
}
