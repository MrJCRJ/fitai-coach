import { DetailedWorkoutSession } from "@/lib/workoutTypes";
import { DashboardStats } from "@/lib/dashboardTypes";
import { UserProgress } from "@/lib/exercises/types";
import { gamificationSystem } from "@/lib/gamification";

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function calculateDashboardStats(
  workoutSessions: DetailedWorkoutSession[],
  userProgress?: UserProgress | null,
): DashboardStats {
  const totalSessions = workoutSessions.length;
  const totalTime = workoutSessions.reduce(
    (sum, session) => sum + session.duration,
    0,
  );
  const totalReps = workoutSessions.reduce(
    (sum, session) => sum + session.totalReps,
    0,
  );
  const totalRestTime = workoutSessions.reduce(
    (sum, session) => sum + session.restTimeTotal,
    0,
  );
  const totalSets = workoutSessions.reduce(
    (sum, session) => sum + session.totalSets,
    0,
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
          acc[group] = {
            sessions: 0,
            totalReps: 0,
            totalSets: 0,
            totalWeight: 0,
            avgWeightPerSet: 0,
          };
        }
        acc[group].sessions += 1;
        acc[group].totalReps += exercise.totalReps;
        acc[group].totalSets += exercise.sets.length;

        // Calcular peso total para o grupo muscular
        const exerciseWeight = exercise.sets.reduce(
          (sum, set) => sum + (set.weight || 0),
          0,
        );
        acc[group].totalWeight! += exerciseWeight;
      });
      return acc;
    },
    {} as Record<
      string,
      {
        sessions: number;
        totalReps: number;
        totalSets: number;
        totalWeight: number;
        avgWeightPerSet: number;
      }
    >,
  );

  // Calcular estatísticas de peso
  const weightStats = workoutSessions.reduce(
    (acc, session) => {
      const sessionWeight = session.exercises.reduce((sessionSum, exercise) => {
        return (
          sessionSum +
          exercise.sets.reduce(
            (exerciseSum, set) => exerciseSum + (set.weight || 0),
            0,
          )
        );
      }, 0);

      if (sessionWeight > 0) {
        acc.totalWeightUsed += sessionWeight;
        acc.sessionsWithWeight += 1;
      }

      return acc;
    },
    { totalWeightUsed: 0, sessionsWithWeight: 0 },
  );

  // Calcular peso médio por set para cada grupo muscular
  Object.keys(muscleGroupStats).forEach((group) => {
    const stats = muscleGroupStats[group];
    if (stats) {
      stats.avgWeightPerSet =
        stats.totalSets > 0 ? stats.totalWeight / stats.totalSets : 0;
    }
  });

  // Estatísticas de gamificação
  let gamificationStats = {};
  if (userProgress) {
    gamificationStats = {
      userLevel: userProgress.level,
      totalXp: userProgress.totalXp,
      xpToNextLevel: gamificationSystem.getXpToNextLevel(userProgress.totalXp),
      unlockedAchievements:
        gamificationSystem.getUnlockedAchievements(userProgress),
      lockedAchievements:
        gamificationSystem.getLockedAchievements(userProgress),
      currentStreak: userProgress.streaks.current,
      longestStreak: userProgress.streaks.longest,
    };
  }

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
    totalWeightUsed: weightStats.totalWeightUsed,
    avgWeightPerSession:
      weightStats.sessionsWithWeight > 0
        ? weightStats.totalWeightUsed / weightStats.sessionsWithWeight
        : 0,
    sessionsWithWeight: weightStats.sessionsWithWeight,
    ...gamificationStats,
  };
}
