// ====================
// UTILITÁRIOS DE GAMIFICAÇÃO - MÓDULO SQUAT
// ====================

import type {
  Exercise,
  ExerciseRequirement,
  Achievement,
} from "@/lib/exercises";
import {
  SQUAT_THRESHOLDS,
  SQUAT_PROGRESSION_TIPS,
  SQUAT_FORM_TIPS,
} from "../data/squatGameData";

/**
 * Cria uma conquista para squats
 */
export function createAchievement(
  id: string,
  name: string,
  description: string,
  xpReward: number,
  icon: string = "",
  condition: Achievement["condition"],
): Achievement {
  return {
    id: `squat_${id}`,
    name,
    description,
    xpReward,
    icon,
    condition,
  };
}

/**
 * Calcula o nível baseado nos thresholds de squat
 */
export function calculateSquatLevel(totalSets: number): number {
  const level = SQUAT_THRESHOLDS.findIndex(
    (threshold) => totalSets < threshold,
  );
  return level === -1 ? SQUAT_THRESHOLDS.length : level;
}

/**
 * Calcula quantas séries faltam para o próximo nível
 */
export function getSetsToNextSquatLevel(currentSets: number): number {
  const currentLevel = calculateSquatLevel(currentSets);
  if (currentLevel >= SQUAT_THRESHOLDS.length) {
    return 0; // Já está no nível máximo
  }
  const nextThreshold = SQUAT_THRESHOLDS[currentLevel];
  return nextThreshold ? Math.max(0, nextThreshold - currentSets) : 0;
}

/**
 * Verifica se uma variação pode ser desbloqueada
 */
export function canUnlockSquatVariation(
  level: number,
  totalSets: number,
  variations: Record<number, Exercise>,
): boolean {
  const variation = variations[level];
  if (!variation?.unlockRequirements) return true;

  return variation.unlockRequirements.every((req: ExerciseRequirement) => {
    if (req.type === "sets" && req.exerciseType === "squat") {
      return totalSets >= req.value;
    }
    return false;
  });
}

/**
 * Obtém todas as variações desbloqueadas
 */
export function getUnlockedSquatVariations(
  totalSets: number,
  variations: Record<number, Exercise>,
): Exercise[] {
  const currentLevel = calculateSquatLevel(totalSets);
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
 * Cria exercício com gamificação integrada
 */
export function createSquatExerciseWithGamification(
  baseExercise: Omit<
    Exercise,
    | "xpReward"
    | "estimatedTime"
    | "unlockRequirements"
    | "achievements"
    | "gameCheckpoints"
    | "progressionTips"
  >,
  level: number,
  baseXp: number,
  estimatedTime: number,
  unlockRequirements?: ExerciseRequirement[],
  achievements?: Achievement[],
  difficulty: "beginner" | "intermediate" | "advanced" | "extreme" = "beginner",
): Exercise {
  const xpReward = baseXp + level * 5; // XP aumenta com o nível

  const exercise: Exercise = {
    ...baseExercise,
    instructions: baseExercise.instructions || "",
    equipment: baseExercise.equipment || ["Nenhum"],
    calories: baseExercise.calories || 8,
    xpReward,
    estimatedTime,
    ...(unlockRequirements && { unlockRequirements }),
    ...(achievements && { achievements }),
    ...(SQUAT_FORM_TIPS[baseExercise.id as keyof typeof SQUAT_FORM_TIPS] && {
      formTips: [
        ...SQUAT_FORM_TIPS[baseExercise.id as keyof typeof SQUAT_FORM_TIPS],
      ],
    }),
    ...(SQUAT_PROGRESSION_TIPS[difficulty] && {
      progressionTips: [...SQUAT_PROGRESSION_TIPS[difficulty]],
    }),
  };

  return exercise;
}

/**
 * Gera dicas contextuais baseadas no progresso
 */
export function getContextualSquatTips(
  currentLevel: number,
  totalSets: number,
): string[] {
  const tips: string[] = [];

  // Dicas baseadas no nível atual
  if (currentLevel < 3) {
    tips.push("Foque em exercícios isométricos para construir força base");
    tips.push("Pratique mobilidade de tornozelo diariamente");
    tips.push("Use apoios para ganhar confiança na técnica");
  } else if (currentLevel < 6) {
    tips.push("Transite para air squats com profundidade completa");
    tips.push("Incorpore pausas para força isométrica");
    tips.push("Explore mobilidade lateral com cossack squats");
  } else if (currentLevel < 9) {
    tips.push("Domine variações unilaterais com controle");
    tips.push("Adicione peso quando a técnica for impecável");
    tips.push("Foque em profundidade extrema e explosividade");
  } else {
    tips.push("Priorize qualidade sobre quantidade");
    tips.push("Explore variações lendárias com paciência");
    tips.push("Mantenha mobilidade articular excepcional");
  }

  // Dicas baseadas no total de séries
  if (totalSets < 100) {
    tips.push("Consistência é mais importante que intensidade inicial");
    tips.push("Pratique diariamente para melhorar mobilidade");
  } else if (totalSets < 500) {
    tips.push("Você está progredindo bem! Mantenha a regularidade");
    tips.push("Considere adicionar variações mais desafiadoras");
  } else if (totalSets < 1000) {
    tips.push("Foco na perfeição técnica");
    tips.push("Explore força unilateral quando pronto");
  } else {
    tips.push("Você é um mestre dos squats! Foque em excelência");
    tips.push("Considere ensinar outros ou competir");
  }

  return tips;
}

/**
 * Valida se um exercício foi executado com forma adequada
 */
export function validateSquatForm(
  exerciseId: string,
  reps: number,
  duration: number,
  formRating?: 1 | 2 | 3 | 4 | 5,
): {
  isValid: boolean;
  feedback: string[];
  bonusXp: number;
} {
  const feedback: string[] = [];
  let bonusXp = 0;

  // Validações específicas por exercício
  switch (exerciseId) {
    case "wall_sit":
      if (duration < 15) {
        feedback.push("Tente segurar por pelo menos 15 segundos");
      } else if (duration >= 45) {
        feedback.push("Excelente força isométrica!");
        bonusXp += 15;
      }
      break;

    case "air_squat":
      if (reps >= 15) {
        feedback.push("Excelente profundidade e controle!");
        bonusXp += 10;
      }
      break;

    case "pistol_squat":
      if (reps >= 3) {
        feedback.push("Movimento unilateral impressionante!");
        bonusXp += 25;
      }
      break;

    case "shrimp_squat":
      if (reps >= 5) {
        feedback.push("Controle excepcional na variação avançada!");
        bonusXp += 20;
      }
      break;

    case "jump_squat":
      feedback.push("Controle o pouso suavemente");
      if (reps >= 8) {
        feedback.push("Explosividade controlada excelente!");
        bonusXp += 15;
      }
      break;
  }

  // Validação de forma geral
  if (formRating) {
    bonusXp += calculateFormBonus(formRating);
    if (formRating >= 4) {
      feedback.push("Forma excelente! Continue assim!");
    } else if (formRating <= 2) {
      feedback.push("Foque na profundidade e alinhamento");
    }
  }

  return {
    isValid: feedback.length === 0 || bonusXp > 0,
    feedback,
    bonusXp,
  };
}
