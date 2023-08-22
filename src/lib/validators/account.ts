import { z } from "zod";

// validar que el input de username sea un string
// que se lowercase y que solo acepte giones o puntos y que tenga entre 3 y 20 caracteres

export const usernameValidator = z
  .string()
  .min(3)
  .max(20)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
