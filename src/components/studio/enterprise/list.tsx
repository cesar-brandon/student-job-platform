"use client";
import { EnterpriseDataTable } from "@/components/studio/enterprise/datatable";
import { Skeleton } from "@/components/ui/skeleton";
import { Enterprise } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function EnterpriseList() {
  const { data, isLoading } = useQuery<Enterprise[]>(
    ["enterprises"],
    async () => {
      const { data } = await axios.get("/api/enterprise");
      return data;
    },
  );

  if (isLoading) {
    return (
      <div className="px-6 pt-20">
        <Skeleton className="w-full h-[20rem]" />
      </div>
    );
  }

  return (
    <div className="px-6">{data && <EnterpriseDataTable data={data} />}</div>
  );
}
