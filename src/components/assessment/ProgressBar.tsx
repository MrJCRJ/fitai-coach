import { motion } from "framer-motion";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
}

export function ProgressBar({
  currentQuestion,
  totalQuestions,
  progress,
}: ProgressBarProps) {
  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>
          Pergunta {currentQuestion + 1} de {totalQuestions}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
