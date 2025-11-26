export interface ChallengeResult {
  exerciseId: string;
  exerciseName: string;
  completedReps?: number;
  completedTime?: number; // em segundos
  measuredValue?: number; // para medições como altura do salto
  perceivedDifficulty: 1 | 2 | 3 | 4 | 5; // 1=muito fácil, 5=muito difícil
  notes?: string;
  canPerform: boolean; // se o usuário consegue fazer o exercício
  skipReason?: string; // motivo pelo qual não consegue fazer
  timeLimit?: number; // tempo limite em segundos para exercícios timed
  timeUsed?: number; // tempo realmente usado em segundos (para timed_max_effort)
  restTime?: number; // tempo de descanso antes deste exercício em segundos
}

export interface ChallengeWorkout {
  id: string;
  name: string;
  exercises: ChallengeExercise[];
}

export interface ChallengeExercise {
  id: string;
  name: string;
  type: "reps" | "time" | "max_effort" | "timed_max_effort" | "measurement";
  target: string; // "Máximo de repetições" ou "30 segundos" etc
  instructions: string;
  restTime: number; // segundos
  timeLimit?: number; // tempo limite para exercícios timed_max_effort
  measurementUnit?: string; // unidade para medições (cm, kg, etc.)
}

// Treino de desafio padrão
export const defaultChallengeWorkout: ChallengeWorkout = {
  id: "challenge-test",
  name: "Teste de Nível Físico Completo",
  exercises: [
    {
      id: "pushup-test",
      name: "Flexão de Braços",
      type: "max_effort",
      target: "Máximo de repetições",
      instructions:
        "Faça o máximo de flexões que conseguir com boa forma. Pare quando não conseguir mais manter a forma correta. Se não conseguir fazer nenhuma, selecione 'Não consigo fazer'.",
      restTime: 60,
    },
    {
      id: "pushup-knee-test",
      name: "Flexão de Joelho",
      type: "max_effort",
      target: "Máximo de repetições (versão modificada)",
      instructions:
        "Faça flexões apoiando os joelhos no chão. Faça o máximo que conseguir com boa forma.",
      restTime: 45,
    },
    {
      id: "plank-test",
      name: "Prancha Isométrica",
      type: "time",
      target: "Máximo de tempo",
      instructions:
        "Mantenha a posição de prancha (antebraços no chão, corpo reto). Pare quando não conseguir mais manter a forma.",
      restTime: 60,
    },
    {
      id: "plank-knee-test",
      name: "Prancha de Joelho",
      type: "time",
      target: "Máximo de tempo (versão modificada)",
      instructions:
        "Mantenha a posição de prancha apoiando os joelhos no chão. Foque em manter o core contraído.",
      restTime: 45,
    },
    {
      id: "squat-test",
      name: "Agachamento Livre",
      type: "max_effort",
      target: "Máximo de repetições",
      instructions:
        "Faça o máximo de agachamentos que conseguir. Os pés devem ficar afastados na largura dos ombros.",
      restTime: 60,
    },
    {
      id: "wall-sit-test",
      name: "Parede Sentado",
      type: "time",
      target: "Máximo de tempo",
      instructions:
        "Deslize pelas costas na parede até ficar em posição de sentado (joelhos em 90 graus). Mantenha por quanto tempo conseguir.",
      restTime: 60,
    },
    {
      id: "burpee-test",
      name: "Burpee",
      type: "max_effort",
      target: "Máximo de repetições em 30 segundos",
      instructions:
        "Execute burpees completos: agache, chute as pernas para trás, faça uma flexão, volte e pule. Faça o máximo em 30 segundos.",
      restTime: 90,
    },
    {
      id: "mountain-climber-test",
      name: "Escalador de Montanha",
      type: "time",
      target: "Máximo de repetições em 30 segundos",
      instructions:
        "Em posição de prancha, alterne trazendo os joelhos em direção ao peito rapidamente. Conte as repetições em 30 segundos.",
      restTime: 60,
    },
  ],
};

// Salvar resultados do desafio
export function saveChallengeResults(results: ChallengeResult[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("fitai-challenge-results", JSON.stringify(results));
    localStorage.setItem("fitai-challenge-completed", "true");
  }
}

// Carregar resultados do desafio
export function loadChallengeResults(): ChallengeResult[] | null {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("fitai-challenge-results");
    return saved ? JSON.parse(saved) : null;
  }
  return null;
}

// Verificar se desafio foi completado
export function isChallengeCompleted(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem("fitai-challenge-completed") === "true";
  }
  return false;
}

