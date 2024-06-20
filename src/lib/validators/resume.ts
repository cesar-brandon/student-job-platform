import { z } from "zod";

let initialDate = "";
export const ResumeValidator = z.object({
  professionalSummary: z.any(),
  skills: z.array(z.string()),
  experience: z.array(
    z.object({
      title: z.string().min(1, { message: "El título es requerido" }),
      company: z.string().min(1, { message: "La empresa es requerida" }),
      location: z.string().min(1, { message: "La ubicación es requerida" }),
      startDate: z
        .string()
        .min(1, { message: "La fecha de inicio es requerida" })
        .refine((value) => {
          initialDate = value;
          return true;
        }),
      endDate: z
        .string()
        .min(1, { message: "La fecha de finalización es requerida" })
        .refine(
          (value) => {
            return new Date(value) > new Date(initialDate);
          },
          { message: "La fecha de finalización debe ser mayor a la de inicio" },
        ),
      description: z.string(),
    }),
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      url: z.string(),
    }),
  ),
});

export type ResumeRequest = z.infer<typeof ResumeValidator>;
