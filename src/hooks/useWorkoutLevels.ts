import { useState } from "react";

interface SimpleExercise {
  exerciseId: string;
  sets: unknown[];
}

interface SimpleSession {
  exercises: SimpleExercise[];
}

export function useWorkoutLevels() {
  // Estados para os níveis calculados (baseados no progresso histórico)
  const [currentPushUpLevel] = useState<number>(() => {
    if (typeof window === "undefined") return 1;

    const savedDetailed = localStorage.getItem("detailedWorkoutSessions");
    if (!savedDetailed) return 1;

    const sessions: SimpleSession[] = JSON.parse(savedDetailed);
    let totalSets = 0;

    sessions.forEach((session) => {
      const exercise = session.exercises.find(
        (ex) => ex.exerciseId === "flexao",
      );
      if (exercise) {
        totalSets += exercise.sets.length;
      }
    });

    if (totalSets < 10) return 1;
    if (totalSets < 25) return 2;
    if (totalSets < 50) return 3;
    if (totalSets < 100) return 4;
    if (totalSets < 200) return 5;
    if (totalSets < 400) return 6;
    if (totalSets < 800) return 7;
    return 8;
  });

  const [currentPullUpLevel] = useState<number>(() => {
    if (typeof window === "undefined") return 1;

    const savedDetailed = localStorage.getItem("detailedWorkoutSessions");
    if (!savedDetailed) return 1;

    const sessions: SimpleSession[] = JSON.parse(savedDetailed);
    let totalSets = 0;

    sessions.forEach((session) => {
      const exercise = session.exercises.find(
        (ex) => ex.exerciseId === "barra",
      );
      if (exercise) {
        totalSets += exercise.sets.length;
      }
    });

    if (totalSets < 10) return 1;
    if (totalSets < 25) return 2;
    if (totalSets < 50) return 3;
    if (totalSets < 100) return 4;
    if (totalSets < 200) return 5;
    if (totalSets < 400) return 6;
    if (totalSets < 800) return 7;
    return 8;
  });

  const [currentSquatLevel] = useState<number>(() => {
    if (typeof window === "undefined") return 1;

    const savedDetailed = localStorage.getItem("detailedWorkoutSessions");
    if (!savedDetailed) return 1;

    const sessions: SimpleSession[] = JSON.parse(savedDetailed);
    let totalSets = 0;

    sessions.forEach((session) => {
      const exercise = session.exercises.find(
        (ex) => ex.exerciseId === "agachamento",
      );
      if (exercise) {
        totalSets += exercise.sets.length;
      }
    });

    if (totalSets < 10) return 1;
    if (totalSets < 25) return 2;
    if (totalSets < 50) return 3;
    if (totalSets < 100) return 4;
    if (totalSets < 200) return 5;
    if (totalSets < 400) return 6;
    if (totalSets < 800) return 7;
    return 8;
  });

  const [currentDipLevel] = useState<number>(() => {
    if (typeof window === "undefined") return 1;

    const savedDetailed = localStorage.getItem("detailedWorkoutSessions");
    if (!savedDetailed) return 1;

    const sessions: SimpleSession[] = JSON.parse(savedDetailed);
    let totalSets = 0;

    sessions.forEach((session) => {
      const exercise = session.exercises.find((ex) => ex.exerciseId === "dip");
      if (exercise) {
        totalSets += exercise.sets.length;
      }
    });

    if (totalSets < 10) return 1;
    if (totalSets < 25) return 2;
    if (totalSets < 50) return 3;
    if (totalSets < 100) return 4;
    if (totalSets < 200) return 5;
    if (totalSets < 400) return 6;
    return 6; // Dips têm apenas 6 níveis
  });

  // Estados para os níveis selecionados em cada carrossel (podem ser diferentes dos calculados)
  const [selectedPushUpLevel, setSelectedPushUpLevel] =
    useState<number>(currentPushUpLevel);
  const [selectedPullUpLevel, setSelectedPullUpLevel] =
    useState<number>(currentPullUpLevel);
  const [selectedSquatLevel, setSelectedSquatLevel] =
    useState<number>(currentSquatLevel);
  const [selectedDipLevel, setSelectedDipLevel] =
    useState<number>(currentDipLevel);

  return {
    // Níveis calculados (somente leitura)
    currentPushUpLevel,
    currentPullUpLevel,
    currentSquatLevel,
    currentDipLevel,

    // Níveis selecionados (podem ser modificados)
    selectedPushUpLevel,
    selectedPullUpLevel,
    selectedSquatLevel,
    selectedDipLevel,
    setSelectedPushUpLevel,
    setSelectedPullUpLevel,
    setSelectedSquatLevel,
    setSelectedDipLevel,
  };
}
