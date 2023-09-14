import { User } from "@prisma/client";
import { create } from "zustand";

interface State {
  user: User;
  getUser: (user: User) => void;
}

const useUserStore = create<State>((set) => ({
  user: null as any,
  getUser: (user) => {
    set({ user });
  },
}));

export { useUserStore } 
