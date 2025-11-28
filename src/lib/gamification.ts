import {
  Achievement,
  UserProgress,
  ExerciseStats,
  WorkoutSession,
} from "./exercises/types";
import { allAchievements } from "./exercises/achievements";
import { calculateUserLevel, getXpToNextLevel } from "./exercises/levelUtils";
import { updateStreaks } from "./exercises/streakUtils";
import {
  checkAllAchievements,
  getUnlockedAchievements,
  getLockedAchievements,
} from "./exercises/achievementUtils";

/**
 * Sistema de Gamificação - Conquistas e Recompensas
 * Arquitetura modular com responsabilidades separadas
 */
export class GamificationSystem {
  private static instance: GamificationSystem;
  private achievements: Map<string, Achievement> = new Map();

  private constructor() {
    this.initializeAchievements();
  }

  static getInstance(): GamificationSystem {
    if (!GamificationSystem.instance) {
      GamificationSystem.instance = new GamificationSystem();
    }
    return GamificationSystem.instance;
  }

  private initializeAchievements() {
    allAchievements.forEach((achievement) => {
      this.achievements.set(achievement.id, achievement);
    });
  }

  // ========== MÉTODOS DE NÍVEL E XP ==========

  /**
   * Calcula o nível do usuário baseado no XP total
   */
  calculateUserLevel(totalXp: number): number {
    return calculateUserLevel(totalXp);
  }

  /**
   * Calcula quanto XP falta para o próximo nível
   */
  getXpToNextLevel(totalXp: number): number {
    return getXpToNextLevel(totalXp);
  }

  // ========== MÉTODOS DE CONQUISTAS ==========

  /**
   * Verifica se uma conquista foi desbloqueada
   */
  checkAchievementUnlock(
    achievementId: string,
    userProgress: UserProgress,
    exerciseStats?: ExerciseStats,
  ): boolean {
    const achievement = this.achievements.get(achievementId);
    if (!achievement) return false;

    return checkAllAchievements([achievement], userProgress).length > 0;
  }

  /**
   * Verifica todas as conquistas disponíveis para desbloquear
   */
  checkAllAchievements(userProgress: UserProgress): Achievement[] {
    return checkAllAchievements(allAchievements, userProgress);
  }

  // ========== MÉTODOS DE XP DE SESSÃO ==========

  /**
   * Calcula XP ganho em uma sessão de treino
   */
  calculateSessionXp(session: WorkoutSession): number {
    let totalXp = 0;

    session.exercises.forEach((exercise: WorkoutSession["exercises"][0]) => {
      totalXp += exercise.xpEarned;
    });

    // Bônus por completar o treino
    totalXp += Math.floor(totalXp * 0.1); // 10% bônus

    // Bônus por streak
    if (
      session.achievements.some(
        (a: Achievement) => a.condition.type === "streak_days",
      )
    ) {
      totalXp += 50; // Bônus por manter streak
    }

    return totalXp;
  }

  // ========== MÉTODOS DE STREAK ==========

  /**
   * Atualiza streaks do usuário
   */
  updateStreaks(userProgress: UserProgress, workoutDate: string): void {
    updateStreaks(userProgress, workoutDate);
  }

  // ========== MÉTODOS DE CONSULTA ==========

  /**
   * Obtém todas as conquistas disponíveis
   */
  getAllAchievements(): Achievement[] {
    return Array.from(this.achievements.values());
  }

  /**
   * Obtém conquistas desbloqueadas
   */
  getUnlockedAchievements(userProgress: UserProgress): Achievement[] {
    return getUnlockedAchievements(allAchievements, userProgress);
  }

  /**
   * Obtém conquistas ainda não desbloqueadas
   */
  getLockedAchievements(userProgress: UserProgress): Achievement[] {
    return getLockedAchievements(allAchievements, userProgress);
  }
}

// Instância singleton do sistema de gamificação
export const gamificationSystem = GamificationSystem.getInstance();
