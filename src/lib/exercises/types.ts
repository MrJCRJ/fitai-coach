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
  // Novos campos para gamificação
  xpReward?: number; // Pontos de experiência por conclusão
  unlockRequirements?: ExerciseRequirement[]; // Requisitos para desbloquear
  achievements?: Achievement[]; // Conquistas relacionadas
  progressionTips?: string[]; // Dicas de progressão
  estimatedTime?: number; // Tempo estimado em segundos
  formTips?: string[]; // Dicas de forma
  // Campos extras para expansão futura
  badgeId?: string;
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
  type: "level" | "sets" | "time" | "achievement";
  exerciseType?: "pushup" | "pullup" | "squat" | "dip";
  value: number;
  description: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  condition: AchievementCondition;
}

export interface AchievementCondition {
  type:
    | "sets_completed"
    | "level_reached"
    | "streak_days"
    | "time_record"
    | "perfect_form"
    | "weight_used"
    | "weight_sets"
    | "max_weight";
  exerciseType?: "pushup" | "pullup" | "squat" | "dip";
  value: number;
  timeframe?: "daily" | "weekly" | "monthly" | "all_time";
}

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
export interface UserProgress {
  totalXp: number;
  level: number;
  achievements: string[];
  streaks: {
    current: number;
    longest: number;
    lastWorkoutDate: string;
  };
  exerciseStats: {
    pushup: ExerciseStats;
    pullup: ExerciseStats;
    squat: ExerciseStats;
    dip: ExerciseStats;
  };
}

export interface ExerciseStats {
  totalSets: number;
  currentLevel: number;
  bestStreak: number;
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
  totalXpEarned: number;
  duration: number; // em segundos
  achievements: Achievement[];
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: ExerciseSet[];
  level: number;
  xpEarned: number;
}

export interface ExerciseSet {
  reps: number;
  weight?: number;
  duration?: number; // para exercícios baseados em tempo
  restTime: number;
  completedAt: string;
  formRating?: 1 | 2 | 3 | 4 | 5; // avaliação da forma
}
