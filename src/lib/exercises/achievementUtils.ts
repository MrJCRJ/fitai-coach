import { Achievement, UserProgress, ExerciseStats } from "./types";

/**
 * Utilitários para verificação e gerenciamento de conquistas
 */

/**
 * Verifica se uma conquista foi desbloqueada baseado no progresso do usuário
 */
export function checkAchievementUnlock(
  achievement: Achievement,
  userProgress: UserProgress,
  exerciseStats?: ExerciseStats,
): boolean {
  if (userProgress.achievements.includes(achievement.id)) {
    return false; // Já desbloqueada
  }

  const condition = achievement.condition;

  switch (condition.type) {
    case "sets_completed":
      if (condition.exerciseType && exerciseStats) {
        return exerciseStats.totalSets >= condition.value;
      }
      // Conquista geral (qualquer exercício)
      return Object.values(userProgress.exerciseStats).some(
        (stats: ExerciseStats) => stats.totalSets >= condition.value,
      );

    case "level_reached":
      if (condition.exerciseType && exerciseStats) {
        return exerciseStats.currentLevel >= condition.value;
      }
      return false;

    case "streak_days":
      return userProgress.streaks.current >= condition.value;

    case "perfect_form":
      // TODO: Implementar lógica para verificar séries com forma perfeita
      return false;

    case "weight_used":
      // Verificar se o usuário já usou peso em alguma série
      return Object.values(userProgress.exerciseStats).some(
        (stats: ExerciseStats) =>
          (stats.weightStats?.totalWeightedSets || 0) > 0,
      );

    case "weight_sets":
      // Verificar total de séries com peso
      const totalWeightedSets = Object.values(
        userProgress.exerciseStats,
      ).reduce(
        (total: number, stats: ExerciseStats) =>
          total + (stats.weightStats?.totalWeightedSets || 0),
        0,
      );
      return totalWeightedSets >= condition.value;

    case "max_weight":
      // Verificar se o usuário já usou peso acima do limite
      return Object.values(userProgress.exerciseStats).some(
        (stats: ExerciseStats) =>
          (stats.weightStats?.maxWeight || 0) >= condition.value,
      );

    default:
      return false;
  }
}

/**
 * Verifica todas as conquistas disponíveis para desbloquear
 */
export function checkAllAchievements(
  achievements: Achievement[],
  userProgress: UserProgress,
): Achievement[] {
  const newAchievements: Achievement[] = [];

  for (const achievement of achievements) {
    if (!userProgress.achievements.includes(achievement.id)) {
      let exerciseStats: ExerciseStats | undefined;

      if (achievement.condition.exerciseType) {
        exerciseStats =
          userProgress.exerciseStats[achievement.condition.exerciseType];
      }

      if (checkAchievementUnlock(achievement, userProgress, exerciseStats)) {
        newAchievements.push(achievement);
      }
    }
  }

  return newAchievements;
}

/**
 * Filtra conquistas por tipo de exercício
 */
export function getAchievementsByExerciseType(
  achievements: Achievement[],
  exerciseType: "pushup" | "pullup" | "squat",
): Achievement[] {
  return achievements.filter(
    (achievement) => achievement.condition.exerciseType === exerciseType,
  );
}

/**
 * Obtém conquistas desbloqueadas
 */
export function getUnlockedAchievements(
  achievements: Achievement[],
  userProgress: UserProgress,
): Achievement[] {
  return userProgress.achievements
    .map((id: string) => achievements.find((a) => a.id === id))
    .filter(
      (achievement): achievement is Achievement => achievement !== undefined,
    );
}

/**
 * Obtém conquistas ainda não desbloqueadas
 */
export function getLockedAchievements(
  achievements: Achievement[],
  userProgress: UserProgress,
): Achievement[] {
  return achievements.filter(
    (achievement) => !userProgress.achievements.includes(achievement.id),
  );
}

/**
 * Calcula progresso para uma conquista específica
 */
export function getAchievementProgress(
  achievement: Achievement,
  userProgress: UserProgress,
): { current: number; target: number; percentage: number } {
  const condition = achievement.condition;

  let current = 0;

  switch (condition.type) {
    case "sets_completed":
      if (condition.exerciseType) {
        current =
          userProgress.exerciseStats[condition.exerciseType]?.totalSets || 0;
      } else {
        current = Object.values(userProgress.exerciseStats).reduce(
          (total, stats) => total + stats.totalSets,
          0,
        );
      }
      break;

    case "level_reached":
      if (condition.exerciseType) {
        current =
          userProgress.exerciseStats[condition.exerciseType]?.currentLevel || 0;
      }
      break;

    case "streak_days":
      current = userProgress.streaks.current;
      break;

    case "weight_sets":
      current = Object.values(userProgress.exerciseStats).reduce(
        (total, stats) => total + (stats.weightStats?.totalWeightedSets || 0),
        0,
      );
      break;

    case "max_weight":
      current = Math.max(
        ...Object.values(userProgress.exerciseStats).map(
          (stats) => stats.weightStats?.maxWeight || 0,
        ),
      );
      break;
  }

  const target = condition.value;
  const percentage = Math.min(100, Math.round((current / target) * 100));

  return { current, target, percentage };
}
