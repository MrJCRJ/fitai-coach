import type { ChallengeResult } from "../challengeWorkout";

/**
 * Processa os resultados de um desafio e gera um resumo detalhado
 */
export function processChallengeResults(
  challengeResults: ChallengeResult[],
): string {
  if (!challengeResults || challengeResults.length === 0) {
    return "Nenhum resultado de desafio disponível ainda.";
  }

  const summary = challengeResults
    .map((result, index) => {
      let performanceSummary = "";

      if (!result.canPerform) {
        return `Exercício ${index + 1} (${result.exerciseName}): Não conseguiu executar - Motivo: ${result.skipReason || "Não especificado"}`;
      }

      switch (result.exerciseId) {
        case "pushup-test":
        case "pushup-knee-test":
        case "squat-test":
        case "burpee-test":
          performanceSummary = `${result.completedReps || 0} repetições`;
          break;
        case "plank-test":
        case "plank-knee-test":
        case "wall-sit-test":
          performanceSummary = `${result.completedTime || 0} segundos`;
          break;
        case "mountain-climber-test":
          performanceSummary = `${result.completedReps || 0} repetições em 30 segundos`;
          break;
        default:
          if (result.completedReps !== undefined) {
            performanceSummary = `${result.completedReps} repetições`;
          } else if (result.completedTime !== undefined) {
            performanceSummary = `${result.completedTime} segundos`;
          } else if (result.measuredValue !== undefined) {
            performanceSummary = `${result.measuredValue} unidades`;
          } else {
            performanceSummary = "Resultado não especificado";
          }
      }

      return `Exercício ${index + 1} (${result.exerciseName}): ${performanceSummary} - Dificuldade percebida: ${result.perceivedDifficulty}/5 - Tempo de descanso usado: ${result.restTime || 0}s`;
    })
    .join("\n");

  // Calcular estatísticas gerais
  const completedResults = challengeResults.filter((r) => r.canPerform);
  const avgDifficulty =
    completedResults.length > 0
      ? completedResults.reduce((sum, r) => sum + r.perceivedDifficulty, 0) /
        completedResults.length
      : 0;

  const totalTime = completedResults.reduce(
    (sum, r) => sum + (r.completedTime || r.timeUsed || 0),
    0,
  );
  const totalRestTime = completedResults.reduce(
    (sum, r) => sum + (r.restTime || 0),
    0,
  );

  const statsSummary = `\n\nEstatísticas Gerais:
- Número de exercícios completados: ${completedResults.length}/${challengeResults.length}
- Dificuldade média percebida: ${avgDifficulty.toFixed(1)}/5
- Tempo total de exercício: ${totalTime} segundos
- Tempo total de descanso: ${totalRestTime} segundos
- Tempo total da sessão: ${totalTime + totalRestTime} segundos`;

  return `RESULTADOS DO DESAFIO DE AVALIAÇÃO:\n${summary}${statsSummary}`;
}

/**
 * Calcula estatísticas agregadas dos resultados do desafio
 */
export function calculateChallengeStats(challengeResults: ChallengeResult[]) {
  const completedResults = challengeResults.filter((r) => r.canPerform);

  const avgDifficulty =
    completedResults.length > 0
      ? completedResults.reduce((sum, r) => sum + r.perceivedDifficulty, 0) /
        completedResults.length
      : 0;

  const totalTime = completedResults.reduce(
    (sum, r) => sum + (r.completedTime || r.timeUsed || 0),
    0,
  );

  const totalRestTime = completedResults.reduce(
    (sum, r) => sum + (r.restTime || 0),
    0,
  );

  return {
    totalExercises: challengeResults.length,
    completedExercises: completedResults.length,
    completionRate:
      challengeResults.length > 0
        ? (completedResults.length / challengeResults.length) * 100
        : 0,
    averageDifficulty: avgDifficulty,
    totalExerciseTime: totalTime,
    totalRestTime,
    totalSessionTime: totalTime + totalRestTime,
  };
}
