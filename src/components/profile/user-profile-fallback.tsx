import { Skeleton } from "@/components/ui/skeleton";

export function UserProfileFallback() {
  return (
    <Skeleton className="h-[20rem] w-full flex p-4 items-center justify-start gap-6">
      <Skeleton className="relative bg-border w-[14rem] h-full rounded-lg">
        <div className="absolute bottom-0 space-y-2 p-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
      </Skeleton>
    </Skeleton>
  );
}