// Salvar desafio personalizado
export function savePersonalizedChallenge(challenge: ChallengeWorkout): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "fitai-personalized-challenge",
      JSON.stringify(challenge),
    );
  }
}

// Carregar desafio personalizado
export function loadPersonalizedChallenge(): ChallengeWorkout | null {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("fitai-personalized-challenge");
    return saved ? JSON.parse(saved) : null;
  }
  return null;
}

// Limpar desafio personalizado
export function clearPersonalizedChallenge(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("fitai-personalized-challenge");
  }
}

// Calcular nível baseado nos resultados do desafio
export function calculateLevelFromChallenge(results: ChallengeResult[]): {
  level: "beginner" | "intermediate" | "advanced";
  description: string;
  score: number;
} {
  if (!results || results.length === 0) {
    return { level: "beginner", description: "Iniciante", score: 0 };
  }

  let totalScore = 0;
  let maxScore = 0;
  let completedExercises = 0;
  let skippedExercises = 0;

  results.forEach((result) => {
    if (!result.canPerform) {
      skippedExercises++;
      return;
    }

    completedExercises++;
    maxScore += 5; // dificuldade máxima por exercício

    // Pontuação baseada na dificuldade percebida (invertida)
    const difficultyScore = 6 - result.perceivedDifficulty; // 1=muito fácil=5pts, 5=muito difícil=1pt
    totalScore += difficultyScore;

    // Bônus baseado no desempenho
    if (result.completedReps !== undefined) {
      if (
        result.exerciseId.includes("pushup") &&
        !result.exerciseId.includes("knee")
      ) {
        if (result.completedReps >= 30) totalScore += 4;
        else if (result.completedReps >= 20) totalScore += 3;
        else if (result.completedReps >= 10) totalScore += 2;
        else if (result.completedReps >= 5) totalScore += 1;
      } else if (result.exerciseId.includes("pushup-knee")) {
        if (result.completedReps >= 15) totalScore += 3;
        else if (result.completedReps >= 10) totalScore += 2;
        else if (result.completedReps >= 5) totalScore += 1;
      } else if (result.exerciseId.includes("squat")) {
        if (result.completedReps >= 40) totalScore += 4;
        else if (result.completedReps >= 30) totalScore += 3;
        else if (result.completedReps >= 20) totalScore += 2;
        else if (result.completedReps >= 10) totalScore += 1;
      } else if (result.exerciseId.includes("burpee")) {
        if (result.completedReps >= 15) totalScore += 4;
        else if (result.completedReps >= 10) totalScore += 3;
        else if (result.completedReps >= 5) totalScore += 2;
        else if (result.completedReps >= 2) totalScore += 1;
      }
    }

    if (result.completedTime !== undefined) {
      if (
        result.exerciseId.includes("plank") &&
        !result.exerciseId.includes("knee")
      ) {
        if (result.completedTime >= 120) totalScore += 4;
        else if (result.completedTime >= 90) totalScore += 3;
        else if (result.completedTime >= 60) totalScore += 2;
        else if (result.completedTime >= 30) totalScore += 1;
      } else if (result.exerciseId.includes("plank-knee")) {
        if (result.completedTime >= 90) totalScore += 3;
        else if (result.completedTime >= 60) totalScore += 2;
        else if (result.completedTime >= 30) totalScore += 1;
      } else if (result.exerciseId.includes("wall-sit")) {
        if (result.completedTime >= 90) totalScore += 4;
        else if (result.completedTime >= 60) totalScore += 3;
        else if (result.completedTime >= 30) totalScore += 2;
        else if (result.completedTime >= 15) totalScore += 1;
      }
    }
  });

  // Penalizar por exercícios pulados
  if (skippedExercises > 0) {
    totalScore -= skippedExercises * 2;
  }

  const averageScore = maxScore > 0 ? totalScore / maxScore : 0;

  let level: "beginner" | "intermediate" | "advanced";
  let description: string;

  if (averageScore >= 0.8) {
    level = "advanced";
    description = "Avançado";
  } else if (averageScore >= 0.6) {
    level = "intermediate";
    description = "Intermediário";
  } else {
    level = "beginner";
    description = "Iniciante";
  }

  // Ajustar baseado na taxa de conclusão
  const completionRate = completedExercises / results.length;
  if (completionRate < 0.5) {
    level = "beginner";
    description = "Iniciante (muitas limitações)";
  }

  return { level, description, score: Math.round(averageScore * 100) };
}
