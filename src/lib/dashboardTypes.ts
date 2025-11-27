export interface MuscleGroupStats {
  sessions: number;
  totalReps: number;
  totalSets: number;
}

export interface DashboardStats {
  totalSessions: number;
  totalTime: number;
  totalReps: number;
  totalRestTime: number;
  totalSets: number;
  avgSessionDuration: number;
  avgSetsPerSession: number;
  avgRepsPerSet: number;
  avgRestTimePerSession: number;
  muscleGroupStats: Record<string, MuscleGroupStats>;
}
