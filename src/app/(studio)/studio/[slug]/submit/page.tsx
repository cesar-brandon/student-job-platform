import Submit from "@/components/studio/submit";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/prisma";

export const metadata = {
  title: "Crear oferta",
  description: "Crea una oferta de trabajo",
};

interface SubmitPageProps {
  params: {
    slug: string;
  };
}

export default async function SubmitPage({ params }: SubmitPageProps) {
  const filters = await db.filter.findMany();

  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center gap-4 px-4 py-[0.88rem]">
        <h1 className="text-xl font-bold">Crear oferta</h1>
        <p className="ml-2 truncate text-sm text-gray-500">@{params.slug}</p>
      </div>
      <Separator />
      <Submit filters={filters} />
    </div>
  );
}
