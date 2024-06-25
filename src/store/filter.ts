import type { Filter } from "@prisma/client";
import { create } from "zustand";

interface State {
  allFilters: Filter[];
  isPending: boolean;
  setFilters: (filters: Filter[]) => void;
  setIsPending: (isPending: boolean) => void;
}

const useFilterStore = create<State>((set) => ({
  allFilters: [],
  isPending: false,
  setFilters: (filters) => {
    set({ allFilters: filters });
  },
  setIsPending: (isPending) => {
    set({ isPending });
  },
}));

export { useFilterStore };
