import { Apply, Bookmark, Comment, Post, User, Vote } from "@prisma/client";

export type ExtendedPost = Post & {
  votes: Vote[];
  author: User;
  comments: Comment[];
  bookmarks: Bookmark[];
  applies: Apply[];
};

export type Student = Student;
