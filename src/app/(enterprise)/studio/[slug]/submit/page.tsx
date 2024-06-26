import { SubmitContent } from "@/components/studio/submit/content";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Crear oferta",
  description: "Crea una oferta de trabajo",
};

interface SubmitPageProps {
  params: {
    slug: string;
  };
}

export default function SubmitPage({ params }: SubmitPageProps) {
  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center gap-4 px-4 py-[0.88rem]">
        <h1 className="text-xl font-bold">Crear oferta</h1>
        <p className="ml-2 truncate text-sm text-gray-500">@{params.slug}</p>
      </div>
      <Separator />
      <Suspense fallback={<SubmitSkeleton />}>
        <SubmitContent />
      </Suspense>
    </div>
  );
}

function SubmitSkeleton() {
  return (
    <div className="w-full grid md:grid-cols-2 gap-6 p-10">
      <Skeleton className="w-full h-96" />
      <Skeleton className="w-full h-96" />
    </div>
  );
}
