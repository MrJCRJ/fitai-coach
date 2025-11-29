"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { DetailedWorkoutSession } from "@/lib/workoutTypes";
import { formatTime } from "@/lib/dashboardUtils";
import { ExerciseCard } from "./ExerciseCard";

interface WorkoutSessionCardProps {
  session: DetailedWorkoutSession;
  index: number;
  isExpanded?: boolean;
  onToggleExpansion?: () => void;
}

export function WorkoutSessionCard({
  session,
  // index intentionally omitted in this component
  isExpanded = false,
  onToggleExpansion,
}: WorkoutSessionCardProps) {
  const [localExpanded, setLocalExpanded] = useState(false);

  // Use external expansion state if provided, otherwise use local state
  const expanded = isExpanded !== undefined ? isExpanded : localExpanded;
  const toggleExpansion =
    onToggleExpansion || (() => setLocalExpanded(!localExpanded));

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-white font-medium text-lg">
            {new Date(session.date).toLocaleDateString("pt-BR")}
          </span>
          <div className="text-sm text-gray-400">
            {new Date(session.startTime).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-white font-medium">
              {formatTime(session.duration)}
            </div>
            <div className="text-sm text-gray-400">
              {session.totalSets} sets • {session.totalReps} reps
            </div>
          </div>
          <Button
            onClick={toggleExpansion}
            className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded text-sm"
            size="sm"
          >
            {expanded ? "−" : "+"}
          </Button>
        </div>
      </div>

      {/* Exercícios da sessão - expandíveis */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="space-y-2 mb-3 pt-2">
          {session.exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </motion.div>

      {/* Estatísticas da sessão */}
      <div className="flex justify-between items-center text-sm border-t border-slate-600 pt-2">
        <div className="flex gap-4">
          <span className="text-gray-400">
            Média set: {formatTime(Math.round(session.averageSetDuration))}
          </span>
          {session.restTimeTotal > 0 && (
            <span className="text-gray-400">
              Descanso: {formatTime(session.restTimeTotal)}
            </span>
          )}
        </div>
        <div className="text-gray-500">
          {session.completed ? "✅ Completo" : "⏸️ Incompleto"}
        </div>
      </div>
    </Card>
  );
}
