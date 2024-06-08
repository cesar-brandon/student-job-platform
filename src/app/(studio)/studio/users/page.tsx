import { UserDataTable } from "@/components/studio/user/datatable";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/prisma";

export const metadata = {
  title: "Usuarios",
  description: "Pagina de usuarios",
};

export default async function StudentsPage() {
  const users = await db.user.findMany({
    include: {
      Student: true,
    },
  });

  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center justify-between px-4 py-[0.88rem]">
        <h1 className="text-xl font-bold">Usuarios</h1>
      </div>
      <Separator />
      <div className="px-6">
        <UserDataTable data={users} />
      </div>
    </div>
  );
}
