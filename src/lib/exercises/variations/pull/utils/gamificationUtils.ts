import { Exercise, ExerciseRequirement, Achievement } from "../../../types";
import { parseRepRange } from "../../../gamificationUtils";
import {
  PULL_THRESHOLDS,
  PULL_PROGRESSION_TIPS,
  PULL_FORM_TIPS,
} from "../data/pullGameData";

// ====================
// UTILITÁRIOS DE GAMIFICAÇÃO PARA PULL
// ====================

/**
 * Cria um exercício de pull com gamificação completa
 */
export function createPullExerciseWithGamification(
  baseExercise: Partial<Exercise>,
  level: number,
  xpReward: number,
  estimatedTime: number,
  unlockRequirements?: ExerciseRequirement[],
  achievements?: Achievement[],
  difficulty: "beginner" | "intermediate" | "advanced" | "extreme" = "beginner"
): Exercise {
  const exercise: Exercise = {
    id: baseExercise.id || `pull-exercise-${level}`,
    name: baseExercise.name || `Exercício de Pull Nível ${level}`,
    muscleGroup: "back",
    difficulty,
    sets: baseExercise.sets || 3,
    reps: baseExercise.reps || parseRepRange("8-12"),
    rest: baseExercise.rest || "90s",
    instructions: baseExercise.instructions || "",
    equipment: baseExercise.equipment || ["Barra"],
    calories: baseExercise.calories || 12,
    xpReward,
    estimatedTime,
    ...(baseExercise.badgeId && { badgeId: baseExercise.badgeId }),
    rarity: baseExercise.rarity || "common",
    category: "strength",
    emoji: baseExercise.emoji || "🏋️‍♂️",
    ...(baseExercise.tips && { tips: baseExercise.tips }),
    ...(unlockRequirements && { unlockRequirements }),
    ...(achievements && { achievements }),
    ...(PULL_FORM_TIPS[baseExercise.id as keyof typeof PULL_FORM_TIPS] && {
      formTips: [
        ...PULL_FORM_TIPS[baseExercise.id as keyof typeof PULL_FORM_TIPS],
      ],
    }),
    ...(PULL_PROGRESSION_TIPS[difficulty] && {
      progressionTips: [...PULL_PROGRESSION_TIPS[difficulty]],
    }),
  };

  return exercise;
}

/**
 * Cria conquistas específicas para exercícios de pull
 */
export function createPullAchievement(
  id: string,
  name: string,
  description: string,
  icon: string,
  xpReward: number,
  condition: Achievement["condition"]
): Achievement {
  return {
    id: `pull_${id}`,
    name,
    description,
    icon,
    xpReward,
    condition,
  };
}

/**
 * Calcula o nível baseado nos thresholds de pull
 */
export function calculatePullLevel(totalSets: number): number {
  const level = PULL_THRESHOLDS.findIndex((threshold) => totalSets < threshold);
  return level === -1 ? PULL_THRESHOLDS.length : level;
}

/**
 * Calcula quantas séries faltam para o próximo nível
 */
export function getSetsToNextPullLevel(currentSets: number): number {
  const currentLevel = calculatePullLevel(currentSets);
  if (currentLevel >= PULL_THRESHOLDS.length) {
    return 0; // Já está no nível máximo
  }
  const nextThreshold = PULL_THRESHOLDS[currentLevel];
  return nextThreshold ? Math.max(0, nextThreshold - currentSets) : 0;
}

/**
 * Verifica se uma variação pode ser desbloqueada
 */
export function canUnlockPullVariation(
  level: number,
  totalSets: number,
  variations: Record<number, Exercise>
): boolean {
  const variation = variations[level];
  if (!variation?.unlockRequirements) return true;

  return variation.unlockRequirements.every((req: ExerciseRequirement) => {
    if (req.type === "sets" && req.exerciseType === "pullup") {
      return totalSets >= req.value;
    }
    return false;
  });
}

