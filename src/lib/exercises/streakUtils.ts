import type { UserProgress } from "@/lib/exercises";

/**
 * Utilitários para gerenciamento de streaks (sequências)
 */

/**
 * Atualiza as streaks do usuário baseado na data do treino
 */
export function updateStreaks(
  userProgress: UserProgress,
  workoutDate: string,
): void {
  const today = new Date(workoutDate).toDateString();
  const lastWorkout = userProgress.streaks.lastWorkoutDate
    ? new Date(userProgress.streaks.lastWorkoutDate).toDateString()
    : null;

  if (!lastWorkout) {
    // Primeiro treino
    userProgress.streaks.current = 1;
    userProgress.streaks.longest = 1;
  } else if (lastWorkout === today) {
    // Já treinou hoje, não conta
    return;
  } else {
    const daysDiff = Math.floor(
      (new Date(today).getTime() - new Date(lastWorkout).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (daysDiff === 1) {
      // Treino consecutivo
      userProgress.streaks.current++;
      userProgress.streaks.longest = Math.max(
        userProgress.streaks.longest,
        userProgress.streaks.current,
      );
    } else {
      // Streak quebrada
      userProgress.streaks.current = 1;
    }
  }

  userProgress.streaks.lastWorkoutDate = workoutDate;
}

/**
 * Verifica se o usuário tem uma streak ativa
 */
export function hasActiveStreak(userProgress: UserProgress): boolean {
  return userProgress.streaks.current > 1;
}

/**
 * Calcula quantos dias faltam para quebrar a streak atual
 */
export function daysUntilStreakBreak(userProgress: UserProgress): number {
  if (!userProgress.streaks.lastWorkoutDate) return 0;

  const lastWorkout = new Date(userProgress.streaks.lastWorkoutDate);
  const now = new Date();
  const daysSinceLastWorkout = Math.floor(
    (now.getTime() - lastWorkout.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Se já passou mais de 1 dia, a streak está em risco
  return Math.max(0, 2 - daysSinceLastWorkout);
}

/**
 * Formata streak para exibição
 */
export function formatStreak(days: number): string {
  if (days === 1) return "1 dia";
  return `${days} dias`;
}
