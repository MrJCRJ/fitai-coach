import { useState, useEffect } from "react";
import { DetailedWorkoutSession } from "@/lib/workoutTypes";
import { UserProgress } from "@/lib/exercises/types";

export function useDashboardData() {
  const [workoutSessions, setWorkoutSessions] = useState<
    DetailedWorkoutSession[]
  >([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("detailedWorkoutSessions");
    if (saved) {
      setWorkoutSessions(JSON.parse(saved));
    }

    // Carregar progresso do usuário
    const savedProgress = localStorage.getItem("userProgress");
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    } else {
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
  }, []);

  return {
    workoutSessions,
    setWorkoutSessions,
    userProgress,
    setUserProgress,
  };
}
