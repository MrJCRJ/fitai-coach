import { PULL_THRESHOLDS } from "../data/pullGameData";

/**
 * REGRAS DE DESBLOQUEIO REALISTAS PARA EXERCÍCIOS DE PULL
 *
 * Metas baseadas em progressão natural da calistenia:
 * - Foco em qualidade sobre quantidade
 * - Progressão gradual e segura
 * - Requisitos que incentivam consistência
 */

// ====================
// FUNÇÃO PRINCIPAL DE VALIDAÇÃO
// ====================

/**
 * Verifica se um nível de pull pode ser desbloqueado
 * @param level - Nível desejado (1-12)
 * @param totalSets - Total de séries completadas em exercícios de pull
 * @param masteredReps - Número de reps dominadas no nível anterior (opcional)
 * @returns boolean - Se o nível pode ser desbloqueado
 */
export function canUnlockPullLevel(
  level: number,
  totalSets: number,
  masteredReps: number = 0
): boolean {
  // Validações básicas
  if (level < 1 || level > 12) return false;
  if (totalSets < 0) return false;

  // Nível 1 sempre disponível
  if (level === 1) return true;

  // Regras específicas por nível
  switch (level) {
    case 2:
      return totalSets >= 8; // 8 séries para começar assistências

    case 3:
      return totalSets >= 25 && masteredReps >= 8; // 25 séries + 8 reps dominadas

    case 4:
      return totalSets >= 50 && masteredReps >= 10; // 50 séries + 10 reps

    case 5:
      return totalSets >= 100 && masteredReps >= 12; // 100 séries + 12 reps

    case 6:
      return totalSets >= 200 && masteredReps >= 8; // 200 séries + 8 pull-ups completas

    case 7:
      return totalSets >= 400 && masteredReps >= 10; // 400 séries + 10 pull-ups

    case 8:
      return totalSets >= 800 && masteredReps >= 5; // 800 séries + 5 muscle-ups ou avançados

    case 9:
      return totalSets >= 1600 && masteredReps >= 3; // 1600 séries + 3 one-arm ou levers

    case 10:
      return totalSets >= 3200 && masteredReps >= 2; // 3200 séries + 2 reps avançadas

    case 11:
      return totalSets >= 6400 && masteredReps >= 1; // 6400 séries + 1 rep extrema

    case 12:
      return totalSets >= 12800 && masteredReps >= 1; // 12800 séries + domínio completo

    default:
      return false;
  }
}

// ====================
// REGRAS DE DESBLOQUEIO POR DIFICULDADE
// ====================

/**
 * Regras específicas para exercícios beginners
 */
export function canUnlockBeginnerPull(
  exerciseId: string,
  totalSets: number,
  currentLevel: number
): boolean {
  switch (exerciseId) {
    case "dead_hang":
      return currentLevel >= 1;
    case "active_hang":
      return totalSets >= 5;
    case "scapular_pull_up":
      return totalSets >= 10;
    case "negative_pull_up":
      return totalSets >= 15;
    case "assisted_pull_up":
      return totalSets >= 20;
    case "chin_up_assisted":
      return totalSets >= 25;
    case "australian_row":
      return currentLevel >= 1; // Sempre disponível como alternativa
    case "neutral_grip_assisted":
      return totalSets >= 30;
    default:
      return false;
  }
}

/**
 * Regras específicas para exercícios intermediate
 */
export function canUnlockIntermediatePull(
  exerciseId: string,
  totalSets: number,
  masteredBeginner: boolean
): boolean {
  if (!masteredBeginner) return false;

  switch (exerciseId) {
    case "pull_up":
      return totalSets >= 50;
    case "chin_up":
      return totalSets >= 75;
    case "neutral_grip_pull_up":
      return totalSets >= 100;
    case "wide_pull_up":
      return totalSets >= 125;
    case "close_grip_pull_up":
      return totalSets >= 150;
    case "pull_up_pause":
      return totalSets >= 200;
    case "ring_row":
      return totalSets >= 100;
    case "ring_pull_up":
      return totalSets >= 250;
    case "chest_to_bar":
      return totalSets >= 300;
    case "commando_pull_up":
      return totalSets >= 350;
    case "assisted_archer_pull_up":
      return totalSets >= 400;
    case "l_sit_pull_up":
      return totalSets >= 450;
    default:
      return false;
  }
}

/**
 * Regras específicas para exercícios advanced
 */
export function canUnlockAdvancedPull(
  exerciseId: string,
  totalSets: number,
  masteredIntermediate: boolean,
  maxRepsPullUp: number
): boolean {
  if (!masteredIntermediate || maxRepsPullUp < 8) return false;

  switch (exerciseId) {
    case "archer_pull_up":
      return totalSets >= 800 && maxRepsPullUp >= 10;
    case "typewriter_pull_up":
      return totalSets >= 1000 && maxRepsPullUp >= 12;
    case "l_sit_pull_up_full":
      return totalSets >= 1200 && maxRepsPullUp >= 8;
    case "chest_to_bar_full":
      return totalSets >= 1400 && maxRepsPullUp >= 10;
    case "high_pull_up":
      return totalSets >= 1600 && maxRepsPullUp >= 12;
    case "explosive_pull_up":
      return totalSets >= 1800 && maxRepsPullUp >= 15;
    case "weighted_pull_up":
      return totalSets >= 2000 && maxRepsPullUp >= 12;
    case "muscle_up_bar":
      return totalSets >= 2200 && maxRepsPullUp >= 10;
    case "one_arm_pull_up":
      return totalSets >= 2500 && maxRepsPullUp >= 15;
    case "tuck_front_lever_hold":
      return totalSets >= 2800;
    case "back_lever_hold":
      return totalSets >= 3000;
    case "ice_cream_maker":
      return totalSets >= 3200;
    default:
      return false;
  }
}

