// ====================
// MÓDULO SQUAT - SISTEMA COMPLETO DE EXERCÍCIOS DE AGACHAMENTO
// ====================

// Tipos
export type { Exercise, ExerciseRequirement, Achievement } from "../../types";

// Dados do jogo
export {
  SQUAT_THRESHOLDS,
  SQUAT_ACHIEVEMENTS,
  SQUAT_BADGES,
  SQUAT_PROGRESSION_TIPS,
  SQUAT_FORM_TIPS,
} from "./data/squatGameData";

// Utilitários
export {
  createAchievement,
  calculateSquatLevel,
  getSetsToNextSquatLevel,
  canUnlockSquatVariation,
  getUnlockedSquatVariations,
  calculateFormBonus,
  calculateStreakMultiplier,
  createSquatExerciseWithGamification,
  getContextualSquatTips,
  validateSquatForm,
} from "./utils/gamificationUtils";

export {
  canUnlockSquatLevel,
  canUnlockBeginnerSquat,
  canUnlockIntermediateSquat,
  canUnlockAdvancedSquat,
  canUnlockExtremeSquat,
  calculateSquatProgress,
  suggestNextSquatExercises,
  validateSquatProgressHealth,
} from "./utils/squatUnlockRules";

// Exercícios por nível
export { beginnerSquat } from "./beginner";
export { intermediateSquat } from "./intermediate";
export { advancedSquat } from "./advanced";
export { extremeSquat } from "./extreme";

// ====================
// EXERCÍCIOS CONSOLIDADOS
// ====================

import { beginnerSquat } from "./beginner";
import { intermediateSquat } from "./intermediate";
import { advancedSquat } from "./advanced";
import { extremeSquat } from "./extreme";

/**
 * Todos os exercícios de squat organizados por nível
 */
export const squatVariations: Record<number, import("../../types").Exercise> = {
  ...beginnerSquat,
  ...intermediateSquat,
  ...advancedSquat,
  ...extremeSquat,
};

/**
 * Exercícios de squat por dificuldade
 */
export const squatExercisesByDifficulty = {
  beginner: beginnerSquat,
  intermediate: intermediateSquat,
  advanced: advancedSquat,
  extreme: extremeSquat,
};

/**
 * Estatísticas do módulo squat
 */
export const squatStats = {
  totalExercises: Object.keys(squatVariations).length,
  beginnerCount: Object.keys(beginnerSquat).length,
  intermediateCount: Object.keys(intermediateSquat).length,
  advancedCount: Object.keys(advancedSquat).length,
  extremeCount: Object.keys(extremeSquat).length,
  totalLevels: 12,
  maxThreshold: 12800,
};

/**
 * Função utilitária para obter exercícios por nível
 */
export function getSquatExercisesByLevel(
  level: number
): Record<number, import("../../types").Exercise> {
  const exercises: Record<number, import("../../types").Exercise> = {};

  // Lógica para determinar quais exercícios estão disponíveis no nível
  if (level >= 1) {
    Object.entries(beginnerSquat).forEach(([key, exercise]) => {
      if (parseInt(key) <= level) {
        exercises[parseInt(key)] = exercise;
      }
    });
  }

  if (level >= 7) {
    Object.entries(intermediateSquat).forEach(([key, exercise]) => {
      if (parseInt(key) <= level) {
        exercises[parseInt(key)] = exercise;
      }
    });
  }

  if (level >= 15) {
    Object.entries(advancedSquat).forEach(([key, exercise]) => {
      if (parseInt(key) <= level) {
        exercises[parseInt(key)] = exercise;
      }
    });
  }

  if (level >= 23) {
    Object.entries(extremeSquat).forEach(([key, exercise]) => {
      if (parseInt(key) <= level) {
        exercises[parseInt(key)] = exercise;
      }
    });
  }

  return exercises;
}

/**
 * Função utilitária para obter exercício específico por ID
 */
export function getSquatExerciseById(
  id: string
): import("../../types").Exercise | undefined {
  return Object.values(squatVariations).find((exercise) => exercise.id === id);
}

/**
 * Função utilitária para obter exercícios por dificuldade
 */
export function getSquatExercisesByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced" | "extreme"
): Record<number, import("../../types").Exercise> {
  return squatExercisesByDifficulty[difficulty];
}
