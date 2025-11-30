import { useState, useEffect } from "react";
import { DetailedWorkoutSession } from "@/lib/workoutTypes";
// Gamification removed — there is no UserProgress type stored

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
  // userProgress removed — not using gamification state

  useEffect(() => {
    // Se já existem dados iniciais, não fazer nada adicional
    if (workoutSessions.length > 0) return;

    // UserProgress no longer stored; only workout sessions persisted
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want this to run on mount
  }, []);

  return {
    workoutSessions,
    setWorkoutSessions,
  };
}
