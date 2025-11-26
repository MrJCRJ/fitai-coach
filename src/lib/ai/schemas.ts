import { z } from "zod";

export const rawAssessmentSchema = z.object({
  birth_date: z.string().min(1),
  weight: z.number().positive(),
  height: z.number().positive(),
  experience: z.string().min(1),
  fitness_level: z.number().min(1).max(10),
  frequency: z.string().min(1),
  goal: z.string().min(1),
  limitations: z.string().min(1),
  time_per_session: z.string().min(1),
  personalGoals: z.string().optional(), // Campo opcional para objetivos pessoais
});

export type RawAssessment = z.infer<typeof rawAssessmentSchema>;

export function validateRawAssessment(raw: unknown): RawAssessment {
  return rawAssessmentSchema.parse(raw);
}
