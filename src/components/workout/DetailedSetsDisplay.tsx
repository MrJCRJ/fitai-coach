"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { DetailedSet } from "@/lib/workoutTypes";

interface DetailedSetsDisplayProps {
  sets: DetailedSet[];
  exerciseName: string;
}

export default function DetailedSetsDisplay({ sets, exerciseName }: DetailedSetsDisplayProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty?: number) => {
    if (!difficulty) return "bg-gray-500";
    if (difficulty <= 2) return "bg-green-500";
    if (difficulty <= 3) return "bg-yellow-500";
    if (difficulty <= 4) return "bg-orange-500";
    return "bg-red-500";
  };

  const getDifficultyLabel = (difficulty?: number) => {
    if (!difficulty) return "N/A";
    const labels = ["", "Muito Fácil", "Fácil", "Médio", "Difícil", "Muito Difícil"];
    return labels[difficulty] || "N/A";
  };

  if (sets.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-4"
    >
      <Card className="p-4">
        <h4 className="text-lg font-semibold text-white mb-3">
          Sets Detalhados - {exerciseName}
        </h4>

        <div className="space-y-3">
          {sets.map((set, index) => (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-slate-700/50 rounded-lg p-3 border border-slate-600"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="info" className="text-xs">
                    Set {set.order}
                  </Badge>
                  {set.completed ? (
                    <Badge variant="success" className="text-xs">
                      ✓ Completo
                    </Badge>
                  ) : (
                    <Badge variant="warning" className="text-xs">
                      ⚠ Incompleto
                    </Badge>
                  )}
                </div>

                {set.perceivedDifficulty && (
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${getDifficultyColor(set.perceivedDifficulty)}`} />
                    <span className="text-xs text-gray-400">
                      {getDifficultyLabel(set.perceivedDifficulty)}
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Repetições:</span>
                  <div className="text-white font-medium">
                    {set.reps} / {set.targetReps}
                  </div>
                </div>

                <div>
                  <span className="text-gray-400">Duração:</span>
                  <div className="text-white font-medium">
                    {formatTime(set.duration)}
                  </div>
                </div>

                {set.restTime && (
                  <div>
                    <span className="text-gray-400">Descanso:</span>
                    <div className="text-white font-medium">
                      {formatTime(set.restTime)}
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-gray-400">Horário:</span>
                  <div className="text-white font-medium text-xs">
                    {new Date(set.startTime).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit"
                    })}
                  </div>
                </div>
              </div>

              {set.notes && (
                <div className="mt-2 pt-2 border-t border-slate-600">
                  <span className="text-gray-400 text-xs">Notas:</span>
                  <div className="text-white text-sm mt-1">
                    {set.notes}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Resumo dos sets */}
        <div className="mt-4 pt-3 border-t border-slate-600">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="text-gray-400">Total Reps</div>
              <div className="text-white font-semibold">
                {sets.reduce((sum, set) => sum + set.reps, 0)}
              </div>
            </div>
            <div>
              <div className="text-gray-400">Tempo Total</div>
              <div className="text-white font-semibold">
                {formatTime(sets.reduce((sum, set) => sum + set.duration, 0))}
              </div>
            </div>
            <div>
              <div className="text-gray-400">Sets Completos</div>
              <div className="text-white font-semibold">
                {sets.filter(set => set.completed).length}/{sets.length}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}