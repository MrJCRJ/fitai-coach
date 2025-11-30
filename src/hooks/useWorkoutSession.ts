import { useState, useCallback } from "react";
import { workoutSaver } from "@/lib/workoutSaver";
import { Exercise } from "@/lib/exercises";
// DetailedWorkoutSession type no longer used (gamification removed)

interface WorkoutSessionState {
  [key: string]: {
    sets: {
      reps: number;
      time: number;
      level: number;
      exerciseName: string;
      restTime?: number;
      weight?: number;
    }[];
    totalTime: number;
  };
}

// Função utilitária para extrair o valor mínimo de reps
function getMinReps(
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

export function useWorkoutSession() {
  const [currentSession, setCurrentSession] = useState<WorkoutSessionState>({});

  // Gamification removed: user progress tracking/XP/achievements/streaks removed

  // Iniciar sessão de treino
  const startSession = useCallback(() => {
    workoutSaver.startSession();
  }, []);

  // Finalizar sessão de treino
  const finishSession = useCallback(() => {
    const detailedSession = workoutSaver.finishSession();
    if (detailedSession) {
      workoutSaver.saveToStorage(detailedSession);

      // No gamification update - keep session saved only
    }
    return detailedSession;
  }, []);

  // Salvar progresso de um exercício
  const saveProgress = useCallback(
    (
      exerciseId: string,
      reps: number,
      activeTab: string,
      selectedPushUpLevel: number,
      selectedPullUpLevel: number,
      selectedSquatLevel: number,
      timers: { [key: string]: number },
      weight?: number,
      pushExerciseType?: "pushup" | "dip",
      exercise?: Exercise,
      selectedDifficulty?: string,
    ) => {
      const time = timers[exerciseId] || 0;

      // Usar o exercício passado diretamente se disponível (novo sistema)
      const exerciseName = exercise?.name || `${exerciseId} - Exercício`;
      // Mapear dificuldade para nível numérico
      const level =
        selectedDifficulty === "beginner"
          ? 1
          : selectedDifficulty === "intermediate"
            ? 2
            : selectedDifficulty === "advanced"
              ? 3
              : selectedDifficulty === "extreme"
                ? 4
                : 1;
      const targetReps = exercise ? getMinReps(exercise.reps) : 10;

      // Sempre iniciar exercício automaticamente com dados corretos
      const muscleGroup: "pushup" | "pullup" | "squat" | "dip" =
        activeTab === "empurrar"
          ? pushExerciseType === "dip"
            ? "dip"
            : "pushup"
          : activeTab === "puxar"
            ? "pullup"
            : "squat";

      try {
        // Tentar iniciar exercício (vai falhar silenciosamente se já estiver ativo)
        workoutSaver.startExercise(
          exerciseId,
          exerciseName,
          muscleGroup,
          level,
        );
      } catch {
        // Exercício já ativo, continuar normalmente
        console.debug("Exercício já ativo:", exerciseId);
      }

      // Salvar o set
      workoutSaver.saveDetailedSet(
        reps,
        targetReps,
        time,
        undefined, // restTime será definido no finishRest
        undefined, // perceivedDifficulty
        undefined, // notes
        weight, // peso opcional
      );

      // Atualizar estado local (compatibilidade)
      setCurrentSession((prev) => {
        const current = prev[exerciseId] || { sets: [], totalTime: 0 };
        const newSet = { reps, time, level, exerciseName, weight };
        return {
          ...prev,
          [exerciseId]: {
            sets: [...current.sets, newSet],
            totalTime: current.totalTime + time,
          },
        } as WorkoutSessionState;
      });
    },
    [],
  ); // Resetar sessão
  const resetSession = useCallback(() => {
    setCurrentSession({});
  }, []);

  return {
    currentSession,
    startSession,
    finishSession,
    saveProgress,
    resetSession,
  };
}
