import { useState, useCallback } from "react";
import { workoutSaver } from "@/lib/workoutSaver";
import { Exercise } from "@/lib/exercises";
import { gamificationSystem } from "@/lib/gamification";
import { UserProgress } from "@/lib/exercises/types";

interface WorkoutSessionState {
  [key: string]: {
    sets: {
      reps: number;
      time: number;
      level: number;
      exerciseName: string;
      restTime?: number;
      weight?: number;
    }[];
    totalTime: number;
  };
}

// Função utilitária para extrair o valor mínimo de reps
function getMinReps(
  reps: string | { min: number; max: number; unit?: string } | undefined
): number {
  if (!reps) return 10;
  if (typeof reps === "string") {
    const parts = reps.split("-");
    const firstPart = parts[0];
    return firstPart ? parseInt(firstPart) || 10 : 10;
  }
  return reps.min;
}

export function useWorkoutSession() {
  const [currentSession, setCurrentSession] = useState<WorkoutSessionState>({});

  // Função para atualizar progresso do usuário
  const updateUserProgress = useCallback((session: any) => {
    try {
      // Carregar progresso atual
      const currentProgress: UserProgress = JSON.parse(
        localStorage.getItem("userProgress") ||
          JSON.stringify({
            totalXp: 0,
            level: 1,
            achievements: [],
            streaks: { current: 0, longest: 0, lastWorkoutDate: "" },
            exerciseStats: {
              pushup: {
                totalSets: 0,
                currentLevel: 1,
                bestStreak: 0,
                personalRecords: { maxReps: 0, fastestTime: 0, mostSets: 0 },
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
                personalRecords: { maxReps: 0, fastestTime: 0, mostSets: 0 },
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
                personalRecords: { maxReps: 0, fastestTime: 0, mostSets: 0 },
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
                personalRecords: { maxReps: 0, fastestTime: 0, mostSets: 0 },
                unlockedVariations: [],
                weightStats: {
                  totalWeightedSets: 0,
                  maxWeight: 0,
                  averageWeight: 0,
                  totalWeightLifted: 0,
                },
              },
            },
          })
      );

      // Calcular XP ganho na sessão
      let sessionXp = 0;
      session.exercises.forEach((exercise: any) => {
        // XP baseado em reps e dificuldade
        const baseXp = exercise.totalReps * 10;
        const difficultyMultiplier = exercise.level || 1;
        sessionXp += baseXp * difficultyMultiplier;

        // Atualizar estatísticas do exercício
        const muscleGroup =
          exercise.muscleGroup as keyof UserProgress["exerciseStats"];
        if (currentProgress.exerciseStats[muscleGroup]) {
          currentProgress.exerciseStats[muscleGroup].totalSets +=
            exercise.sets.length;
          currentProgress.exerciseStats[muscleGroup].currentLevel = Math.max(
            currentProgress.exerciseStats[muscleGroup].currentLevel,
            exercise.level || 1
          );

          // Atualizar recordes pessoais
          exercise.sets.forEach((set: any) => {
            currentProgress.exerciseStats[muscleGroup].personalRecords.maxReps =
              Math.max(
                currentProgress.exerciseStats[muscleGroup].personalRecords
                  .maxReps,
                set.reps
              );

            if (set.duration) {
              currentProgress.exerciseStats[
                muscleGroup
              ].personalRecords.fastestTime =
                currentProgress.exerciseStats[muscleGroup].personalRecords
                  .fastestTime === 0
                  ? set.duration
                  : Math.min(
                      currentProgress.exerciseStats[muscleGroup].personalRecords
                        .fastestTime,
                      set.duration
                    );
            }
          });

          currentProgress.exerciseStats[muscleGroup].personalRecords.mostSets =
            Math.max(
              currentProgress.exerciseStats[muscleGroup].personalRecords
                .mostSets,
              exercise.sets.length
            );
        }
      });

      // Bônus por completar treino
      sessionXp += Math.floor(sessionXp * 0.1);

      // Atualizar XP total e nível
      currentProgress.totalXp += sessionXp;
      currentProgress.level = gamificationSystem.calculateUserLevel(
        currentProgress.totalXp
      );

      // Atualizar streaks
      gamificationSystem.updateStreaks(currentProgress, session.date);

      // Verificar conquistas desbloqueadas
      const newAchievements =
        gamificationSystem.checkAllAchievements(currentProgress);
      newAchievements.forEach((achievement) => {
        if (!currentProgress.achievements.includes(achievement.id)) {
          currentProgress.achievements.push(achievement.id);
        }
      });

      // Salvar progresso atualizado
      localStorage.setItem("userProgress", JSON.stringify(currentProgress));

      console.log("Progresso atualizado:", {
        sessionXp,
        newLevel: currentProgress.level,
        newAchievements: newAchievements.length,
      });
    } catch (error) {
      console.error("Erro ao atualizar progresso:", error);
    }
  }, []);

  // Iniciar sessão de treino
  const startSession = useCallback(() => {
    workoutSaver.startSession();
  }, []);

  // Finalizar sessão de treino
  const finishSession = useCallback(() => {
    const detailedSession = workoutSaver.finishSession();
    if (detailedSession) {
      workoutSaver.saveToStorage(detailedSession);

      // Atualizar progresso do usuário
      updateUserProgress(detailedSession);
    }
    return detailedSession;
  }, []);

  // Salvar progresso de um exercício
  const saveProgress = useCallback(
    (
      exerciseId: string,
      reps: number,
      activeTab: string,
      selectedPushUpLevel: number,
      selectedPullUpLevel: number,
      selectedSquatLevel: number,
      timers: { [key: string]: number },
      weight?: number,
      pushExerciseType?: "pushup" | "dip",
      exercise?: Exercise,
      selectedDifficulty?: string
    ) => {
      const time = timers[exerciseId] || 0;

      // Usar o exercício passado diretamente se disponível (novo sistema)
      const exerciseName = exercise?.name || `${exerciseId} - Exercício`;
      // Mapear dificuldade para nível numérico
      const level =
        selectedDifficulty === "beginner"
          ? 1
          : selectedDifficulty === "intermediate"
            ? 2
            : selectedDifficulty === "advanced"
              ? 3
              : selectedDifficulty === "extreme"
                ? 4
                : 1;
      const targetReps = exercise ? getMinReps(exercise.reps) : 10;

      // Sempre iniciar exercício automaticamente com dados corretos
      const muscleGroup: "pushup" | "pullup" | "squat" | "dip" =
        activeTab === "empurrar"
          ? pushExerciseType === "dip"
            ? "dip"
            : "pushup"
          : activeTab === "puxar"
            ? "pullup"
            : "squat";

      try {
        // Tentar iniciar exercício (vai falhar silenciosamente se já estiver ativo)
        workoutSaver.startExercise(
          exerciseId,
          exerciseName,
          muscleGroup,
          level
        );
      } catch (error) {
        // Exercício já ativo, continuar normalmente
        console.debug("Exercício já ativo:", exerciseId);
      }

      // Salvar o set
      workoutSaver.saveDetailedSet(
        reps,
        targetReps,
        time,
        undefined, // restTime será definido no finishRest
        undefined, // perceivedDifficulty
        undefined, // notes
        weight // peso opcional
      );

      // Atualizar estado local (compatibilidade)
      setCurrentSession((prev) => {
        const current = prev[exerciseId] || { sets: [], totalTime: 0 };
        const newSet = { reps, time, level, exerciseName, weight };
        return {
          ...prev,
          [exerciseId]: {
            sets: [...current.sets, newSet],
            totalTime: current.totalTime + time,
          },
        } as WorkoutSessionState;
      });
    },
    []
  ); // Resetar sessão
  const resetSession = useCallback(() => {
    setCurrentSession({});
  }, []);

  return {
    currentSession,
    startSession,
    finishSession,
    saveProgress,
    resetSession,
  };
}
