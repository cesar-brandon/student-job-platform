import { EnterpriseDataTable } from "@/components/studio/enterprise/datatable";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/prisma";

export const metadata = {
  title: "Empresas",
  description: "Pagina de empresas",
};

export default async function EnterprisePage() {
  const enterprises = await db.enterprise.findMany();
  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center justify-between px-4 py-[0.88rem]">
        <h1 className="text-xl font-bold">Empresas</h1>
      </div>
      <Separator />
      <div className="px-6">
        <EnterpriseDataTable data={enterprises} />
      </div>
    </div>
  );
}
