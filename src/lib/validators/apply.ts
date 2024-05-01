import { z } from "zod";

export const PostApplyValidator = z.object({
  postId: z.string(),
  // PostulationStatus: z.enum([
  //   "APPLIED",
  //   "VIEWED",
  //   "PENDING",
  //   "ACCEPTED",
  //   "REJECTED",
  // ]),
});

export type PostApplyRequest = z.infer<typeof PostApplyValidator>;
