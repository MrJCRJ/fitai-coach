// ====================
// UTILITÁRIOS PARA EXERCÍCIOS
// ====================

import { Exercise } from "@/lib/exercises";

/**
 * Formata a representação de repetições
 */
export function formatReps(
  reps: string | { min: number; max: number; unit?: string } | undefined,
): string {
  if (!reps) return "10-15";

  if (typeof reps === "string") {
    return reps;
  }

  const unit = reps.unit || "reps";
  return `${reps.min}-${reps.max} ${unit}`;
}

/**
 * Obtém o número mínimo de repetições
 */
export function getMinReps(
  reps: string | { min: number; max: number; unit?: string } | undefined,
): number {
  if (!reps) return 10;
  if (typeof reps === "string") {
    const parts = reps.split("-");
    const firstPart = parts[0];
    return firstPart ? parseInt(firstPart) || 10 : 10;
  }
  return reps.min;
}

/**
 * Formata tempo em segundos para MM:SS
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

/**
 * Verifica se um exercício é válido (tem nome)
 */
export function isValidExercise(
  exercise: Exercise | undefined,
): exercise is Exercise {
  return (
    exercise !== undefined &&
    exercise.name !== undefined &&
    exercise.name !== ""
  );
}

/**
 * Filtra exercícios válidos de um objeto
 */
export function getValidExercises<
  T extends Record<string, Exercise | undefined>,
>(exercises: T): Array<[keyof T, Exercise]> {
  return Object.entries(exercises).filter(([, exercise]) =>
    isValidExercise(exercise),
  ) as Array<[keyof T, Exercise]>;
}
