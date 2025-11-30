"use client";

import { motion } from "framer-motion";
import { Exercise } from "@/lib/exercises";
import { formatReps } from "@/lib/exerciseUtils";
import ExerciseControls from "./ExerciseControls";

interface ExerciseCardProps {
  exercise: Exercise;
  exerciseId: string;
  icon: string;
  title: string;
  selectedLevel: number;
  selectedDifficulty?: string;
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
}

export default function ExerciseCard({
  exercise,
  exerciseId,
  icon,
  title,
  selectedLevel,
  selectedDifficulty,
  activeTimer,
  timers,
  currentSession,
  onStartTimer,
  onStopTimer,
  onSaveProgress,
}: ExerciseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">{icon}</div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-400">
            {exercise.name || "Exercício"}
          </p>
        </div>

        <div className="text-center text-sm text-gray-400 mb-4">
          {selectedDifficulty ? (
            <span className="capitalize">{selectedDifficulty}</span>
          ) : (
            <>Nível {selectedLevel}</>
          )}{" "}
          • {formatReps(exercise.reps)}
        </div>

        {/* Instructions */}
        <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">
            {exercise.instructions || "Execute o exercício controladamente."}
          </p>
          {exercise.tips && (
            <p className="text-sm text-blue-400">💡 {exercise.tips}</p>
          )}
        </div>

        <ExerciseControls
          exerciseId={exerciseId}
          exercise={exercise}
          activeTimer={activeTimer}
          timers={timers}
          currentSession={currentSession}
          onStartTimer={onStartTimer}
          onStopTimer={onStopTimer}
          onSaveProgress={onSaveProgress}
        />
      </div>
    </motion.div>
  );
}
