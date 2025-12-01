import { DetailedWorkoutSession } from "@/lib/workoutTypes";

/**
 * Calcula o nível atual baseado no número total de sets completados
 * Sistema de progressão: 10→25→50→100→200→400→800→800+ sets
 */
export function calculateLevelFromSets(totalSets: number): number {
  // Gamificação removida — retornar nível neutro (1) para compatibilidade
  void totalSets;
  return 1;
}

/**
 * Calcula o nível atual de um exercício específico baseado no histórico de sessões
 */
export function calculateExerciseLevel(
  exerciseId: string,
  sessions: DetailedWorkoutSession[],
): number {
  // Gamificação removida — sempre retornar nível neutro (1)
  void exerciseId;
  void sessions;
  return 1;
}

/**
 * Calcula níveis para todos os exercícios principais (push-up, pull-up, squat)
 */
export function calculateAllExerciseLevels(sessions: DetailedWorkoutSession[]) {
  // Gamificação removida — manter valores neutros para compatibilidade
  void sessions;
  return {
    pushUpLevel: 1,
    pullUpLevel: 1,
    squatLevel: 1,
  };
}
