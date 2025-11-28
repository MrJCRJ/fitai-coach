"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";

interface WorkoutTimersProps {
  workoutStartTime: Date | null;
  totalWorkoutTime: number;
  currentSession: {
    [key: string]: {
      sets: { reps: number; time: number }[];
      totalTime: number;
    };
  };
}

export default function WorkoutTimers({
  workoutStartTime,
  totalWorkoutTime,
  currentSession,
}: WorkoutTimersProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        <Card className="p-6 text-center flex flex-col justify-center items-center min-h-[140px]">
          <div className="text-sm text-gray-400 mb-2">
            Treino iniciado em {workoutStartTime?.toLocaleDateString("pt-BR")}{" "}
            às{" "}
            {workoutStartTime?.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="text-3xl font-bold text-blue-400 font-mono">
            {formatTime(totalWorkoutTime)}
          </div>
          <div className="text-sm text-gray-400 mt-1">Tempo decorrido</div>
        </Card>

        <Card className="p-6 text-center flex flex-col justify-center items-center min-h-[140px]">
          <div className="text-3xl font-bold text-green-400 font-mono">
            {formatTime(
              Object.values(currentSession).reduce(
                (sum, ex) => sum + ex.totalTime,
                0,
              ),
            )}
          </div>
          <div className="text-sm text-gray-400 mt-1">Tempo em exercícios</div>
        </Card>
      </div>
    </motion.div>
  );
}
