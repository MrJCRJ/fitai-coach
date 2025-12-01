"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Internal components
import { Exercise } from "@/lib/exercises";
import ExerciseCard from "./ExerciseCard";

// Importar dados organizados por dificuldade
import {
  beginnerPushups,
  intermediatePushups,
  advancedPushups,
  extremePushups,
} from "@/lib/exercises/variations/pushups";

import { pullExercisesByDifficulty } from "@/lib/exercises/variations/pull";

import { squatExercisesByDifficulty } from "@/lib/exercises/variations/squat";

// Constants
const EXERCISE_DATA = {
  pushup: { icon: "💪", title: "Empurrar", exerciseId: "flexao" },
  dip: { icon: "💪", title: "Empurrar", exerciseId: "dip" },
  pullup: { icon: "🏋️", title: "Puxar", exerciseId: "barra" },
  squat: { icon: "🦵", title: "Pernas", exerciseId: "agachamento" },
} as const;

const DIFFICULTY_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
  "extreme",
] as const;
type Difficulty = (typeof DIFFICULTY_LEVELS)[number];

// Types
interface ExerciseCarouselProps {
  exerciseType: "pushup" | "pullup" | "squat" | "dip";
  activeTimer: string | null;
  timers: { [key: string]: number };
  currentSession: {
    [key: string]: {
      sets: {
        reps: number;
        time: number;
        exerciseName: string;
        restTime?: number;
      }[];
      totalTime: number;
    };
  };
  onStartTimer: (exerciseId: string) => void;
  onStopTimer: (exerciseId: string) => void;
  onSaveProgress: (
    exerciseId: string,
    reps: number,
    weight?: number,
    exercise?: Exercise,
    selectedDifficulty?: string,
  ) => void;
  selectedDifficulty?: Difficulty;
  onSelectedDifficultyChange?: (difficulty: Difficulty) => void;
}

export default function ExerciseCarousel({
  exerciseType,
  activeTimer,
  timers,
  currentSession,
  onStartTimer,
  onStopTimer,
  onSaveProgress,
  selectedDifficulty: selectedDifficultyProp,
  onSelectedDifficultyChange,
}: ExerciseCarouselProps) {
  type Difficulty = (typeof DIFFICULTY_LEVELS)[number];
  const [internalSelectedDifficulty, setInternalSelectedDifficulty] =
    useState<Difficulty>("beginner");
  const selectedDifficulty =
    (selectedDifficultyProp as Difficulty) || internalSelectedDifficulty;
  const setSelectedDifficulty =
    onSelectedDifficultyChange || setInternalSelectedDifficulty;
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const { icon, title, exerciseId } = EXERCISE_DATA[exerciseType];

  // Função para obter exercícios por dificuldade baseado no tipo
  const getExercisesByDifficulty = (difficulty: Difficulty): Exercise[] => {
    switch (exerciseType) {
      case "pushup":
        switch (difficulty) {
          case "beginner":
            return Object.values(beginnerPushups);
          case "intermediate":
            return Object.values(intermediatePushups);
          case "advanced":
            return Object.values(advancedPushups);
          case "extreme":
            return Object.values(extremePushups);
          default:
            return [];
        }

      case "pullup":
        return Object.values(pullExercisesByDifficulty[difficulty] || {});

      case "squat":
        return Object.values(squatExercisesByDifficulty[difficulty] || {});

      default:
        return [];
    }
  };

  const currentExercises = getExercisesByDifficulty(selectedDifficulty);

  // Resetar índice quando mudar dificuldade
  const handleDifficultyChange = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentExerciseIndex(0);
  };

  // Navegação do carrossel
  const nextExercise = () => {
    setCurrentExerciseIndex((prev) =>
      prev === currentExercises.length - 1 ? 0 : prev + 1,
    );
  };

  const prevExercise = () => {
    setCurrentExerciseIndex((prev) =>
      prev === 0 ? currentExercises.length - 1 : prev - 1,
    );
  };

  const goToExercise = (index: number) => {
    setCurrentExerciseIndex(index);
  };

  // Verificar se há exercícios disponíveis
  if (currentExercises.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-700 rounded w-48 mx-auto mb-4"></div>
          <p className="text-gray-400">
            Nenhum exercício disponível para {selectedDifficulty}.
          </p>
        </div>
      </div>
    );
  }

  const currentExercise = currentExercises[currentExerciseIndex];

  // Verificar se o exercício atual existe
  if (!currentExercise) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Exercício não encontrado.</p>
      </div>
    );
  }

  const renderCarousel = () => {
    return (
      <div className="relative">
        {/* Botões de navegação */}
        <div className="flex justify-between items-center mb-4">
          <motion.button
            onClick={prevExercise}
            className="p-3 rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentExercises.length <= 1}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <div className="text-center">
            <div className="text-sm text-gray-400">
              {currentExerciseIndex + 1} de {currentExercises.length}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {selectedDifficulty.charAt(0).toUpperCase() +
                selectedDifficulty.slice(1)}
            </div>
          </div>

          <motion.button
            onClick={nextExercise}
            className="p-3 rounded-full bg-slate-700/50 hover:bg-slate-600/50 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentExercises.length <= 1}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mb-6">
          {currentExercises.map((_, index) => (
            <button
              key={index}
              onClick={() => goToExercise(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentExerciseIndex
                  ? "bg-blue-500 scale-125"
                  : "bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>

        {/* Exercício atual */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedDifficulty}-${currentExerciseIndex}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-md">
              <ExerciseCard
                exercise={currentExercise}
                exerciseId={`${exerciseId}-${currentExercise.id}`}
                icon={icon}
                title={title}
                selectedDifficulty={selectedDifficulty}
                activeTimer={activeTimer}
                timers={timers}
                currentSession={currentSession}
                onStartTimer={onStartTimer}
                onStopTimer={onStopTimer}
                onSaveProgress={(exerciseId, reps, weight, exercise) =>
                  onSaveProgress(
                    exerciseId,
                    reps,
                    weight,
                    exercise,
                    selectedDifficulty,
                  )
                }
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Navegação por Dificuldade */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Selecione a Dificuldade
        </h3>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {DIFFICULTY_LEVELS.map((difficulty) => {
            const exerciseCount = getExercisesByDifficulty(difficulty).length;
            return (
              <motion.button
                key={difficulty}
                onClick={() => handleDifficultyChange(difficulty)}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedDifficulty === difficulty
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 hover:scale-105"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={exerciseCount === 0}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                <span className="ml-2 text-xs opacity-75">
                  ({exerciseCount})
                </span>
                {selectedDifficulty === difficulty && (
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-blue-300"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Contador de exercícios */}
        <div className="text-sm text-gray-400">
          {currentExercises.length} exercício
          {currentExercises.length !== 1 ? "s" : ""} disponível
          {currentExercises.length !== 1 ? "is" : ""} em {selectedDifficulty}
        </div>
      </motion.div>

      {/* Renderização dos exercícios */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDifficulty}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {renderCarousel()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
