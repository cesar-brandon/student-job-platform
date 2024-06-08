import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen w-full">
      <div className="flex items-center justify-between px-4 py-[0.88rem]">
        <h1 className="text-xl font-bold">Usuarios</h1>
      </div>
      <Separator />
      <div className="px-6 pt-20">
        <Skeleton className="w-full h-[40rem]" />
      </div>
    </div>
  );
}
