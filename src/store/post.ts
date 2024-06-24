import type { Post, User } from "@prisma/client";
import { create } from "zustand";

export interface PostSelected extends Post {
  selected?: string;
  author: User;
}

interface State {
  post: PostSelected;
  setPost: (post: PostSelected) => void;
}

const usePostStore = create<State>((set) => ({
  post: null as any,
  setPost: (post) => {
    set({ post });
  },
}));

export { usePostStore };
