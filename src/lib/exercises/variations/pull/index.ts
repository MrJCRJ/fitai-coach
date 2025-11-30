// ====================
// MÓDULO PULL - SISTEMA COMPLETO DE EXERCÍCIOS DE TRAÇÃO
// ====================

// Tipos
import type { Exercise } from "@/lib/exercises";
export type { Exercise } from "@/lib/exercises";

// Dados do jogo
export { PULL_THRESHOLDS } from "@/lib/exercises/variations/pull/data/pullGameData";
export { beginnerPull } from "@/lib/exercises/variations/pull/beginner";
export { intermediatePull } from "@/lib/exercises/variations/pull/intermediate";
export { advancedPull } from "@/lib/exercises/variations/pull/advanced";
export { extremePull } from "@/lib/exercises/variations/pull/extreme";
export {
  canUnlockPullVariation,
  getUnlockedPullVariations,
  calculatePullLevel,
  getSetsToNextPullLevel,
  getContextualPullTips,
  validatePullForm,
} from "@/lib/exercises/variations/pull/utils/gamificationUtils";

import { beginnerPull } from "@/lib/exercises/variations/pull/beginner";
import { intermediatePull } from "@/lib/exercises/variations/pull/intermediate";
import { advancedPull } from "@/lib/exercises/variations/pull/advanced";
import { extremePull } from "@/lib/exercises/variations/pull/extreme";

/**
 * Todos os exercícios de pull organizados por nível
 */
export const pullVariations: Record<number, Exercise> = {
  ...beginnerPull,
  ...intermediatePull,
  ...advancedPull,
  ...extremePull,
};

/**
 * Exercícios de pull por dificuldade
 */
export const pullExercisesByDifficulty = {
  beginner: beginnerPull,
  intermediate: intermediatePull,
  advanced: advancedPull,
  extreme: extremePull,
};

/**
 * Estatísticas do módulo pull
 */
export const pullStats = {
  totalExercises: Object.keys(pullVariations).length,
  beginnerCount: Object.keys(beginnerPull).length,
  intermediateCount: Object.keys(intermediatePull).length,
  advancedCount: Object.keys(advancedPull).length,
  extremeCount: Object.keys(extremePull).length,
  totalLevels: 12,
  maxThreshold: 12800,
};

/**
 * Função utilitária para obter exercícios por nível
 */
export function getPullExercisesByLevel(
  level: number,
): Record<number, Exercise> {
  const exercises: Record<number, Exercise> = {};

  // Lógica para determinar quais exercícios estão disponíveis no nível
  if (level >= 1) {
    Object.entries(beginnerPull).forEach(([key, exercise]) => {
      if (parseInt(key) <= level) {
        exercises[parseInt(key)] = exercise;
      }
    });
  }

  if (level >= 9) {
    Object.entries(intermediatePull).forEach(([key, exercise]) => {
      if (parseInt(key) <= level) {
        exercises[parseInt(key)] = exercise;
      }
    });
  }

  if (level >= 21) {
    Object.entries(advancedPull).forEach(([key, exercise]) => {
      if (parseInt(key) <= level) {
        exercises[parseInt(key)] = exercise;
      }
    });
  }

  if (level >= 33) {
    Object.entries(extremePull).forEach(([key, exercise]) => {
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
export function getPullExerciseById(id: string): Exercise | undefined {
  return Object.values(pullVariations).find((exercise) => exercise.id === id);
}

/**
 * Função utilitária para obter exercícios por dificuldade
 */
export function getPullExercisesByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced" | "extreme",
): Record<number, Exercise> {
  return pullExercisesByDifficulty[difficulty];
}
