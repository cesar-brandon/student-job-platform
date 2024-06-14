import { z } from "zod";

export const ProfileValidator = z.object({
  // image: z.string().url(),
  bio: z.string().max(160, {
    message: "La presentación no puede superar los 160 caracteres",
  }),
});

export type ProfileRequest = z.infer<typeof ProfileValidator>;
