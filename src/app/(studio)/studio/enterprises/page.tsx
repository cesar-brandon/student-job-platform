import EnterpriseList from "@/components/studio/enterprise/list";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Empresas",
  description: "Pagina de empresas",
};

export default function EnterprisePage() {
  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center justify-between px-4 py-[0.88rem]">
        <h1 className="text-xl font-bold">Empresas</h1>
      </div>
      <Separator />
      <EnterpriseList />
    </div>
  );
}
