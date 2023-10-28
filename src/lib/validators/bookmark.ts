import { z } from "zod";


export const PostBookmarkValidator = z.object({
  postId: z.string(),
});

export type PostBookmarkRequest = z.infer<typeof PostBookmarkValidator>;
