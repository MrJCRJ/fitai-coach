// ====================
// REGRAS DE DESBLOQUEIO - MÓDULO SQUAT
// ====================

import { SQUAT_THRESHOLDS } from "../data/squatGameData";

/**
 * Verifica se um nível específico pode ser desbloqueado
 */
export function canUnlockSquatLevel(level: number, totalSets: number): boolean {
  const metas: Record<number, [number, number]> = {
    1: [5, 40], // Iniciante básico
    2: [45, 120], // Iniciante avançado
    3: [125, 300], // Intermediário básico
    4: [305, 600], // Intermediário avançado
    5: [605, 1200], // Avançado básico
    6: [1205, 2400], // Avançado intermediário
    7: [2405, 4800], // Avançado avançado
    8: [4805, 9600], // Extremo básico
    9: [9605, 19200], // Extremo intermediário
    10: [19205, 38400], // Extremo avançado
    11: [38405, 76800], // Mestre
    12: [76800, Infinity], // Lenda
  };

  const meta = metas[level];
  return meta ? totalSets >= meta[0] && totalSets <= meta[1] : false;
}

/**
 * Verifica se exercícios de nível iniciante podem ser desbloqueados
 */
export function canUnlockBeginnerSquat(totalSets: number): boolean {
  return canUnlockSquatLevel(1, totalSets);
}

/**
 * Verifica se exercícios de nível intermediário podem ser desbloqueados
 */
export function canUnlockIntermediateSquat(totalSets: number): boolean {
  return canUnlockSquatLevel(3, totalSets);
}

/**
 * Verifica se exercícios de nível avançado podem ser desbloqueados
 */
export function canUnlockAdvancedSquat(totalSets: number): boolean {
  return canUnlockSquatLevel(5, totalSets);
}

/**
 * Verifica se exercícios de nível extremo podem ser desbloqueados
 */
export function canUnlockExtremeSquat(totalSets: number): boolean {
  return canUnlockSquatLevel(8, totalSets);
}

/**
 * Calcula o progresso atual baseado nos thresholds
 */
export function calculateSquatProgress(
  currentLevel: number,
  totalSets: number
): {
  currentThreshold: number;
  nextThreshold: number;
  progressPercentage: number;
  setsRemaining: number;
} {
  const currentThreshold = SQUAT_THRESHOLDS[currentLevel - 1] || 0;
  const nextThreshold =
    SQUAT_THRESHOLDS[currentLevel] ??
    SQUAT_THRESHOLDS[SQUAT_THRESHOLDS.length - 1] ??
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
export function suggestNextSquatExercises(
  currentLevel: number,
  totalSets: number,
  preferredStyle: "strict" | "explosive" | "mobility" | "mixed" = "strict"
): string[] {
  const suggestions: string[] = [];

  if (currentLevel <= 2) {
    suggestions.push("Foque em exercícios isométricos e assistidos");
    suggestions.push("Pratique air squats com profundidade gradual");
    suggestions.push("Use cadeira/caixa para construir confiança");
  } else if (currentLevel <= 5) {
    suggestions.push("Transite para air squats completos");
    suggestions.push("Incorpore pausas para força isométrica");
    suggestions.push("Explore mobilidade com cossack squats");
    suggestions.push("Adicione explosividade controlada");
  } else if (currentLevel <= 8) {
    suggestions.push("Domine variações unilaterais");
    suggestions.push("Incorpore peso quando a técnica for perfeita");
    suggestions.push("Foque em profundidade extrema");
    suggestions.push("Combine força com controle explosivo");
  } else {
    suggestions.push("Priorize qualidade técnica sobre volume");
    suggestions.push("Explore variações lendárias com controle");
    suggestions.push("Mantenha consistência na forma perfeita");
    suggestions.push("Foco em força unilateral e mobilidade extrema");
  }

  // Ajustes baseados no estilo preferido
  if (preferredStyle === "explosive") {
    suggestions.push("Incorpore variações com salto controlado");
  } else if (preferredStyle === "mobility") {
    suggestions.push("Priorize exercícios de amplitude e flexibilidade");
  } else if (preferredStyle === "strict") {
    suggestions.push("Mantenha forma strict e controlada");
  }

  return suggestions;
}

/**
 * Valida se o progresso está saudável (evita overtraining)
 */
export function validateSquatProgressHealth(
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
    warnings.push("Alta frequência pode levar a overtraining nos quadríceps");
    recommendations.push("Considere reduzir para 3-4 sessões por semana");
  }

  // Verifica volume por sessão
  if (averageSessionSets > 60) {
    warnings.push("Volume muito alto por sessão pode causar fadiga");
    recommendations.push(
      "Divida o treino em dias específicos por grupo muscular"
    );
  }

  // Verifica progresso consistente
  const expectedSets = sessionsPerWeek * 4 * 12; // 4 semanas * média 12 séries
  if (totalSets < expectedSets * 0.5) {
    warnings.push("Progresso lento detectado - foque na consistência");
    recommendations.push("Aumente frequência ou intensidade gradualmente");
  }

  // Verifica saúde articular
  if (totalSets > 1000 && sessionsPerWeek < 2) {
    warnings.push("Volume alto com baixa frequência pode causar lesões");
    recommendations.push("Aumente frequência e reduza volume por sessão");
  }

  return {
    isHealthy: warnings.length === 0,
    warnings,
    recommendations,
  };
}
