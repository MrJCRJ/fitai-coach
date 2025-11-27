import { DetailedWorkoutSession } from "@/lib/workoutTypes";
import { DashboardStats } from "@/lib/dashboardTypes";

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function calculateDashboardStats(
  workoutSessions: DetailedWorkoutSession[]
): DashboardStats {
  const totalSessions = workoutSessions.length;
  const totalTime = workoutSessions.reduce(
    (sum, session) => sum + session.duration,
    0
  );
  const totalReps = workoutSessions.reduce(
    (sum, session) => sum + session.totalReps,
    0
  );
  const totalRestTime = workoutSessions.reduce(
    (sum, session) => sum + session.restTimeTotal,
    0
  );
  const totalSets = workoutSessions.reduce(
    (sum, session) => sum + session.totalSets,
    0
  );

  // Estatísticas calculadas
  const avgSessionDuration = totalSessions > 0 ? totalTime / totalSessions : 0;
  const avgSetsPerSession = totalSessions > 0 ? totalSets / totalSessions : 0;
  const avgRepsPerSet = totalSets > 0 ? totalReps / totalSets : 0;
  const avgRestTimePerSession =
    totalSessions > 0 ? totalRestTime / totalSessions : 0;

  // Estatísticas por grupo muscular
  const muscleGroupStats = workoutSessions.reduce(
    (acc, session) => {
      session.exercises.forEach((exercise) => {
        const group = exercise.muscleGroup;
        if (!acc[group]) {
          acc[group] = { sessions: 0, totalReps: 0, totalSets: 0 };
        }
        acc[group].sessions += 1;
        acc[group].totalReps += exercise.totalReps;
        acc[group].totalSets += exercise.sets.length;
      });
      return acc;
    },
    {} as Record<
      string,
      { sessions: number; totalReps: number; totalSets: number }
    >
  );

  return {
    totalSessions,
    totalTime,
    totalReps,
    totalRestTime,
    totalSets,
    avgSessionDuration,
    avgSetsPerSession,
    avgRepsPerSet,
    avgRestTimePerSession,
    muscleGroupStats,
  };
}
