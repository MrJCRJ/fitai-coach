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

import { useWorkoutLevels } from "@/hooks/useWorkoutLevels";
import { useWorkoutTimers } from "@/hooks/useWorkoutTimers";
import { useWorkoutSession } from "@/hooks/useWorkoutSession";
import { Exercise } from "@/lib/exercises";

// Desabilitar prerendering para esta página
export const dynamic = "force-dynamic";

export default function WorkoutPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("empurrar");

  // Hooks customizados
  const workoutLevels = useWorkoutLevels();
  const workoutTimers = useWorkoutTimers();
  const workoutSession = useWorkoutSession();

  // Iniciar treino automaticamente
  useEffect(() => {
    if (typeof window === "undefined") return;

    workoutTimers.startWorkout();
    workoutSession.startSession();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handlers para exercícios
  const handleStartTimer = (exerciseId: string) => {
    workoutTimers.startTimer(exerciseId);
    // Não precisamos mais chamar startExercise aqui - o saveProgress cuida disso
  };

  const handleStopTimer = (exerciseId: string) => {
    workoutTimers.stopTimer(exerciseId);
  };

  const handleSaveProgress = (
    exerciseId: string,
    reps: number,
    weight?: number,
    exercise?: Exercise,
    selectedDifficulty?: string,
  ) => {
    workoutTimers.stopTimer(exerciseId);

    workoutSession.saveProgress(
      exerciseId,
      reps,
      activeTab,
      workoutLevels.selectedPushUpLevel,
      workoutLevels.selectedPullUpLevel,
      workoutLevels.selectedSquatLevel,
      workoutTimers.timers,
      weight,
      "pushup", // Default para compatibilidade
      exercise,
      selectedDifficulty,
    );

    workoutTimers.startRest();
  };

  const handleFinishRest = () => {
    workoutTimers.finishRest();
  };

  const handleFinishWorkout = () => {
    if (Object.keys(workoutSession.currentSession).length === 0) return;

    workoutSession.finishSession();
    router.push("/dashboard");
  };

  const handleCancelWorkout = () => {
    router.push("/dashboard");
  };

  const renderActiveCarousel = () => {
    // Dados vazios - o novo carousel usa os dados organizados por dificuldade

    switch (activeTab) {
      case "empurrar":
        return (
          <ExerciseCarousel
            exerciseType="pushup"
            activeTimer={workoutTimers.activeTimer}
            timers={workoutTimers.timers}
            currentSession={workoutSession.currentSession}
            onStartTimer={handleStartTimer}
            onStopTimer={handleStopTimer}
            onSaveProgress={handleSaveProgress}
          />
        );
      case "puxar":
        return (
          <ExerciseCarousel
            exerciseType="pullup"
            activeTimer={workoutTimers.activeTimer}
            timers={workoutTimers.timers}
            currentSession={workoutSession.currentSession}
            onStartTimer={handleStartTimer}
            onStopTimer={handleStopTimer}
            onSaveProgress={handleSaveProgress}
          />
        );
      case "pernas":
        return (
          <ExerciseCarousel
            exerciseType="squat"
            activeTimer={workoutTimers.activeTimer}
            timers={workoutTimers.timers}
            currentSession={workoutSession.currentSession}
            onStartTimer={handleStartTimer}
            onStopTimer={handleStopTimer}
            onSaveProgress={handleSaveProgress}
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
          workoutStartTime={workoutTimers.workoutStartTime}
          totalWorkoutTime={workoutTimers.totalWorkoutTime}
          currentSession={workoutSession.currentSession}
        />

        {/* Workout Navbar */}
        <WorkoutNavbar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentSession={workoutSession.currentSession}
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
          isResting={workoutTimers.isResting}
          restTime={workoutTimers.restTime}
          onFinishRest={handleFinishRest}
        />

        {/* Workout Controls */}
        <motion.div
          className="text-center mb-8 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            onClick={handleFinishWorkout}
            size="lg"
            disabled={Object.keys(workoutSession.currentSession).length === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            Finalizar Treino
          </Button>
          <div>
            <Button
              onClick={handleCancelWorkout}
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
