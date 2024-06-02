import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <div className="w-full px-4 sm:p-0 flex flex-col gap-4">
      <h1 className="hidden lg:block font-bold text-xl">Puestos aplicados</h1>
      <div className="w-full flex justify-between items-center rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="w-full p-4">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="m-4">
          <Skeleton className="h-6 w-10" />
        </div>
      </div>
    </div>
  );
}
