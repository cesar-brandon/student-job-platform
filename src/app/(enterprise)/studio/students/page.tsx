import { StudentList } from "@/components/studio/student/list";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/prisma";

export const metadata = {
  title: "Estudiantes",
  description: "Students page",
};

export default async function StudentsPage() {
  const students = await db.student.findMany();

  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center justify-between px-4 py-[0.88rem]">
        <h1 className="text-xl font-bold">Estudiantes</h1>
        {/* <Tabs> */}
        {/*   <TabsList className="ml-auto"> */}
        {/*     <TabsTrigger */}
        {/*       value="all" */}
        {/*       className="text-zinc-600 dark:text-zinc-200" */}
        {/*     > */}
        {/*       Todos */}
        {/*     </TabsTrigger> */}
        {/*     <TabsTrigger */}
        {/*       value="unread" */}
        {/*       className="text-zinc-600 dark:text-zinc-200" */}
        {/*     > */}
        {/*       Egresados */}
        {/*     </TabsTrigger> */}
        {/*     <TabsTrigger */}
        {/*       value="with-user" */}
        {/*       className="text-zinc-600 dark:text-zinc-200" */}
        {/*     > */}
        {/*       Con usuario */}
        {/*     </TabsTrigger> */}
        {/*   </TabsList> */}
        {/* </Tabs> */}
      </div>
      <Separator />
      <StudentList initialStudents={students} />
    </div>
  );
}
