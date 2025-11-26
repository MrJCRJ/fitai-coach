import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { AssessmentQuestion } from "@/lib/assessmentData";
import { QuestionInput } from "./QuestionInput";

interface QuestionCardProps {
  question: AssessmentQuestion;
  answer: unknown;
  onAnswer: (questionId: string, answer: unknown) => void;
  showLimitationsDetail?: boolean;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}

export function QuestionCard({
  question,
  answer,
  onAnswer,
  showLimitationsDetail,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLastQuestion,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="p-8" glow>
        <h2 className="text-2xl font-bold text-white mb-6">
          {question.question}
        </h2>

        {question.description && (
          <p className="text-gray-400 mb-6 text-sm">{question.description}</p>
        )}

        <QuestionInput
          question={question}
          answer={answer}
          onAnswer={onAnswer}
          showLimitationsDetail={showLimitationsDetail || false}
        />

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="border-gray-600 text-gray-300 hover:bg-gray-700/50 disabled:opacity-50"
          >
            ← Anterior
          </Button>

          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
          >
            {isLastQuestion ? "Finalizar" : "Próximo"} →
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
