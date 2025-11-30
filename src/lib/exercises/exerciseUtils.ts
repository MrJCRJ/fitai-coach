import type { Exercise, ExerciseRequirement, RepRange } from "@/lib/exercises";

// ====================
// FUNÇÕES UTILITÁRIAS GENÉRICAS
// ====================

/**
 * Calcula o nível atual baseado no total de séries e thresholds
 */
export function calculateCurrentLevel(
  totalSets: number,
  thresholds: readonly number[],
): number {
  const level = thresholds.findIndex((threshold) => totalSets < threshold);
  return level === -1 ? thresholds.length : level;
}

/**
 * Obtém a variação atual baseada no nível
 */
export function getCurrentVariation(
  totalSets: number,
  thresholds: readonly number[],
  variations: Record<number, Exercise>,
): Exercise {
  const level = calculateCurrentLevel(totalSets, thresholds);
  const variation = variations[level];

  if (!variation) {
    console.warn(`Nenhuma variação encontrada para o nível ${level}`);
    return variations[1]!;
  }

  return variation;
}

/**
 * Obtém o próximo nível disponível
 */
export function getNextLevel(
  currentSets: number,
  thresholds: readonly number[],
): number {
  const currentLevel = calculateCurrentLevel(currentSets, thresholds);
  const nextLevel = currentLevel + 1;
  return nextLevel <= thresholds.length ? nextLevel : thresholds.length;
}

/**
 * Calcula quantas séries faltam para o próximo nível
 */
export function getSetsToNextLevel(
  currentSets: number,
  thresholds: readonly number[],
): number {
  const currentLevel = calculateCurrentLevel(currentSets, thresholds);
  if (currentLevel >= thresholds.length) {
    return 0; // Já está no nível máximo
  }
  const nextThreshold = thresholds[currentLevel];
  return nextThreshold ? Math.max(0, nextThreshold - currentSets) : 0;
}

/**
 * Obtém todas as variações desbloqueadas
 */
export function getUnlockedVariations(
  totalSets: number,
  thresholds: readonly number[],
  variations: Record<number, Exercise>,
): Exercise[] {
  const currentLevel = calculateCurrentLevel(totalSets, thresholds);
  return Object.values(variations).slice(0, currentLevel);
}

/**
 * Converte string reps para RepRange
 */
export function parseRepRange(reps: string | RepRange): RepRange {
  if (typeof reps === "string") {
    const parts = reps.split("-").map((s) => s.trim());
    if (parts.length === 2) {
      const minStr = parts[0];
      const maxStr = parts[1];
      if (minStr && maxStr) {
        const min = parseInt(minStr);
        const max = parseInt(maxStr);
        if (!isNaN(min) && !isNaN(max)) {
          return { min, max };
        }
      }
    }
    return { min: 8, max: 12 };
  }
  return reps;
}

/**
 * Valida se uma variação pode ser desbloqueada
 */
export function canUnlockVariation(
  level: number,
  totalSets: number,
  exerciseType: string,
  variations: Record<number, Exercise>,
): boolean {
  const variation = variations[level];
  if (!variation?.unlockRequirements) return true;

  return variation.unlockRequirements.every((req: ExerciseRequirement) => {
    if (req.type === "sets" && req.exerciseType === exerciseType) {
      return totalSets >= req.value;
    }
    return false;
  });
}

/**
 * Cria uma configuração completa para um tipo de exercício
 */
export interface ExerciseTypeConfig {
  thresholds: readonly number[];
  variations: Record<number, Exercise>;
  exerciseType: "pushup" | "pullup" | "squat";
}

/**
 * Classe utilitária para gerenciar um tipo de exercício
 */
export class ExerciseTypeManager {
  constructor(private config: ExerciseTypeConfig) {}

  getCurrentLevel(totalSets: number): number {
    return calculateCurrentLevel(totalSets, this.config.thresholds);
  }

  getCurrentVariation(totalSets: number): Exercise {
    return getCurrentVariation(
      totalSets,
      this.config.thresholds,
      this.config.variations,
    );
  }

  getNextLevel(currentSets: number): number {
    return getNextLevel(currentSets, this.config.thresholds);
  }

  getSetsToNextLevel(currentSets: number): number {
    return getSetsToNextLevel(currentSets, this.config.thresholds);
  }

  getUnlockedVariations(totalSets: number): Exercise[] {
    return getUnlockedVariations(
      totalSets,
      this.config.thresholds,
      this.config.variations,
    );
  }

  canUnlockVariation(level: number, totalSets: number): boolean {
    return canUnlockVariation(
      level,
      totalSets,
      this.config.exerciseType,
      this.config.variations,
    );
  }

  getAllVariations(): Record<number, Exercise> {
    return this.config.variations;
  }

  getThresholds(): readonly number[] {
    return this.config.thresholds;
  }
}
