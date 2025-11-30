export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  difficulty: Difficulty;
  sets: number;
  reps: string | RepRange;
  rest: string;
  instructions: string;
  tips?: string;
  equipment: string[];
  calories?: number;
  // Campos opcionais de configuração
  unlockRequirements?: ExerciseRequirement[]; // Requisitos para desbloquear
  progressionTips?: string[]; // Dicas de progressão
  estimatedTime?: number; // Tempo estimado em segundos
  formTips?: string[]; // Dicas de forma
  // Campos extras para expansão futura
  unlocksAt?: number; // Nível ou valor para desbloquear
  milestone?: boolean;
  rarity?: "common" | "rare" | "epic" | "legendary";
  category?: string;
  emoji?: string;
  sound?: string;
}

export interface RepRange {
  min: number;
  max: number;
  unit?: "reps" | "seconds";
}

export interface ExerciseRequirement {
  type: "level" | "sets" | "time";
  exerciseType?: "pushup" | "pullup" | "squat" | "dip";
  value: number;
  description: string;
}

// Achievement types removed — gamification-free definitions

export type Difficulty = "beginner" | "intermediate" | "advanced" | "extreme";
export type MuscleGroup =
  | "chest"
  | "back"
  | "legs"
  | "arms"
  | "shoulders"
  | "core"
  | "cardio"
  | "fullbody";

// Tipos para gamificação
export interface ExerciseStats {
  totalSets: number;
  currentLevel: number;
  personalRecords: {
    maxReps: number;
    fastestTime: number;
    mostSets: number;
  };
  unlockedVariations: string[];
  weightStats?: {
    totalWeightedSets: number;
    maxWeight: number;
    averageWeight: number;
    totalWeightLifted: number; // soma de todos os pesos levantados
  };
}

export interface WorkoutSession {
  id: string;
  date: string;
  exercises: WorkoutExercise[];
  duration: number; // em segundos
  // achievements/xp removed
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: ExerciseSet[];
  level: number;
}

export interface ExerciseSet {
  reps: number;
  weight?: number;
  duration?: number; // para exercícios baseados em tempo
  restTime: number;
  completedAt: string;
  formRating?: 1 | 2 | 3 | 4 | 5; // avaliação da forma
}
