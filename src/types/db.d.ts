import { Bookmark, Comment, Post, User, Vote } from "@prisma/client";

export type ExtendedPost = Post & {
  votes: Vote[];
  author: User;
  comments: Comment[];
  bookmarks: Bookmark[];
};

export type Student = Student;
