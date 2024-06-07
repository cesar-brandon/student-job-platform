"use client";
import { EnterpriseDataTable } from "@/components/studio/enterprise/datatable";
import { Enterprise } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function EnterpriseList() {
  const { data } = useQuery<Enterprise[]>(["enterprises"], async () => {
    const { data } = await axios.get("/api/enterprise");
    return data;
  });

  return (
    <div className="px-6">{data && <EnterpriseDataTable data={data} />}</div>
  );
}
