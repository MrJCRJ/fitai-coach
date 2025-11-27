"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface RestTimerProps {
  isResting: boolean;
  restTime: number;
  onFinishRest?: () => void;
}

export default function RestTimer({
  isResting,
  restTime,
  onFinishRest,
}: RestTimerProps) {
  if (!isResting) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="p-8 max-w-md mx-auto text-center">
          <div className="text-6xl font-bold text-orange-400 font-mono mb-4">
            {formatTime(restTime)}
          </div>
          <p className="text-gray-400 mb-6">Tempo de descanso</p>

          <div className="space-y-3">
            {onFinishRest && (
              <Button
                onClick={onFinishRest}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                Finalizar Descanso
              </Button>
            )}
            <p className="text-sm text-gray-500">
              Clique quando estiver pronto para continuar
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
