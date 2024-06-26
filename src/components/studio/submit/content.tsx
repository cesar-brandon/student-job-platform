"use client";

import { useFilterStore } from "@/store/filter";
import Submit from ".";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function SubmitContent() {
  const { setFilters, setIsPending } = useFilterStore();

  useQuery(
    ["filters"],
    async () => {
      setIsPending(true);
      const { data } = await axios.get("/api/filter");
      return data;
    },
    {
      onSuccess: (data) => {
        setFilters(data);
        setIsPending(false);
      },
      staleTime: Infinity,
    },
  );

  return <Submit />;
}