/**
 * Regras específicas para exercícios extreme
 */
export function canUnlockExtremePull(
  exerciseId: string,
  totalSets: number,
  masteredAdvanced: boolean,
  hasWeightedPullUps: boolean,
  hasMuscleUps: boolean
): boolean {
  if (!masteredAdvanced) return false;

  switch (exerciseId) {
    case "one_arm_pull_up_full":
      return totalSets >= 6400 && hasWeightedPullUps;
    case "weighted_pull_up_heavy":
      return totalSets >= 7000 && hasWeightedPullUps;
    case "ring_muscle_up":
      return totalSets >= 8000 && hasMuscleUps;
    case "front_lever_full":
      return totalSets >= 9000;
    case "pull_up_front_lever":
      return totalSets >= 10000;
    case "front_lever_raises":
      return totalSets >= 11000;
    case "rotational_pull_up_180":
      return totalSets >= 12000;
    case "clap_pull_up":
      return totalSets >= 12800;
    case "double_clap_pull_up":
      return totalSets >= 14000;
    case "360_pull_up":
      return totalSets >= 15000;
    case "victorian_pull":
      return totalSets >= 16000;
    case "planche_to_invert":
      return totalSets >= 17000;
    default:
      return false;
  }
}

// ====================
// UTILITÁRIOS DE PROGRESSÃO
// ====================

/**
 * Calcula o progresso para o próximo nível
 */
export function calculatePullProgress(
  currentLevel: number,
  totalSets: number
): {
  currentThreshold: number;
  nextThreshold: number;
  progressPercentage: number;
  setsRemaining: number;
} {
  const currentThreshold = PULL_THRESHOLDS[currentLevel - 1] || 0;
  const nextThreshold =
    PULL_THRESHOLDS[currentLevel] ??
    PULL_THRESHOLDS[PULL_THRESHOLDS.length - 1] ??
    0;

  const setsInLevel = totalSets - currentThreshold;
  const setsNeeded = nextThreshold - currentThreshold;
  const progressPercentage =
    setsNeeded > 0 ? Math.min(100, (setsInLevel / setsNeeded) * 100) : 100;
  const setsRemaining = Math.max(0, nextThreshold - totalSets);

  return {
    currentThreshold,
    nextThreshold,
    progressPercentage,
    setsRemaining,
  };
}

/**
 * Sugere próximos exercícios baseado no progresso atual
 */
export function suggestNextPullExercises(
  currentLevel: number,
  totalSets: number,
  preferredStyle: "strict" | "kipping" | "mixed" = "strict"
): string[] {
  const suggestions: string[] = [];

  if (currentLevel <= 2) {
    suggestions.push("Foque em exercícios isométricos e assistidos");
    suggestions.push("Pratique scapular pull-ups diariamente");
    suggestions.push("Australian row para força de costas");
  } else if (currentLevel <= 5) {
    suggestions.push("Transite para pull-ups completas");
    suggestions.push("Varie pegadas: pronada, supinada, neutra");
    suggestions.push("Incorpore ring rows para instabilidade");
  } else if (currentLevel <= 8) {
    suggestions.push("Aumente intensidade com chest-to-bar");
    suggestions.push("Pratique muscle-ups com assistência");
    suggestions.push("Adicione pausas para força isométrica");
  } else {
    suggestions.push("Foque em força unilateral");
    suggestions.push("Explore levers e movimentos extremos");
    suggestions.push("Priorize qualidade técnica");
  }

  // Ajustes baseados no estilo preferido
  if (preferredStyle === "kipping") {
    suggestions.push("Considere adicionar kipping para eficiência calórica");
  } else if (preferredStyle === "strict") {
    suggestions.push("Mantenha forma strict para máxima força");
  }

  return suggestions;
}

/**
 * Valida se o progresso está saudável (evita overtraining)
 */
export function validatePullProgressHealth(
  totalSets: number,
  sessionsPerWeek: number,
  averageSessionSets: number
): {
  isHealthy: boolean;
  warnings: string[];
  recommendations: string[];
} {
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Verifica frequência
  if (sessionsPerWeek > 5) {
    warnings.push("Alta frequência pode levar a overtraining");
    recommendations.push("Considere reduzir para 3-4 sessões por semana");
  }

  // Verifica volume por sessão
  if (averageSessionSets > 50) {
    warnings.push("Volume muito alto por sessão");
    recommendations.push("Divida o treino em dias específicos");
  }

  // Verifica progresso consistente
  const expectedSets = sessionsPerWeek * 4 * 10; // 4 semanas * média 10 séries
  if (totalSets < expectedSets * 0.5) {
    warnings.push("Progresso lento detectado");
    recommendations.push("Aumente frequência ou intensidade gradualmente");
  }

  return {
    isHealthy: warnings.length === 0,
    warnings,
    recommendations,
  };
}
