import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Skeleton className="h-[20rem] w-full flex p-4 items-center justify-start gap-6" />
  );
}
