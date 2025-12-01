export interface MuscleGroupStats {
  sessions: number;
  totalReps: number;
  totalSets: number;
  totalWeight?: number; // Peso total utilizado
  avgWeightPerSet?: number; // Peso médio por set
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
  // Estatísticas de peso
  totalWeightUsed?: number; // Peso total utilizado em todas as sessões
  avgWeightPerSession?: number; // Peso médio por sessão
  sessionsWithWeight?: number; // Número de sessões que usaram peso
  // Gamification removed — these stats no longer tracked
}
// AchievementCondition removed - gamification no longer used for dashboard stats
