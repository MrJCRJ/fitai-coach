/**
 * Utilitários para manipulação de exercícios e desafios
 */

import type { ChallengeExercise } from "@/lib/challengeWorkout";

/**
 * Detecta automaticamente o tipo de exercício baseado nas instruções
 */
export const detectExerciseType = (exercise: ChallengeExercise) => {
  const target = exercise.target.toLowerCase();
  const instructions = exercise.instructions.toLowerCase();

  // Verificar se é exercício com tempo limitado
  if (
    target.includes("em") &&
    /\d+\s*min|\d+\s*seg|\d+\s*second|em\s*\d+/.test(target)
  ) {
    return "timed_max_effort";
  }

  // Verificar se é medição (altura, peso, etc.)
  if (
    target.includes("altura") ||
    target.includes("peso") ||
    target.includes("medida") ||
    instructions.includes("meça") ||
    instructions.includes("marque")
  ) {
    return "measurement";
  }

  // Verificar se é tempo máximo
  if (
    target.includes("tempo") ||
    target.includes("segundos") ||
    target.includes("minutos")
  ) {
    return "time";
  }

  // Verificar se é máximo de repetições
  if (target.includes("repetições") || target.includes("reps")) {
    return "max_effort";
  }

  // Default
  return exercise.type || "max_effort";
};

/**
 * Extrai tempo limite das instruções do exercício
 */
export const extractTimeLimit = (target: string): number | undefined => {
  // Primeiro tentar "X min"
  const minMatch = target.match(/(\d+)\s*min/i);
  if (minMatch && minMatch[1]) {
    return parseInt(minMatch[1]) * 60;
  }

  // Depois tentar "X segundos" ou "X seg"
  const secMatch = target.match(/(\d+)\s*segundos?/i);
  if (secMatch && secMatch[1]) {
    return parseInt(secMatch[1]);
  }

  // Por último, tentar "em X" (assumir segundos)
  const emMatch = target.match(/em\s*(\d+)/i);
  if (emMatch && emMatch[1]) {
    return parseInt(emMatch[1]);
  }

  return undefined;
};

/**
 * Formata o target do exercício para exibição
 */
export const formatExerciseTarget = (target: string): string => {
  // Se contém "em X segundos" e X >= 60, converter para minutos
  const secondsMatch = target.match(/em (\d+) segundos?/);
  if (secondsMatch && secondsMatch[1]) {
    const seconds = parseInt(secondsMatch[1]);
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      return target.replace(/em \d+ segundos?/, `em ${minutes} min`);
    }
  }
  return target;
};

/**
 * Extrai unidade de medição do target do exercício
 */
export const extractMeasurementUnit = (target: string): string | undefined => {
  if (target.includes("altura")) return "cm";
  if (target.includes("peso")) return "kg";
  return undefined;
};
