import type { Apply, Vote } from "@prisma/client";

export type CachedPost = {
  id: string;
  title: string;
  authorUsername: string;
  content: string;
  currentVote?: Vote["type"] | null;
  currentBookmark?: boolean;
  currentApply?: Apply["status"] | null;
  createdAt: Date;
};
