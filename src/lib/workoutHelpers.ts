import {
  pushUpVariations,
  pullUpVariations,
  squatVariations,
} from "@/lib/exercises";
import type { Exercise } from "@/lib/exercises";
import {
  beginnerPushups,
  intermediatePushups,
  advancedPushups,
  extremePushups,
} from "@/lib/exercises/variations/pushups";
import {
  getPullExercisesByLevel as getPullExercisesFromModule,
  beginnerPull,
  intermediatePull,
  advancedPull,
  extremePull,
} from "@/lib/exercises/variations/pull";
import {
  getSquatExercisesByLevel as getSquatExercisesFromModule,
  beginnerSquat,
  intermediateSquat,
  advancedSquat,
  extremeSquat,
} from "@/lib/exercises/variations/squat";

/**
 * Mapeia o nome da aba ativa para o tipo de exercício
 */
export function getExerciseTypeFromTab(
  activeTab: string
): "pushup" | "pullup" | "squat" {
  switch (activeTab) {
    case "empurrar":
      return "pushup";
    case "puxar":
      return "pullup";
    case "pernas":
      return "squat";
    default:
      return "pushup";
  }
}

/**
 * Mapeia o nome da aba ativa para o grupo muscular
 */
export function getMuscleGroupFromTab(
  activeTab: string
): "pushup" | "pullup" | "squat" {
  return getExerciseTypeFromTab(activeTab);
}

/**
 * Obtém o nome do exercício baseado no ID, aba ativa e nível selecionado
 */
export function getExerciseName(
  exerciseId: string,
  activeTab: string,
  selectedLevel: number
): string {
  const variations =
    activeTab === "empurrar"
      ? pushUpVariations
      : activeTab === "puxar"
        ? pullUpVariations
        : squatVariations;

  return (
    variations[selectedLevel]?.name || `${exerciseId} - Nível ${selectedLevel}`
  );
}

/**
 * Obtém as variações de exercício baseado na aba ativa
 */
export function getExerciseVariations(activeTab: string) {
  switch (activeTab) {
    case "empurrar":
      // Dips agora fazem parte dos push-ups, então sempre retorna pushUpVariations
      return pushUpVariations;
    case "puxar":
      return pullUpVariations;
    case "pernas":
      return squatVariations;
    default:
      return pushUpVariations;
  }
}

/**
 * Obtém o nível selecionado baseado na aba ativa
 */
export function getSelectedLevel(
  activeTab: string,
  selectedPushUpLevel: number,
  selectedPullUpLevel: number,
  selectedSquatLevel: number,
  selectedDipLevel?: number,
  pushExerciseType?: "pushup" | "dip"
): number {
  switch (activeTab) {
    case "empurrar":
      return pushExerciseType === "dip" && selectedDipLevel
        ? selectedDipLevel
        : selectedPushUpLevel;
    case "puxar":
      return selectedPullUpLevel;
    case "pernas":
      return selectedSquatLevel;
    default:
      return selectedPushUpLevel;
  }
}

/**
 * Organiza exercícios de push-up por nível (incluindo dips)
 */
export function getPushExercisesByLevel() {
  const exercisesByLevel: Record<
    number,
    { pushup?: Exercise; dip?: Exercise }
  > = {};

  // Adicionar todos os exercícios de push-up
  Object.entries(beginnerPushups).forEach(([level, exercise]) => {
    const levelNum = parseInt(level);
    exercisesByLevel[levelNum] = { pushup: exercise };
  });

  // Adicionar exercícios intermediários
  Object.entries(intermediatePushups).forEach(([level, exercise]) => {
    const levelNum = parseInt(level);
    exercisesByLevel[levelNum] = { pushup: exercise };
  });

  // Adicionar exercícios avançados
  Object.entries(advancedPushups).forEach(([level, exercise]) => {
    const levelNum = parseInt(level);
    exercisesByLevel[levelNum] = { pushup: exercise };
  });

  // Adicionar exercícios extremos
  Object.entries(extremePushups).forEach(([level, exercise]) => {
    const levelNum = parseInt(level);
    exercisesByLevel[levelNum] = { pushup: exercise };
  });

  // Adicionar dips em níveis específicos onde fazem sentido
  // Nível 10: Dips básicos junto com push-ups intermediários
  if (exercisesByLevel[10]) {
    exercisesByLevel[10].dip = {
      id: "bench-dips",
      name: "Dips no Banco",
      muscleGroup: "chest",
      difficulty: "beginner",
      sets: 3,
      reps: "5-12",
      rest: "90s",
      instructions:
        "Sente na borda do banco, mãos ao lado do corpo. Desça até formar 90° nos cotovelos.",
      tips: "Foca tríceps e peito inferior. Mantenha cotovelos próximos.",
      equipment: ["banco"],
      calories: 8,
      xpReward: 15,
      estimatedTime: 240,
      category: "strength",
      emoji: "🪑",
    };
  }

  // Nível 20: Dips intermediários
  if (exercisesByLevel[20]) {
    exercisesByLevel[20].dip = {
      id: "parallel-bar-dips",
      name: "Dips em Barras Paralelas",
      muscleGroup: "chest",
      difficulty: "intermediate",
      sets: 3,
      reps: "4-10",
      rest: "120s",
      instructions:
        "Apoie-se nas barras paralelas com os braços estendidos. Desça até formar 90° nos cotovelos.",
      tips: "Mantenha o corpo reto e cotovelos próximos. Movimento completo.",
      equipment: ["barras paralelas"],
      calories: 16,
      xpReward: 40,
      estimatedTime: 480,
      category: "strength",
      emoji: "🏗️",
    };
  }

  return exercisesByLevel;
}

