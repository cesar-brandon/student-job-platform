import { z } from "zod";

export const UserNameValidator = z.object({
  name: z
    .string()
    .min(4)
    .max(15)
    .regex(/^[a-z0-9.-]+$/),
});

export type UserNameRequest = z.infer<typeof UserNameValidator>;

export const DisplayNameValidator = z.object({
  name: z
    .string()
    .min(4, {
      message: "El nombre de usuario debe tener al menos 4 caracteres",
    })
    .max(30, {
      message: "El nombre de usuario no puede tener más de 15 caracteres",
    }),
});

export type DisplayNameRequest = z.infer<typeof DisplayNameValidator>;