/**
 * Obtém todas as variações desbloqueadas
 */
export function getUnlockedPullVariations(
  totalSets: number,
  variations: Record<number, Exercise>
): Exercise[] {
  const currentLevel = calculatePullLevel(totalSets);
  return Object.values(variations).slice(0, currentLevel);
}

/**
 * Calcula XP bônus baseado em forma perfeita
 */
export function calculateFormBonus(formRating: 1 | 2 | 3 | 4 | 5): number {
  const bonuses = { 1: 0, 2: 5, 3: 10, 4: 20, 5: 50 };
  return bonuses[formRating] || 0;
}

/**
 * Calcula multiplicador de streak
 */
export function calculateStreakMultiplier(currentStreak: number): number {
  if (currentStreak >= 30) return 2.0;
  if (currentStreak >= 14) return 1.5;
  if (currentStreak >= 7) return 1.25;
  if (currentStreak >= 3) return 1.1;
  return 1.0;
}

/**
 * Gera dicas contextuais baseadas no progresso
 */
export function getContextualPullTips(
  currentLevel: number,
  totalSets: number
): string[] {
  const tips: string[] = [];

  // Dicas baseadas no nível atual
  if (currentLevel < 3) {
    tips.push("Foque em exercícios isométricos para construir força base");
    tips.push("Pratique movimentos escapulares diariamente");
  } else if (currentLevel < 6) {
    tips.push("Transite para barras assistidas gradualmente");
    tips.push("Incorpore variações de pegada");
  } else if (currentLevel < 9) {
    tips.push("Aumente a intensidade com pausas e explosividade");
    tips.push("Considere adicionar peso quando dominar a forma");
  } else {
    tips.push("Foque em força unilateral e movimentos avançados");
    tips.push("Priorize qualidade sobre quantidade");
  }

  // Dicas baseadas no total de séries
  if (totalSets < 100) {
    tips.push("Consistência é mais importante que intensidade inicial");
  } else if (totalSets < 500) {
    tips.push("Você está progredindo bem! Mantenha a regularidade");
  } else if (totalSets < 1000) {
    tips.push("Considere adicionar variações avançadas ao seu treino");
  } else {
    tips.push("Você é um veterano! Foque em perfeição técnica");
  }

  return tips;
}

/**
 * Valida se um exercício foi executado com forma adequada
 */
export function validatePullForm(
  exerciseId: string,
  reps: number,
  duration: number,
  formRating?: 1 | 2 | 3 | 4 | 5
): {
  isValid: boolean;
  feedback: string[];
  bonusXp: number;
} {
  const feedback: string[] = [];
  let bonusXp = 0;

  // Validações específicas por exercício
  switch (exerciseId) {
    case "dead_hang":
      if (duration < 10) {
        feedback.push("Tente segurar por pelo menos 10 segundos");
      } else if (duration >= 30) {
        feedback.push("Excelente força de preensão!");
        bonusXp += 10;
      }
      break;

    case "scapular_pull_up":
      if (reps < 8) {
        feedback.push("Complete pelo menos 8 repetições controladas");
      } else {
        feedback.push("Bom controle escapular!");
        bonusXp += 5;
      }
      break;

    case "pull_up":
      if (reps >= 10) {
        feedback.push("Excelente força de tração!");
        bonusXp += 15;
      }
      break;

    case "muscle_up":
      if (reps >= 3) {
        feedback.push("Movimento explosivo impressionante!");
        bonusXp += 25;
      }
      break;
  }

  // Validação de forma geral
  if (formRating) {
    bonusXp += calculateFormBonus(formRating);
    if (formRating >= 4) {
      feedback.push("Forma excelente! Continue assim!");
    } else if (formRating <= 2) {
      feedback.push("Foque na forma - qualidade sobre quantidade");
    }
  }

  return {
    isValid: feedback.length === 0 || bonusXp > 0,
    feedback,
    bonusXp,
  };
}
