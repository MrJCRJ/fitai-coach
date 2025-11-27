"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import {
  WorkoutTimers,
  WorkoutNavbar,
  ExerciseCarousel,
  RestTimer,
} from "@/components/workout";
import {
  pushUpVariations,
  pullUpVariations,
  squatVariations,
} from "@/lib/exercisesDatabase";
import { workoutSaver } from "@/lib/workoutSaver";
import { DetailedWorkoutSession } from "@/lib/workoutTypes";

// Desabilitar prerendering para esta página
export const dynamic = "force-dynamic";

interface WindowWithTimers {
  timerIntervals?: Record<string, NodeJS.Timeout>;
}

export default function WorkoutPage() {
  const router = useRouter();
  const [currentSession, setCurrentSession] = useState<{
    [key: string]: {
      sets: {
        reps: number;
        time: number;
        level: number;
        exerciseName: string;
        restTime?: number;
      }[];
      totalTime: number;
    };
  }>({});
  const [timers, setTimers] = useState<{ [key: string]: number }>({});
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("peito");

  // Estados para os níveis calculados
  const [currentPushUpLevel, setCurrentPushUpLevel] = useState<number>(1);
  const [currentPullUpLevel, setCurrentPullUpLevel] = useState<number>(1);
  const [currentSquatLevel, setCurrentSquatLevel] = useState<number>(1);

  // Estados para os níveis selecionados em cada carrossel
  const [selectedPushUpLevel, setSelectedPushUpLevel] = useState<number>(1);
  const [selectedPullUpLevel, setSelectedPullUpLevel] = useState<number>(1);
  const [selectedSquatLevel, setSelectedSquatLevel] = useState<number>(1);

  useEffect(() => {
    // Verificar se estamos no cliente
    if (typeof window === "undefined") return;

    // Iniciar treino automaticamente
    setWorkoutStartTime(new Date());
    setTotalWorkoutTime(0);

    // Iniciar sessão detalhada
    workoutSaver.startSession();

    // Calcular níveis baseados no progresso usando detailedWorkoutSessions
    const calculateLevel = (exerciseKey: string) => {
      const savedDetailed = localStorage.getItem("detailedWorkoutSessions");
      if (!savedDetailed) return 1;

      const sessions: DetailedWorkoutSession[] = JSON.parse(savedDetailed);
      let totalSets = 0;

      sessions.forEach((session) => {
        const exercise = session.exercises.find(
          (ex) => ex.exerciseId === exerciseKey
        );
        if (exercise) {
          totalSets += exercise.sets.length;
        }
      });

      if (totalSets < 10) return 1;
      if (totalSets < 25) return 2;
      if (totalSets < 50) return 3;
      if (totalSets < 100) return 4;
      if (totalSets < 200) return 5;
      if (totalSets < 400) return 6;
      if (totalSets < 800) return 7;
      return 8;
    };

    const pushUpLevel = calculateLevel("flexao");
    const pullUpLevel = calculateLevel("barra");
    const squatLevel = calculateLevel("agachamento");

    setSelectedPushUpLevel(pushUpLevel);
    setSelectedPullUpLevel(pullUpLevel);
    setSelectedSquatLevel(squatLevel);

    // Definir níveis calculados
    setCurrentPushUpLevel(pushUpLevel);
    setCurrentPullUpLevel(pullUpLevel);
    setCurrentSquatLevel(squatLevel);
  }, []);

  // Timer para o tempo total do treino
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (workoutStartTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor(
          (Date.now() - workoutStartTime.getTime()) / 1000
        );
        setTotalWorkoutTime(elapsed);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [workoutStartTime]);

  // Timer para descanso
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isResting) {
      interval = setInterval(() => {
        setRestTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isResting]);

  // Funções auxiliares para o sistema detalhado
  const getExerciseName = (exerciseId: string, activeTab: string): string => {
    const variations =
      activeTab === "peito"
        ? pushUpVariations
        : activeTab === "costas"
          ? pullUpVariations
          : squatVariations;

    const level =
      activeTab === "peito"
        ? selectedPushUpLevel
        : activeTab === "costas"
          ? selectedPullUpLevel
          : selectedSquatLevel;

    return variations[level]?.name || `${exerciseId} - Nível ${level}`;
  };

  const getCurrentLevel = (activeTab: string): number => {
    return activeTab === "peito"
      ? selectedPushUpLevel
      : activeTab === "costas"
        ? selectedPullUpLevel
        : selectedSquatLevel;
  };

  const getMuscleGroup = (activeTab: string): "pushup" | "pullup" | "squat" => {
    return activeTab === "peito"
      ? "pushup"
      : activeTab === "costas"
        ? "pullup"
        : "squat";
  };

  const startTimer = (exerciseId: string) => {
    if (activeTimer) return; // Só um timer por vez

    setActiveTimer(exerciseId);
    setTimers((prev) => ({ ...prev, [exerciseId]: 0 }));

    // Parar descanso quando iniciar exercício
    setIsResting(false);
    setRestTime(0);

    // Iniciar exercício no sistema detalhado
    const exerciseName = getExerciseName(exerciseId, activeTab);
    const level = getCurrentLevel(activeTab);
    workoutSaver.startExercise(
      exerciseId,
      exerciseName,
      getMuscleGroup(activeTab),
      level
    );

    const interval = setInterval(() => {
      setTimers((prev) => {
        const newTime = (prev[exerciseId] || 0) + 1;
        return { ...prev, [exerciseId]: newTime };
      });
    }, 1000);

    // Salvar interval para limpar depois
    const windowWithTimers = window as WindowWithTimers;
    const timerIntervals = windowWithTimers.timerIntervals || {};
    timerIntervals[exerciseId] = interval;
    windowWithTimers.timerIntervals = timerIntervals;
  };

  const stopTimer = (exerciseId: string) => {
    const windowWithTimers = window as WindowWithTimers;
    const timerIntervals = windowWithTimers.timerIntervals || {};
    if (timerIntervals[exerciseId]) {
      clearInterval(timerIntervals[exerciseId]);
      delete timerIntervals[exerciseId];
      windowWithTimers.timerIntervals = timerIntervals;
    }
    setActiveTimer(null);
  };

  const saveProgress = (exerciseId: string, reps: number) => {
    const time = timers[exerciseId] || 0;

    // Salvar no sistema detalhado
    const variations =
      activeTab === "peito"
        ? pushUpVariations
        : activeTab === "costas"
          ? pullUpVariations
          : squatVariations;
    const level = getCurrentLevel(activeTab);
    const targetReps = variations[level]?.reps?.split("-")[0] || "10";

    workoutSaver.saveDetailedSet(
      reps,
      parseInt(targetReps),
      time,
      undefined, // restTime será definido no finishRest
      undefined, // perceivedDifficulty
      undefined // notes
    );

    // Manter compatibilidade com o sistema antigo
    setCurrentSession((prev) => {
      const current = prev[exerciseId] || { sets: [], totalTime: 0 };
      const exerciseName = getExerciseName(exerciseId, activeTab);
      const newSet = { reps, time, level, exerciseName };
      return {
        ...prev,
        [exerciseId]: {
          sets: [...current.sets, newSet],
          totalTime: current.totalTime + time,
        },
      };
    });

    stopTimer(exerciseId);

    // Iniciar descanso
    setRestTime(0);
    setIsResting(true);
  };

  const finishRest = () => {
    // Atualizar último set com tempo de descanso no sistema detalhado
    workoutSaver.updateLastSetRestTime(restTime);

    workoutSaver.finishExercise();

    // Manter compatibilidade com sistema antigo
    setCurrentSession((prev) => {
      const lastExerciseId = Object.keys(prev).pop();
      if (lastExerciseId) {
        const current = prev[lastExerciseId];
        if (current && current.sets.length > 0) {
          const lastSetIndex = current.sets.length - 1;
          const lastSet = current.sets[lastSetIndex];
          if (lastSet) {
            // Atualizar o último set com o tempo de descanso
            const updatedSets = [...current.sets];
            updatedSets[lastSetIndex] = {
              reps: lastSet.reps,
              time: lastSet.time,
              level: lastSet.level,
              exerciseName: lastSet.exerciseName,
              restTime: restTime,
            };

            return {
              ...prev,
              [lastExerciseId]: {
                ...current,
                sets: updatedSets,
              },
            };
          }
        }
      }
      return prev;
    });

    setIsResting(false);
    setRestTime(0);
  };

  const finishWorkout = () => {
    if (Object.keys(currentSession).length === 0) return;

    // Finalizar e salvar sessão detalhada
    const detailedSession = workoutSaver.finishSession();
    if (detailedSession) {
      workoutSaver.saveToStorage(detailedSession);
    }

    // Redirecionar para dashboard
    router.push("/dashboard");
  };

  const cancelWorkout = () => {
    // Redirecionar para dashboard sem salvar
    router.push("/dashboard");
  };

  const renderActiveCarousel = () => {
    switch (activeTab) {
      case "peito":
        return (
          <ExerciseCarousel
            exerciseType="pushup"
            selectedLevel={selectedPushUpLevel}
            currentLevel={currentPushUpLevel}
            onLevelChange={setSelectedPushUpLevel}
            variations={pushUpVariations}
            activeTimer={activeTimer}
            timers={timers}
            currentSession={currentSession}
            onStartTimer={startTimer}
            onStopTimer={stopTimer}
            onSaveProgress={saveProgress}
          />
        );
      case "costas":
        return (
          <ExerciseCarousel
            exerciseType="pullup"
            selectedLevel={selectedPullUpLevel}
            currentLevel={currentPullUpLevel}
            onLevelChange={setSelectedPullUpLevel}
            variations={pullUpVariations}
            activeTimer={activeTimer}
            timers={timers}
            currentSession={currentSession}
            onStartTimer={startTimer}
            onStopTimer={stopTimer}
            onSaveProgress={saveProgress}
          />
        );
      case "pernas":
        return (
          <ExerciseCarousel
            exerciseType="squat"
            selectedLevel={selectedSquatLevel}
            currentLevel={currentSquatLevel}
            onLevelChange={setSelectedSquatLevel}
            variations={squatVariations}
            activeTimer={activeTimer}
            timers={timers}
            currentSession={currentSession}
            onStartTimer={startTimer}
            onStopTimer={stopTimer}
            onSaveProgress={saveProgress}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
            Treino em Andamento
          </h1>
          <p className="text-gray-300">Selecione um grupo muscular</p>
        </motion.div>

        {/* Workout Timers */}
        <WorkoutTimers
          workoutStartTime={workoutStartTime}
          totalWorkoutTime={totalWorkoutTime}
          currentSession={currentSession}
        />

        {/* Workout Navbar */}
        <WorkoutNavbar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentSession={currentSession}
        />

        {/* Active Exercise Carousel */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {renderActiveCarousel()}
        </motion.div>

        {/* Rest Timer */}
        <RestTimer
          isResting={isResting}
          restTime={restTime}
          onFinishRest={finishRest}
        />

        {/* Workout Controls */}
        <motion.div
          className="text-center mb-8 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            onClick={finishWorkout}
            size="lg"
            disabled={Object.keys(currentSession).length === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            Finalizar Treino
          </Button>
          <div>
            <Button
              onClick={cancelWorkout}
              variant="outline"
              className="text-red-400 border-red-400 hover:bg-red-400/10"
            >
              Cancelar Treino
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
