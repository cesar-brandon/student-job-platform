import { Skeleton } from "@/components/ui/skeleton";

export function UserProfileFallback() {
  return (
    <Skeleton className="h-[15rem] w-full flex px-8 pb-10 items-center justify-start gap-6">
      <Skeleton className="bg-border w-16 h-16 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="bg-border h-4 w-40" />
        <Skeleton className="bg-border h-4 w-20" />
      </div>
    </Skeleton>
  );
}