/**
 * Organiza exercícios de puxar por nível
 */
export function getPullExercisesByLevel() {
  const exercisesByLevel: Record<number, { pullup?: Exercise }> = {};

  // Usar a função do módulo pull que já filtra por nível disponível
  const availableExercises = getPullExercisesFromModule(48); // Máximo nível possível

  // Transformar para o formato esperado pelo carousel
  Object.entries(availableExercises).forEach(([level, exercise]) => {
    const levelNum = parseInt(level);
    exercisesByLevel[levelNum] = { pullup: exercise };
  });

  return exercisesByLevel;
}

/**
 * Mapeia nível numérico para categoria de dificuldade (push-ups incluindo dips)
 */
export function getDifficultyCategory(level: number): string {
  if (level <= 10) return "Iniciante";
  if (level <= 20) return "Intermediário";
  if (level <= 30) return "Avançado";
  return "Extremo";
}

/**
 * Agrupa níveis por categoria de dificuldade (todos os exercícios)
 * Função dinâmica que detecta automaticamente os níveis disponíveis
 */
export function getLevelsByDifficulty(): Record<string, number[]> {
  // Obter todos os níveis disponíveis dinamicamente de todos os exercícios
  const allLevels = [
    // Push-ups (incluindo dips integrados)
    ...Object.keys(beginnerPushups).map((k) => parseInt(k)),
    ...Object.keys(intermediatePushups).map((k) => parseInt(k)),
    ...Object.keys(advancedPushups).map((k) => parseInt(k)),
    ...Object.keys(extremePushups).map((k) => parseInt(k)),
    // Pull-ups
    ...Object.keys(beginnerPull).map((k) => parseInt(k)),
    ...Object.keys(intermediatePull).map((k) => parseInt(k)),
    ...Object.keys(advancedPull).map((k) => parseInt(k)),
    ...Object.keys(extremePull).map((k) => parseInt(k)),
    // Squats
    ...Object.keys(beginnerSquat).map((k) => parseInt(k)),
    ...Object.keys(intermediateSquat).map((k) => parseInt(k)),
    ...Object.keys(advancedSquat).map((k) => parseInt(k)),
    ...Object.keys(extremeSquat).map((k) => parseInt(k)),
  ]
    .filter((level, index, arr) => arr.indexOf(level) === index) // Remover duplicatas
    .sort((a, b) => a - b);

  // Agrupar por dificuldade
  const levelsByDifficulty: Record<string, number[]> = {
    Iniciante: [],
    Intermediário: [],
    Avançado: [],
    Extremo: [],
  };

  allLevels.forEach((level) => {
    if (level <= 10) {
      levelsByDifficulty["Iniciante"]!.push(level);
    } else if (level <= 20) {
      levelsByDifficulty["Intermediário"]!.push(level);
    } else if (level <= 30) {
      levelsByDifficulty["Avançado"]!.push(level);
    } else {
      levelsByDifficulty["Extremo"]!.push(level);
    }
  });

  return levelsByDifficulty;
}

/**
 * Organiza exercícios de pernas por nível
 */
export function getSquatExercisesByLevel() {
  const exercisesByLevel: Record<number, { squat?: Exercise }> = {};

  // Usar a função do módulo squat que já filtra por nível disponível
  const availableExercises = getSquatExercisesFromModule(48); // Máximo nível possível

  // Transformar para o formato esperado pelo carousel
  Object.entries(availableExercises).forEach(([level, exercise]) => {
    const levelNum = parseInt(level);
    exercisesByLevel[levelNum] = { squat: exercise };
  });

  return exercisesByLevel;
}
