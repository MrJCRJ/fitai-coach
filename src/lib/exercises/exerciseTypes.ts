export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  sets: number;
  reps: string;
  rest: string;
  instructions: string;
  tips?: string;
  equipment: string[];
  calories?: number; // calorias queimadas por série aproximada
}

// Grupos musculares disponíveis
export const muscleGroups = {
  chest: "Peito",
  back: "Costas",
  legs: "Pernas",
  arms: "Braços",
  shoulders: "Ombros",
  core: "Core/Abdômen",
  cardio: "Cardio",
  fullbody: "Corpo Inteiro",
} as const;

export type MuscleGroup = keyof typeof muscleGroups;

// Tipo para a estrutura do banco de dados de exercícios
export interface ExercisesDatabase {
  chest: Exercise[];
  back: Exercise[];
  legs: Exercise[];
  arms: Exercise[];
  shoulders: Exercise[];
  core: Exercise[];
  cardio: Exercise[];
  fullbody: Exercise[];
}