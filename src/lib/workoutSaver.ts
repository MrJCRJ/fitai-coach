import {
  DetailedSet,
  DetailedExercise,
  DetailedWorkoutSession,
} from "./workoutTypes";

// Utilitários para gerar IDs únicos
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Classe para gerenciar o salvamento detalhado de treinos
export class WorkoutSaver {
  private currentSession: DetailedWorkoutSession | null = null;
  private currentExercise: DetailedExercise | null = null;
  private setCounter: number = 0;

  // Iniciar uma nova sessão de treino
  startSession(): DetailedWorkoutSession {
    const session: DetailedWorkoutSession = {
      id: generateId(),
      date: new Date().toISOString().split("T")[0] || new Date().toISOString(),
      startTime: new Date().toISOString(),
      duration: 0,
      exercises: [],
      totalSets: 0,
      totalReps: 0,
      averageSetDuration: 0,
      restTimeTotal: 0,
      completed: false,
      version: "2.0.0", // Versão do sistema de salvamento
    };

    this.currentSession = session;
    return session;
  }

  // Finalizar a sessão atual
  finishSession(): DetailedWorkoutSession | null {
    if (!this.currentSession) return null;

    const now = new Date().toISOString();
    this.currentSession.endTime = now;
    this.currentSession.duration = Math.floor(
      (new Date(now).getTime() -
        new Date(this.currentSession.startTime).getTime()) /
        1000,
    );
    this.currentSession.completed = true;

    // Calcular estatísticas finais
    this.calculateSessionStats();

    const session = this.currentSession;
    this.currentSession = null;
    this.currentExercise = null;
    this.setCounter = 0;

    return session;
  }

  // Iniciar um novo exercício na sessão
  startExercise(
    exerciseId: string,
    exerciseName: string,
    muscleGroup: "pushup" | "pullup" | "squat" | "dip",
    difficulty?: "beginner" | "intermediate" | "advanced" | "extreme",
  ): DetailedExercise {
    if (!this.currentSession) {
      throw new Error("Nenhuma sessão ativa. Chame startSession() primeiro.");
    }

    const exercise: DetailedExercise = {
      id: generateId(),
      exerciseId,
      name: exerciseName,
      muscleGroup,
      difficulty,
      sets: [],
      totalDuration: 0,
      startTime: new Date().toISOString(),
      totalReps: 0,
      completedSets: 0,
      skippedSets: 0,
    };

    this.currentExercise = exercise;
    this.currentSession.exercises.push(exercise);

    return exercise;
  }

  // Salvar um set detalhado
  saveDetailedSet(
    reps: number,
    targetReps: number,
    duration: number,
    restTime?: number,
    perceivedDifficulty?: 1 | 2 | 3 | 4 | 5,
    notes?: string,
    weight?: number,
  ): DetailedSet | null {
    if (!this.currentExercise || !this.currentSession) {
      throw new Error(
        "Nenhum exercício ativo. Chame startExercise() primeiro.",
      );
    }

    this.setCounter++;
    const now = new Date().toISOString();

    const set: DetailedSet = {
      id: generateId(),
      order: this.setCounter,
      reps,
      targetReps,
      duration,
      ...(weight !== undefined && { weight }),
      restTime: restTime || undefined,
      startTime: new Date(Date.now() - duration * 1000).toISOString(), // Estimativa
      endTime: now,
      perceivedDifficulty: perceivedDifficulty || undefined,
      notes: notes || undefined,
      completed: reps >= targetReps * 0.8, // Considera completo se fez 80% do alvo
    };

    // Adicionar à sessão atual
    this.currentExercise.sets.push(set);
    this.currentExercise.totalDuration += duration;
    this.currentExercise.totalReps += reps;

    if (set.completed) {
      this.currentExercise.completedSets++;
    } else {
      this.currentExercise.skippedSets++;
    }

    // Atualizar estatísticas da sessão
    this.currentSession.totalSets++;
    this.currentSession.totalReps += reps;

    return set;
  }

