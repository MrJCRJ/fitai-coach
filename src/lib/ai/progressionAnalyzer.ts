export interface ProgressionCriteria {
  weeksCompleted: number;
  averageCompletionRate: number; // 0-100%
  averageDifficultyRating: number; // 1-5
  consistencyScore: number; // 0-100%
  lastWeekPerformance: number; // 0-100%
  timeSinceLastProgression: number; // dias
  currentLevel: "beginner" | "intermediate" | "advanced";
}

export interface ProgressionAnalysis {
  shouldProgress: boolean;
  progressionType: "volume" | "intensity" | "complexity" | "frequency" | "none";
  reason: string;
  confidence: number; // 0-100%
}

/**
 * Analisa se o usuário deve progredir no treino baseado em critérios de performance
 */
export function analyzeProgressionNeeds(
  progressionData: ProgressionCriteria,
): ProgressionAnalysis {
  const {
    weeksCompleted,
    averageCompletionRate,
    averageDifficultyRating,
    consistencyScore,
    lastWeekPerformance,
    timeSinceLastProgression,
    currentLevel,
  } = progressionData;

  // Critérios para progressão
  const highPerformance =
    averageCompletionRate >= 85 && lastWeekPerformance >= 80;
  const goodConsistency = consistencyScore >= 70;
  const appropriateDifficulty = averageDifficultyRating <= 3.5; // Não muito fácil
  const timeThreshold = timeSinceLastProgression >= 2; // Pelo menos 2 semanas

  // Lógica de progressão baseada no nível atual
  if (currentLevel === "beginner") {
    // Iniciantes: foco em consistência e adaptação
    if (highPerformance && goodConsistency && timeThreshold) {
      if (averageDifficultyRating <= 2.5) {
        // Muito fácil - aumentar volume
        return {
          shouldProgress: true,
          progressionType: "volume",
          reason:
            "Exercícios estão muito fáceis. Vamos aumentar o volume de treino.",
          confidence: 85,
        };
      } else {
        // Adequado - aumentar frequência ou complexidade
        return {
          shouldProgress: true,
          progressionType: weeksCompleted >= 4 ? "frequency" : "complexity",
          reason:
            weeksCompleted >= 4
              ? "Boa consistência. Vamos aumentar a frequência dos treinos."
              : "Adaptação boa. Vamos introduzir exercícios mais complexos.",
          confidence: 80,
        };
      }
    }
  } else if (currentLevel === "intermediate") {
    // Intermediários: foco em intensidade e variação
    if (
      highPerformance &&
      goodConsistency &&
      appropriateDifficulty &&
      timeThreshold
    ) {
      if (lastWeekPerformance >= 90) {
        // Excelente performance - aumentar intensidade
        return {
          shouldProgress: true,
          progressionType: "intensity",
          reason:
            "Performance excelente. Vamos aumentar a intensidade dos exercícios.",
          confidence: 90,
        };
      } else {
        // Boa performance - aumentar volume ou complexidade
        return {
          shouldProgress: true,
          progressionType:
            averageDifficultyRating <= 3 ? "complexity" : "volume",
          reason:
            averageDifficultyRating <= 3
              ? "Vamos introduzir variações mais desafiadoras."
              : "Vamos aumentar o volume de trabalho.",
          confidence: 75,
        };
      }
    }
  } else if (currentLevel === "advanced") {
    // Avançados: foco em manutenção e refinamento
    if (highPerformance && goodConsistency && timeThreshold) {
      if (averageCompletionRate >= 95 && lastWeekPerformance >= 95) {
        // Performance excepcional - micro progressões
        return {
          shouldProgress: true,
          progressionType: "intensity",
          reason: "Performance excepcional. Pequenos ajustes de intensidade.",
          confidence: 70,
        };
      }
    }
  }

  // Não progredir
  if (averageCompletionRate < 70 || consistencyScore < 50) {
    return {
      shouldProgress: false,
      progressionType: "none",
      reason: "Foco em consistência e adaptação antes de progredir.",
      confidence: 95,
    };
  }

  if (averageDifficultyRating >= 4.5) {
    return {
      shouldProgress: false,
      progressionType: "none",
      reason: "Exercícios estão muito difíceis. Vamos manter o nível atual.",
      confidence: 90,
    };
  }

  return {
    shouldProgress: false,
    progressionType: "none",
    reason: "Aguardando mais dados para determinar progressão ideal.",
    confidence: 60,
  };
}
