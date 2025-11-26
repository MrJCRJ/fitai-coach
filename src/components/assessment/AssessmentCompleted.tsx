import { motion } from "framer-motion";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { AssessmentAnswers } from "@/lib/assessmentData";
import { calculateAge, formatBirthDate } from "@/lib/assessmentData";

interface AssessmentCompletedProps {
  answers: AssessmentAnswers;
  onReset: () => void;
}

export function AssessmentCompleted({
  answers,
  onReset,
}: AssessmentCompletedProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-green-200 to-blue-200 bg-clip-text text-transparent mb-4">
            Avaliação Concluída!
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Obrigado por completar sua avaliação. Agora vamos criar treinos
            personalizados perfeitos para você.
          </p>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card
            className="p-8 bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500/30"
            glow
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              📊 Resumo da Avaliação
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-300">Data de nascimento:</span>
                <span className="text-white font-medium">
                  {formatBirthDate(String(answers.birth_date))} (
                  {calculateAge(String(answers.birth_date))} anos)
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-300">Objetivo:</span>
                <span className="text-white font-medium">
                  {String(answers.goal)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-300">Frequência desejada:</span>
                <span className="text-white font-medium">
                  {String(answers.frequency)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-300">Nível de condicionamento:</span>
                <span className="text-white font-medium">
                  {Number(answers.fitness_level)}/10
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-300 mb-6">
                Agora vamos fazer um desafio físico para determinar seu nível
                real de condicionamento. Com esses dados, nossa IA criará um
                plano mensal personalizado perfeito para você.
              </p>

              <div className="space-y-4">
                <Link href="/dashboard">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    🎯 Ir para Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700/50"
                  onClick={onReset}
                >
                  Refazer Avaliação
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
