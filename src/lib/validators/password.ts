import { z } from "zod";

let password = "";

export const PasswordValidator = z.object({
  newPassword: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(20, { message: "La contraseña no puede tener más de 20 caracteres" })
    .refine((value) => {
      password = value;
      return true;
    }),
  verifyPassword: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(20, { message: "La contraseña no puede tener más de 20 caracteres" })
    .refine((value) => value === password, "Las contraseñas no coinciden"),
});

export type PasswordRequest = z.infer<typeof PasswordValidator>;
