"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { formatTime } from "@/lib/exerciseUtils";

interface SavedSetsProps {
  exerciseId: string;
  currentSession: {
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
  };
  expandedSet: number | null;
  setExpandedSet: (index: number | null) => void;
}

interface WorkoutSet {
  reps: number;
  time: number;
  level: number;
  exerciseName: string;
  restTime?: number;
  weight?: number;
}

export default function SavedSets({
  exerciseId,
  currentSession,
  expandedSet,
  setExpandedSet,
}: SavedSetsProps) {
  const sets = currentSession[exerciseId]?.sets || [];

  if (sets.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="text-sm text-gray-400 mb-2">
        Sets realizados: {sets.length}
      </div>
      <div className="space-y-1">
        {sets.map((set: WorkoutSet, index) => (
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
                <span className="text-white font-medium">{set.reps} reps</span>
                {set.weight && (
                  <Badge variant="info" className="text-xs px-1 py-0">
                    {set.weight}kg
                  </Badge>
                )}
                {set.restTime && (
                  <span className="text-blue-400 text-xs">
                    {formatTime(set.restTime)}
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
                          {formatTime(set.restTime)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tempo total:</span>
                      <span className="text-green-400">
                        {formatTime(set.time + (set.restTime || 0))}
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
  );
}
