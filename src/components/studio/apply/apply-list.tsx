import { ApplyCard } from "./apply-card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ExtendedApply } from "@/types/db";
import { NoItems } from "@/components/common/no-items";
import { Skeleton } from "@/components/ui/skeleton";

interface ApplicationProps {
  postId: string;
  applyCount: number;
}

export function ApplyList({ postId, applyCount }: ApplicationProps) {
  const { data: applies, isLoading } = useQuery(
    ["applies", postId],
    async () => {
      const { data } = await axios.get(`/api/post/${postId}/apply`);
      return data;
    },
  );

  return (
    <div className="grid grid-cols-fit gap-4 pt-4">
      {applies && applies.length > 0 ? (
        applies.map((apply: ExtendedApply) => (
          <ApplyCard key={apply.userId} apply={apply} />
        ))
      ) : isLoading ? (
        Array.from({ length: applyCount }).map((_, index) => (
          <div
            key={index}
            className="w-full flex justify-between items-center gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="w-[40%]">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/4" />
            </div>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-10" />
          </div>
        ))
      ) : (
        <NoItems text="No hay aplicaciones" />
      )}
    </div>
  );
}
