import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { AssessmentQuestion } from "@/lib/assessmentData";

interface QuestionInputProps {
  question: AssessmentQuestion;
  answer: any;
  onAnswer: (questionId: string, answer: any) => void;
  showLimitationsDetail?: boolean;
}

export function QuestionInput({
  question,
  answer,
  onAnswer,
  showLimitationsDetail,
}: QuestionInputProps) {
  const handleChoiceSelect = (option: string) => {
    onAnswer(question.id, option);
  };

  const handleNumberInput = (value: string) => {
    const num = parseInt(value) || 0;
    onAnswer(question.id, num);
  };

  const handleScaleInput = (value: string) => {
    const num = parseInt(value);
    onAnswer(question.id, num);
  };

  const handleDateInput = (value: string) => {
    onAnswer(question.id, value);
  };

  if (question.type === "choice" && question.options) {
    return (
      <div className="space-y-4">
        <div className="grid gap-3">
          {question.options.map((option) => (
            <Button
              key={option}
              variant={answer === option ? "primary" : "outline"}
              className="w-full text-left justify-start h-auto py-4 px-6"
              onClick={() => handleChoiceSelect(option)}
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Campo adicional para limitações */}
        {showLimitationsDetail && question.id === "limitations" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descreva suas limitações:
            </label>
            <textarea
              value={answer?.limitations_detail || ""}
              onChange={(e) => onAnswer("limitations_detail", e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
              rows={3}
              placeholder="Descreva detalhadamente suas limitações físicas..."
            />
          </motion.div>
        )}
      </div>
    );
  }

  if (question.type === "number") {
    return (
      <div className="space-y-4">
        <input
          type="number"
          min={question.min || 0}
          max={question.max || 999}
          value={answer || ""}
          onChange={(e) => handleNumberInput(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          placeholder={`Digite ${question.unit ? `em ${question.unit}` : ""}`}
        />
        {question.unit && (
          <p className="text-sm text-gray-400">Unidade: {question.unit}</p>
        )}
      </div>
    );
  }

  if (question.type === "scale") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Iniciante</span>
          <span>Avançado</span>
        </div>
        <input
          type="range"
          min={question.min || 1}
          max={question.max || 10}
          value={answer || 5}
          onChange={(e) => handleScaleInput(e.target.value)}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="text-center">
          <Badge variant="info" className="text-lg px-4 py-2">
            Nível {answer || 5} de 10
          </Badge>
        </div>
      </div>
    );
  }

  if (question.type === "date") {
    // Calcular a data máxima (hoje) e mínima (120 anos atrás)
    const today = new Date();
    const maxDate = today.toISOString().split("T")[0];

    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    const minDateString = minDate.toISOString().split("T")[0];

    return (
      <div className="space-y-4">
        <input
          type="date"
          value={answer || ""}
          onChange={(e) => handleDateInput(e.target.value)}
          min={minDateString}
          max={maxDate}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
        />
        <p className="text-sm text-gray-400">
          Selecione sua data de nascimento
        </p>
      </div>
    );
  }

  return null;
}
