import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, {
      message: "El título debe tener al menos 3 caracteres",
    })
    .max(128, {
      message: "El título debe tener menos de 128 caracteres",
    }),
  id: z.string(),
  content: z.any(),
  filters: z.array(z.string()),
  address: z.string().optional(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
