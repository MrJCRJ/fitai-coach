import { useState, useEffect } from "react";
import { DetailedWorkoutSession } from "@/lib/workoutTypes";
import { UserProgress } from "@/lib/exercises/types";

export function useDashboardData() {
  const [workoutSessions, setWorkoutSessions] = useState<
    DetailedWorkoutSession[]
  >(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("detailedWorkoutSessions");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [userProgress, setUserProgress] = useState<UserProgress | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const savedProgress = localStorage.getItem("userProgress");
      return savedProgress ? JSON.parse(savedProgress) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Se já existem dados iniciais, não fazer nada adicional
    if (userProgress !== null && workoutSessions.length > 0) return;

    // Carregar progresso do usuário caso não tenha sido inicializado
    const savedProgress = localStorage.getItem("userProgress");
    if (savedProgress && userProgress === null) {
      setUserProgress(JSON.parse(savedProgress));
      return;
    }

    if (!savedProgress && userProgress === null) {
      // Inicializar progresso padrão se não existir
      const defaultProgress: UserProgress = {
        totalXp: 0,
        level: 1,
        achievements: [],
        streaks: {
          current: 0,
          longest: 0,
          lastWorkoutDate: "",
        },
        exerciseStats: {
          pushup: {
            totalSets: 0,
            currentLevel: 1,
            bestStreak: 0,
            personalRecords: {
              maxReps: 0,
              fastestTime: 0,
              mostSets: 0,
            },
            unlockedVariations: [],
            weightStats: {
              totalWeightedSets: 0,
              maxWeight: 0,
              averageWeight: 0,
              totalWeightLifted: 0,
            },
          },
          pullup: {
            totalSets: 0,
            currentLevel: 1,
            bestStreak: 0,
            personalRecords: {
              maxReps: 0,
              fastestTime: 0,
              mostSets: 0,
            },
            unlockedVariations: [],
            weightStats: {
              totalWeightedSets: 0,
              maxWeight: 0,
              averageWeight: 0,
              totalWeightLifted: 0,
            },
          },
          squat: {
            totalSets: 0,
            currentLevel: 1,
            bestStreak: 0,
            personalRecords: {
              maxReps: 0,
              fastestTime: 0,
              mostSets: 0,
            },
            unlockedVariations: [],
            weightStats: {
              totalWeightedSets: 0,
              maxWeight: 0,
              averageWeight: 0,
              totalWeightLifted: 0,
            },
          },
          dip: {
            totalSets: 0,
            currentLevel: 1,
            bestStreak: 0,
            personalRecords: {
              maxReps: 0,
              fastestTime: 0,
              mostSets: 0,
            },
            unlockedVariations: [],
            weightStats: {
              totalWeightedSets: 0,
              maxWeight: 0,
              averageWeight: 0,
              totalWeightLifted: 0,
            },
          },
        },
      };
      setUserProgress(defaultProgress);
      localStorage.setItem("userProgress", JSON.stringify(defaultProgress));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want this to run on mount
  }, []);

  return {
    workoutSessions,
    setWorkoutSessions,
    userProgress,
    setUserProgress,
  };
}
