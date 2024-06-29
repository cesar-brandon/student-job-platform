import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Skeleton className="h-[40rem] m-auto w-[90%] sm:w-full flex items-center justify-start gap-6 p-4 box-border" />
  );
}
