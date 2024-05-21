import { z } from "zod";

export const ProfileValidator = z.object({
  image: z.string().url(),
  presentation: z.string().max(160),
});

export type ProfileRequest = z.infer<typeof ProfileValidator>;
