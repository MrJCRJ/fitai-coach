import { useState, useEffect } from "react";
import { DetailedWorkoutSession } from "@/lib/workoutTypes";

export function useDashboardData() {
  const [workoutSessions, setWorkoutSessions] = useState<
    DetailedWorkoutSession[]
  >([]);

  useEffect(() => {
    const saved = localStorage.getItem("detailedWorkoutSessions");
    if (saved) {
      setWorkoutSessions(JSON.parse(saved));
    }
  }, []);

  return {
    workoutSessions,
    setWorkoutSessions,
  };
}
