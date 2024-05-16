import { Apply, Bookmark, Comment, Post, User, Vote } from "@prisma/client";

export type ExtendedApply = Apply & {
  user: User;
};

export type ExtendedPost = Post & {
  votes: Vote[];
  author: User;
  comments: Comment[];
  bookmarks: Bookmark[];
  applies: ExtendedApply[];
  read?: boolean;
};

export type Student = Student;
