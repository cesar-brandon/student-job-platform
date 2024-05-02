import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { Student } from "@prisma/client";

const POST = async (request: Request) => {
  const body: Student[] = await request.json();

  const session = await getAuthSession();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const studentsData = body.map((student) => ({
    name: student.name,
    lastname: student.lastname,
    email: student.email,
    career: student.career,
    phoneNumber: student.phoneNumber,
    age: student.age,
    state: student.state,
    code: student.code,
    dni: student.dni,
  }));

  const filteredStudentsData = studentsData.filter(
    (student) => student.state === "Asistiendo" || student.state === "Promovido"
  );

  const students = await db.student.createMany({
    data: filteredStudentsData,
  });

  return new Response(JSON.stringify(students));
};

export { POST };
