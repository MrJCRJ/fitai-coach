import type { Exercise, RepRange, ExerciseRequirement } from "@/lib/exercises";

// Utilitários para criar exercícios com gamificação
export function createExercise(
  baseExercise: Partial<Exercise>,
  level: number,
  thresholds: readonly number[],
  estimatedTime: number,
  unlockRequirements?: ExerciseRequirement[],
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
    // gamification removed: xpReward/achievements not included
    estimatedTime,
    ...(baseExercise.tips && { tips: baseExercise.tips }),
    ...(unlockRequirements && { unlockRequirements }),
    ...(formTips && { formTips }),
    ...(progressionTips && { progressionTips }),
  };

  return exercise;
}

// Utilitários para criar conquistas
// Achievements removed: no longer creating achievement objects

// Utilitários para calcular níveis baseado em thresholds
export function calculateLevel(
  totalSets: number,
  thresholds: readonly number[],
): number {
  // Gamificação removida — retornar nível neutro para compatibilidade
  void totalSets;
  void thresholds;
  return 1;
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
  thresholds: readonly number[],
  variations: Record<number, Exercise>,
): Exercise[] {
  // Gamificação removida — todas as variações desbloqueadas
  void totalSets;
  void thresholds;
  return Object.values(variations);
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
