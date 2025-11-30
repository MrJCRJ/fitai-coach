// ====================
// MÓDULO SQUAT - SISTEMA COMPLETO DE EXERCÍCIOS DE AGACHAMENTO
// ====================

// Tipos
import type { Exercise } from "@/lib/exercises";
export type { Exercise, ExerciseRequirement } from "@/lib/exercises";

// Dados do jogo
export {
  SQUAT_THRESHOLDS,
  SQUAT_PROGRESSION_TIPS,
  SQUAT_FORM_TIPS,
} from "@/lib/exercises/variations/squat/data/squatGameData";

// Utilitários
export {
  calculateSquatLevel,
  getSetsToNextSquatLevel,
  canUnlockSquatVariation,
  getUnlockedSquatVariations,
  calculateFormBonus,
  createSquatExercise,
  getContextualSquatTips,
  validateSquatForm,
} from "@/lib/exercises/variations/squat/utils/gamificationUtils";

export {
  canUnlockSquatLevel,
  canUnlockBeginnerSquat,
  canUnlockIntermediateSquat,
  canUnlockAdvancedSquat,
  canUnlockExtremeSquat,
  calculateSquatProgress,
  suggestNextSquatExercises,
  validateSquatProgressHealth,
} from "@/lib/exercises/variations/squat/utils/squatUnlockRules";

// Exercícios por nível
export { beginnerSquat } from "@/lib/exercises/variations/squat/beginner";
export { intermediateSquat } from "@/lib/exercises/variations/squat/intermediate";
export { advancedSquat } from "@/lib/exercises/variations/squat/advanced";
export { extremeSquat } from "@/lib/exercises/variations/squat/extreme";

// ====================
// EXERCÍCIOS CONSOLIDADOS
// ====================

import { beginnerSquat } from "@/lib/exercises/variations/squat/beginner";
import { intermediateSquat } from "@/lib/exercises/variations/squat/intermediate";
import { advancedSquat } from "@/lib/exercises/variations/squat/advanced";
import { extremeSquat } from "@/lib/exercises/variations/squat/extreme";

/**
 * Todos os exercícios de squat organizados por nível
 */
export const squatVariations: Record<number, Exercise> = {
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
  level: number,
): Record<number, Exercise> {
  const exercises: Record<number, Exercise> = {};

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
export function getSquatExerciseById(id: string): Exercise | undefined {
  return Object.values(squatVariations).find((exercise) => exercise.id === id);
}

/**
 * Função utilitária para obter exercícios por dificuldade
 */
export function getSquatExercisesByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced" | "extreme",
): Record<number, Exercise> {
  return squatExercisesByDifficulty[difficulty];
}
