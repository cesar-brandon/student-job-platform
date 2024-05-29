import { Apply, Bookmark, Comment, Post, User, Vote } from "@prisma/client";

export type ExtendedApply = Apply & {
  user: User;
};

export type ExtendedPost = Post & {
  votes: Vote[];
  author: User;
  comments: Comment[];
  bookmarks: Bookmark[];
  applies: Apply[];
  read?: boolean;
};

export type ExtendedPostApply = Post & {
  author: User;
  comments: Comment[];
  applies: ExtendedApply[];
  read?: boolean;
};

export type Student = Student;

export type ExtendedBookmark = Bookmark & {
  post: Post & {
    author: User;
  };
};

export type ExtendedApplyPost = Apply & {
  Post: Post & {
    author: User;
  };
};
