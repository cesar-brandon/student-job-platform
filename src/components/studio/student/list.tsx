import type { Student } from "@prisma/client";
import { StudentDataTable } from "./datatable";

export function StudentList({
  initialStudents,
}: {
  initialStudents: Student[];
}) {
  return (
    <div className="px-6">
      <StudentDataTable data={initialStudents} />
    </div>
  );
}
