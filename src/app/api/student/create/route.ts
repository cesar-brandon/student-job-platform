import { db } from "@/lib/prisma";
import { Student } from "@prisma/client";

const POST = async (request: Request) => {
  const body: Student[] = await request.json();

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

  const students = await db.student.createMany({
    data: studentsData,
  });

  return new Response(JSON.stringify(students));
};

export { POST };
