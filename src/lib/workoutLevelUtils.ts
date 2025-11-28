import { DetailedWorkoutSession } from "@/lib/workoutTypes";

/**
 * Calcula o nível atual baseado no número total de sets completados
 * Sistema de progressão: 10→25→50→100→200→400→800→800+ sets
 */
export function calculateLevelFromSets(totalSets: number): number {
  if (totalSets < 10) return 1;
  if (totalSets < 25) return 2;
  if (totalSets < 50) return 3;
  if (totalSets < 100) return 4;
  if (totalSets < 200) return 5;
  if (totalSets < 400) return 6;
  if (totalSets < 800) return 7;
  return 8;
}

/**
 * Calcula o nível atual de um exercício específico baseado no histórico de sessões
 */
export function calculateExerciseLevel(
  exerciseId: string,
  sessions: DetailedWorkoutSession[],
): number {
  let totalSets = 0;

  sessions.forEach((session) => {
    const exercise = session.exercises.find(
      (ex) => ex.exerciseId === exerciseId,
    );
    if (exercise) {
      totalSets += exercise.sets.length;
    }
  });

  return calculateLevelFromSets(totalSets);
}

/**
 * Calcula níveis para todos os exercícios principais (push-up, pull-up, squat)
 */
export function calculateAllExerciseLevels(sessions: DetailedWorkoutSession[]) {
  return {
    pushUpLevel: calculateExerciseLevel("flexao", sessions),
    pullUpLevel: calculateExerciseLevel("barra", sessions),
    squatLevel: calculateExerciseLevel("agachamento", sessions),
  };
}
