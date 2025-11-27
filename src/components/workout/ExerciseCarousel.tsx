"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Exercise } from "@/lib/exercisesDatabase";

interface ExerciseCarouselProps {
  exerciseType: "pushup" | "pullup" | "squat";
  selectedLevel: number;
  currentLevel: number;
  onLevelChange: (level: number) => void;
  variations: Record<number, Exercise>;
  activeTimer: string | null;
  timers: { [key: string]: number };
  currentSession: {
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
  };
  onStartTimer: (exerciseId: string) => void;
  onStopTimer: (exerciseId: string) => void;
  onSaveProgress: (exerciseId: string, reps: number) => void;
}

export default function ExerciseCarousel({
  exerciseType,
  selectedLevel,
  currentLevel,
  onLevelChange,
  variations,
  activeTimer,
  timers,
  currentSession,
  onStartTimer,
  onStopTimer,
  onSaveProgress,
}: ExerciseCarouselProps) {
  const [expandedSet, setExpandedSet] = useState<number | null>(null);
  const getExerciseData = () => {
    switch (exerciseType) {
      case "pushup":
        return {
          icon: "💪",
          title: "Peito",
          exerciseId: "flexao",
        };
      case "pullup":
        return {
          icon: "🏋️",
          title: "Costas",
          exerciseId: "barra",
        };
      case "squat":
        return {
          icon: "🦵",
          title: "Pernas",
          exerciseId: "agachamento",
        };
    }
  };

  const { icon, title, exerciseId } = getExerciseData();
  const currentVariation = variations[selectedLevel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">{icon}</div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-400">
            {currentVariation?.name || "Exercício"}
          </p>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mb-4">
          {Object.keys(variations).map((level) => (
            <button
              key={level}
              onClick={() => onLevelChange(parseInt(level))}
              className={`w-3 h-3 rounded-full transition-all ${
                parseInt(level) === selectedLevel
                  ? "bg-blue-500 scale-125"
                  : parseInt(level) === currentLevel
                    ? "bg-green-500"
                    : "bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>

        <div className="text-center text-sm text-gray-400 mb-4">
          Nível {selectedLevel} • {currentVariation?.reps || "10-15"} reps
        </div>

        {/* Instructions */}
        <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">
            {currentVariation?.instructions ||
              "Execute o exercício controladamente."}
          </p>
          {currentVariation?.tips && (
            <p className="text-sm text-blue-400">💡 {currentVariation.tips}</p>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <input
            type="number"
            min="1"
            defaultValue={currentVariation?.reps?.split("-")[0] || "10"}
            className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-center"
            id={`reps-${exerciseId}`}
          />

          <div className="flex gap-2">
            {activeTimer === exerciseId ? (
              <Button
                onClick={() => onStopTimer(exerciseId)}
                variant="outline"
                className="flex-1"
              >
                Parar Timer
              </Button>
            ) : (
              <Button
                onClick={() => onStartTimer(exerciseId)}
                className="flex-1"
              >
                Iniciar Timer
              </Button>
            )}
            <Button
              onClick={() => {
                const reps = parseInt(
                  (
                    document.getElementById(
                      `reps-${exerciseId}`
                    ) as HTMLInputElement
                  )?.value || "0"
                );
                onSaveProgress(exerciseId, reps);
              }}
              variant="outline"
              disabled={activeTimer !== exerciseId}
              className={
                activeTimer !== exerciseId
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            >
              Salvar Set
            </Button>
          </div>

          {/* Saved Sets */}
          {(currentSession[exerciseId]?.sets?.length || 0) > 0 && (
            <div className="mt-4">
              <div className="text-sm text-gray-400 mb-2">
                Sets realizados: {currentSession[exerciseId]?.sets?.length || 0}
              </div>
              <div className="space-y-1">
                {currentSession[exerciseId]?.sets?.map((set, index) => (
                  <div key={index}>
                    <button
                      onClick={() =>
                        setExpandedSet(expandedSet === index ? null : index)
                      }
                      className="w-full flex justify-between items-center text-sm bg-slate-700/30 hover:bg-slate-700/50 rounded px-2 py-2 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300">Set {index + 1}</span>
                        <Badge variant="default" className="text-xs px-1 py-0">
                          Nível {set.level}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">
                          {set.reps} reps
                        </span>
                        {set.restTime && (
                          <span className="text-blue-400 text-xs">
                            {Math.floor(set.restTime / 60)}:
                            {(set.restTime % 60).toString().padStart(2, "0")}
                          </span>
                        )}
                        <span className="text-gray-500 text-xs">
                          {expandedSet === index ? "▲" : "▼"}
                        </span>
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedSet === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="bg-slate-800/50 rounded-b px-3 py-2 mt-1 text-xs space-y-1">
                            <div className="flex justify-between items-center border-b border-slate-600 pb-1 mb-2">
                              <span className="text-gray-400">Exercício:</span>
                              <span className="text-white font-medium">
                                {set.exerciseName}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Repetições:</span>
                              <span className="text-white">{set.reps}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Duração:</span>
                              <span className="text-white">{set.time}s</span>
                            </div>
                            {set.restTime && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Descanso:</span>
                                <span className="text-blue-400">
                                  {Math.floor(set.restTime / 60)}:
                                  {(set.restTime % 60)
                                    .toString()
                                    .padStart(2, "0")}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-400">
                                Tempo total:
                              </span>
                              <span className="text-green-400">
                                {Math.floor(
                                  (set.time + (set.restTime || 0)) / 60
                                )}
                                :
                                {((set.time + (set.restTime || 0)) % 60)
                                  .toString()
                                  .padStart(2, "0")}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTimer === exerciseId && (
            <Badge variant="success" className="justify-center">
              {Math.floor((timers[exerciseId] || 0) / 60)}:
              {((timers[exerciseId] || 0) % 60).toString().padStart(2, "0")}
            </Badge>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
