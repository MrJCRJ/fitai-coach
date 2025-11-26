import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ProgressBar } from "./ProgressBar";

interface AssessmentHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
}

export function AssessmentHeader({
  currentQuestion,
  totalQuestions,
  progress,
}: AssessmentHeaderProps) {
  return (
    <>
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </motion.div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
          Avaliação Física
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
          Vamos conhecer melhor seu perfil para criar treinos personalizados
        </p>

        <ProgressBar
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          progress={progress}
        />
      </motion.div>

      {/* Footer */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link href="/dashboard">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
          >
            ← Voltar ao Dashboard
          </Button>
        </Link>
      </motion.div>
    </>
  );
}
