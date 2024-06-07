import { z } from "zod";

export const EnterpriseValidator = z.object({
  // id: z.string(),
  name: z.string().min(1, { message: "El nombre no puede estar vacío" }),
  email: z
    .string()
    .min(1, { message: "El correo electrónico no puede estar vacío" })
    .email("El correo electrónico no es válido"),
  address: z.string().min(1, { message: "La dirección no puede estar vacía" }),
  phone: z
    .string()
    .min(1, { message: "El teléfono no puede estar vacío" })
    .regex(/^\d{9}$/, { message: "El teléfono debe tener 9 dígitos" }),
});

export type EnterpriseCreationRequest = z.infer<typeof EnterpriseValidator>;
