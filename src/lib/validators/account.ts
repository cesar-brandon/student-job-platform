import { z } from "zod";

export const AccountValidator = z.object({
  username: z
    .string()
    .min(4, {
      message: "El nombre de usuario debe tener al menos 4 caracteres",
    })
    .max(15, {
      message: "El nombre de usuario no puede tener más de 15 caracteres",
    })
    .regex(/^[a-z0-9.-]+$/, {
      message:
        "El nombre de usuario solo puede contener letras minúsculas, números, guiones y puntos",
    }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(20, { message: "La contraseña no puede tener más de 20 caracteres" }),
});

export type AccountRequest = z.infer<typeof AccountValidator>;
