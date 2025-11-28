import { Exercise, RepRange, ExerciseRequirement, Achievement } from "./types";

// Utilitários para criar exercícios com gamificação
export function createExerciseWithGamification(
  baseExercise: Partial<Exercise>,
  level: number,
  thresholds: readonly number[],
  xpReward: number,
  estimatedTime: number,
  unlockRequirements?: ExerciseRequirement[],
  achievements?: Achievement[],
  formTips?: string[],
  progressionTips?: string[],
): Exercise {
  const exercise: Exercise = {
    id: baseExercise.id || `exercise-${level}`,
    name: baseExercise.name || `Exercício Nível ${level}`,
    muscleGroup: baseExercise.muscleGroup || "fullbody",
    difficulty: baseExercise.difficulty || "beginner",
    sets: baseExercise.sets || 3,
    reps: baseExercise.reps || { min: 8, max: 12 },
    rest: baseExercise.rest || "60s",
    instructions: baseExercise.instructions || "",
    equipment: baseExercise.equipment || [],
    calories: baseExercise.calories || 0,
    xpReward,
    estimatedTime,
    ...(baseExercise.tips && { tips: baseExercise.tips }),
    ...(unlockRequirements && { unlockRequirements }),
    ...(achievements && { achievements }),
    ...(formTips && { formTips }),
    ...(progressionTips && { progressionTips }),
  };

  return exercise;
}

// Utilitários para criar conquistas
export function createAchievement(
  id: string,
  name: string,
  description: string,
  icon: string,
  xpReward: number,
  condition: Achievement["condition"],
): Achievement {
  return {
    id,
    name,
    description,
    icon,
    xpReward,
    condition,
  };
}

// Utilitários para calcular níveis baseado em thresholds
export function calculateLevel(
  totalSets: number,
  thresholds: readonly number[],
): number {
  const level = thresholds.findIndex((threshold) => totalSets < threshold);
  return level === -1 ? thresholds.length : level;
}

// Utilitários para calcular sets até o próximo nível
export function getSetsToNextLevel(
  currentSets: number,
  thresholds: readonly number[],
): number {
  const currentLevel = calculateLevel(currentSets, thresholds);
  if (currentLevel >= thresholds.length) {
    return 0; // Já está no nível máximo
  }
  const nextThreshold = thresholds[currentLevel];
  return nextThreshold ? Math.max(0, nextThreshold - currentSets) : 0;
}

// Utilitários para validar desbloqueio de variações
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

// Utilitários para obter variações desbloqueadas
export function getUnlockedVariations(
  totalSets: number,
  thresholds: number[],
  variations: Record<number, Exercise>,
): Exercise[] {
  const currentLevel = calculateLevel(totalSets, thresholds);
  return Object.values(variations).slice(0, currentLevel);
}

// Utilitários para converter string reps para RepRange
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
    // Fallback para valores padrão
    return { min: 8, max: 12 };
  }
  return reps;
}
