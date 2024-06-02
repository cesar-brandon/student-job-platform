import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <div className="flex flex-col gap-6 mt-16">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-full flex flex-col justify-between items-center gap-3 
          rounded-lg border bg-card text-card-foreground shadow-sm p-6"
        >
          <div className="w-full flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="w-full">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4 mb-2" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <Skeleton className="h-6 w-1/3" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