  // Finalizar o exercício atual
  finishExercise(): DetailedExercise | null {
    if (!this.currentExercise) return null;

    this.currentExercise.endTime = new Date().toISOString();

    const exercise = this.currentExercise;
    this.currentExercise = null;

    return exercise;
  }

  // Obter estatísticas da sessão atual
  getSessionStats() {
    if (!this.currentSession) return null;

    return {
      duration: this.currentSession.duration,
      totalSets: this.currentSession.totalSets,
      totalReps: this.currentSession.totalReps,
      exercisesCount: this.currentSession.exercises.length,
      averageSetDuration:
        this.currentSession.totalSets > 0
          ? this.currentSession.exercises.reduce(
              (sum, ex) => sum + ex.totalDuration,
              0,
            ) / this.currentSession.totalSets
          : 0,
    };
  }

  // Calcular estatísticas finais da sessão
  private calculateSessionStats() {
    if (!this.currentSession) return;

    const totalDuration = this.currentSession.exercises.reduce(
      (sum, ex) => sum + ex.totalDuration,
      0,
    );

    this.currentSession.averageSetDuration =
      this.currentSession.totalSets > 0
        ? totalDuration / this.currentSession.totalSets
        : 0;

    // Calcular restTimeTotal somando todos os restTimes dos sets
    this.currentSession.restTimeTotal = this.currentSession.exercises.reduce(
      (total, exercise) => {
        return (
          total +
          exercise.sets.reduce((exerciseTotal, set) => {
            return exerciseTotal + (set.restTime || 0);
          }, 0)
        );
      },
      0,
    );
  }

  // Salvar sessão no localStorage
  saveToStorage(session: DetailedWorkoutSession) {
    const existing = JSON.parse(
      localStorage.getItem("detailedWorkoutSessions") || "[]",
    );
    existing.unshift(session); // Adicionar no início

    // Manter apenas as últimas 50 sessões
    if (existing.length > 50) {
      existing.splice(50);
    }

    localStorage.setItem("detailedWorkoutSessions", JSON.stringify(existing));
  }

  // Carregar sessões do localStorage
  loadFromStorage(): DetailedWorkoutSession[] {
    const raw = JSON.parse(
      localStorage.getItem("detailedWorkoutSessions") || "[]",
    ) as Array<Record<string, unknown>>;

    // Migração compatível: converter `level` numérico para `difficulty` caso exista
    const mapLevelToDifficulty = (level?: number) => {
      if (level === undefined || level === null) return undefined;
      if (level <= 10) return "beginner";
      if (level <= 20) return "intermediate";
      if (level <= 30) return "advanced";
      return "extreme";
    };

    return raw.map((session) => {
      if (!session.exercises)
        return session as unknown as DetailedWorkoutSession;
      session.exercises = (
        session.exercises as Array<Record<string, unknown>>
      ).map((ex) => {
        const levelVal = ex["level"] as number | undefined;
        const difficultyVal = ex["difficulty"] as string | undefined;
        if (levelVal !== undefined && difficultyVal === undefined) {
          ex["difficulty"] = mapLevelToDifficulty(Number(levelVal));
          delete ex["level"];
        }
        return ex;
      });
      return session as unknown as DetailedWorkoutSession;
    });
  }

  // Atualizar o último set com tempo de descanso
  updateLastSetRestTime(restTime: number) {
    if (!this.currentExercise || this.currentExercise.sets.length === 0) {
      return;
    }

    const lastSetIndex = this.currentExercise.sets.length - 1;
    const lastSet = this.currentExercise.sets[lastSetIndex];
    if (lastSet) {
      lastSet.restTime = restTime;
    }
  }

  // Obter sets do exercício atual
  getCurrentExerciseSets(): DetailedSet[] {
    return this.currentExercise?.sets || [];
  }
}

// Instância singleton do WorkoutSaver
export const workoutSaver = new WorkoutSaver();
