// Tipos
export type {
  Exercise,
  Difficulty,
  MuscleGroup,
  ExerciseRequirement,
  RepRange,
  ExerciseSet,
} from "./types";

// Variações por nível
export {
  pushUpVariations,
  canUnlockPushUpVariation,
} from "./variations/pushups";

export {
  pullUpVariations,
  squatVariations,
  canUnlockPullUpVariation,
  canUnlockSquatVariation,
} from "./variations";

// Módulo Pull - Sistema completo de exercícios de tração
export {
  pullVariations,
  pullExercisesByDifficulty,
  pullStats,
  getPullExercisesByLevel,
  getPullExerciseById,
  getPullExercisesByDifficulty,
  beginnerPull,
  intermediatePull,
  advancedPull,
  extremePull,
} from "./variations/pull";

// Módulo Squat - Sistema completo de exercícios de agachamento
export type {
  Exercise as SquatExercise,
  ExerciseRequirement as SquatRequirement,
} from "./variations/squat";

export {
  squatVariations as squatVariationsNew,
  squatExercisesByDifficulty,
  squatStats,
  getSquatExercisesByLevel,
  getSquatExerciseById,
  getSquatExercisesByDifficulty,
  beginnerSquat,
  intermediateSquat,
  advancedSquat,
  extremeSquat,
} from "./variations/squat";
