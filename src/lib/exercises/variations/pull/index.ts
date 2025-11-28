// ====================
// MÓDULO PULL - SISTEMA COMPLETO DE EXERCÍCIOS DE TRAÇÃO
// ====================

// Tipos
export type { Exercise } from "/home/josecicero/Documentos/fitai-coach/src/lib/exercises/types";

// Dados do jogo
export {
  PULL_THRESHOLDS,
  PULL_ACHIEVEMENTS,
  PULL_BADGES,
  PULL_PROGRESSION_TIPS,
  PULL_FORM_TIPS,
} from "./data/pullGameData";

// Utilitários
export {
  createPullExerciseWithGamification,
  calculatePullLevel,
  getSetsToNextPullLevel,
  canUnlockPullVariation,
  getUnlockedPullVariations,
  calculateFormBonus,
  calculateStreakMultiplier,
  getContextualPullTips,
  validatePullForm,
} from "./utils/gamificationUtils";

export {
  canUnlockPullLevel,
  canUnlockBeginnerPull,
  canUnlockIntermediatePull,
  canUnlockAdvancedPull,
  canUnlockExtremePull,
  calculatePullProgress,
  suggestNextPullExercises,
  validatePullProgressHealth,
} from "./utils/pullUnlockRules";

// Exercícios por nível
export { beginnerPull } from "./beginner";
export { intermediatePull } from "./intermediate";
export { advancedPull } from "./advanced";
export { extremePull } from "./extreme";

// ====================
// EXERCÍCIOS CONSOLIDADOS
// ====================

import { beginnerPull } from "./beginner";
import { intermediatePull } from "./intermediate";
import { advancedPull } from "./advanced";
import { extremePull } from "./extreme";

/**
 * Todos os exercícios de pull organizados por nível
 */
export const pullVariations: Record<
  number,
  import("/home/josecicero/Documentos/fitai-coach/src/lib/exercises/types").Exercise
> = {
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
  level: number
): Record<
  number,
  import("/home/josecicero/Documentos/fitai-coach/src/lib/exercises/types").Exercise
> {
  const exercises: Record<
    number,
    import("/home/josecicero/Documentos/fitai-coach/src/lib/exercises/types").Exercise
  > = {};

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
export function getPullExerciseById(
  id: string
):
  | import("/home/josecicero/Documentos/fitai-coach/src/lib/exercises/types").Exercise
  | undefined {
  return Object.values(pullVariations).find((exercise) => exercise.id === id);
}

/**
 * Função utilitária para obter exercícios por dificuldade
 */
export function getPullExercisesByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced" | "extreme"
): Record<
  number,
  import("/home/josecicero/Documentos/fitai-coach/src/lib/exercises/types").Exercise
> {
  return pullExercisesByDifficulty[difficulty];
}
