import { z } from "zod";

export const ResumeValidator = z.object({
  professionalSummary: z.any(),
  skills: z.array(z.string()),
  experience: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      location: z.string(),
      startDate: z.string(),
      endDate: z.string(),
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
