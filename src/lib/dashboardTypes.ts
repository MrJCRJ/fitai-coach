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
  // Estatísticas de gamificação
  userLevel?: number;
  totalXp?: number;
  xpToNextLevel?: number;
  unlockedAchievements?: Achievement[];
  lockedAchievements?: Achievement[];
  currentStreak?: number;
  longestStreak?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  condition: AchievementCondition;
}

export interface AchievementCondition {
  type:
    | "sets_completed"
    | "level_reached"
    | "streak_days"
    | "time_record"
    | "perfect_form"
    | "weight_used"
    | "weight_sets"
    | "max_weight";
  exerciseType?: "pushup" | "pullup" | "squat";
  value: number;
  timeframe?: "daily" | "weekly" | "monthly" | "all_time";
}
