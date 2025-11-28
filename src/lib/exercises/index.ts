// Tipos
export type { Exercise, Difficulty, MuscleGroup } from "./types";

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
  // Dados do jogo
  PULL_THRESHOLDS,
  PULL_ACHIEVEMENTS,
  PULL_BADGES,
  PULL_PROGRESSION_TIPS,
  PULL_FORM_TIPS,
  // Utilitários
  createPullExerciseWithGamification,
  calculatePullLevel,
  getSetsToNextPullLevel,
  canUnlockPullVariation,
  getUnlockedPullVariations,
  calculateFormBonus,
  calculateStreakMultiplier,
  getContextualPullTips,
  validatePullForm,
  canUnlockPullLevel,
  canUnlockBeginnerPull,
  canUnlockIntermediatePull,
  canUnlockAdvancedPull,
  canUnlockExtremePull,
  calculatePullProgress,
  suggestNextPullExercises,
  validatePullProgressHealth,
  // Exercícios
  pullVariations,
  pullExercisesByDifficulty,
  pullStats,
  getPullExercisesByLevel,
  getPullExerciseById,
  getPullExercisesByDifficulty,
  // Exercícios por nível
  beginnerPull,
  intermediatePull,
  advancedPull,
  extremePull,
} from "./variations/pull";

// Módulo Squat - Sistema completo de exercícios de agachamento
export type {
  Exercise as SquatExercise,
  ExerciseRequirement as SquatRequirement,
  Achievement as SquatAchievement,
} from "./variations/squat";

export {
  // Dados do jogo
  SQUAT_THRESHOLDS,
  SQUAT_ACHIEVEMENTS,
  SQUAT_BADGES,
  SQUAT_PROGRESSION_TIPS,
  SQUAT_FORM_TIPS,
  // Utilitários
  createAchievement as createSquatAchievement,
  calculateSquatLevel,
  getSetsToNextSquatLevel,
  canUnlockSquatVariation as canUnlockSquatVariationNew,
  getUnlockedSquatVariations,
  calculateFormBonus as calculateSquatFormBonus,
  calculateStreakMultiplier as calculateSquatStreakMultiplier,
  createSquatExerciseWithGamification,
  getContextualSquatTips,
  validateSquatForm,
  canUnlockSquatLevel,
  canUnlockBeginnerSquat,
  canUnlockIntermediateSquat,
  canUnlockAdvancedSquat,
  canUnlockExtremeSquat,
  calculateSquatProgress,
  suggestNextSquatExercises,
  validateSquatProgressHealth,
  // Exercícios
  squatVariations as squatVariationsNew,
  squatExercisesByDifficulty,
  squatStats,
  getSquatExercisesByLevel,
  getSquatExerciseById,
  getSquatExercisesByDifficulty,
  // Exercícios por nível
  beginnerSquat,
  intermediateSquat,
  advancedSquat,
  extremeSquat,
} from "./variations/squat";
