import { useState, useEffect, useCallback } from "react";
import {
  AssessmentQuestion,
  AssessmentAnswers,
  assessmentQuestions,
  validateAnswer,
  getNextQuestionIndex,
  getPreviousQuestionIndex,
  isLastQuestion,
  isFirstQuestion,
  calculateProgress,
} from "@/lib/assessmentData";

export interface UseAssessmentStateReturn {
  // Estado
  currentQuestionIndex: number;
  answers: AssessmentAnswers;
  showLimitationsDetail: boolean;
  completed: boolean;

  // Dados calculados
  currentQuestion: AssessmentQuestion | null;
  progress: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;

  // Ações
  handleAnswer: (questionId: string, answer: any) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetAssessment: () => void;
  completeAssessment: () => void;
}

const STORAGE_KEYS = {
  ANSWERS: "fitai-assessment-answers",
  COMPLETED: "fitai-assessment-completed",
} as const;

export function useAssessmentState(): UseAssessmentStateReturn {
  // Estado principal
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.ANSWERS);
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  const [showLimitationsDetail, setShowLimitationsDetail] = useState(false);
  const [completed, setCompleted] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEYS.COMPLETED) === "true";
    }
    return false;
  });

  // Dados calculados
  const currentQuestion = assessmentQuestions[currentQuestionIndex] || null;
  const progress = calculateProgress(currentQuestionIndex);
  const isLastQuestionFlag = isLastQuestion(currentQuestionIndex);
  const canGoPrevious = !isFirstQuestion(currentQuestionIndex);
  const canGoNext = currentQuestion
    ? validateAnswer(currentQuestion, answers[currentQuestion.id])
    : false;

  // Efeitos para persistência
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
    }
  }, [answers]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.COMPLETED, completed.toString());
    }
  }, [completed]);

  // Handlers
  const handleAnswer = useCallback((questionId: string, answer: any) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev, [questionId]: answer };

      // Lógica especial para limitações
      if (questionId === "limitations") {
        if (answer === "Outras limitações (especificar)") {
          setShowLimitationsDetail(true);
        } else {
          setShowLimitationsDetail(false);
          // Remover resposta detalhada se mudou de opção
          const updated = { ...newAnswers };
          delete updated.limitations_detail;
          return updated;
        }
      }

      return newAnswers;
    });
  }, []);

  const completeAssessment = useCallback(() => {
    setCompleted(true);
  }, []);

  const nextQuestion = useCallback(() => {
    if (!currentQuestion) return;

    // Se é a pergunta de limitações e usuário escolheu "Outras limitações", mostrar pergunta adicional
    if (
      currentQuestion.id === "limitations" &&
      answers.limitations === "Outras limitações (especificar)" &&
      !showLimitationsDetail
    ) {
      setShowLimitationsDetail(true);
      return;
    }

    // Se está mostrando pergunta adicional e não respondeu, não avançar
    if (showLimitationsDetail && !answers.limitations_detail) {
      return;
    }

    // Verificar se resposta é válida
    if (!validateAnswer(currentQuestion, answers[currentQuestion.id])) {
      return;
    }

    if (!isLastQuestionFlag) {
      setCurrentQuestionIndex((prev) => getNextQuestionIndex(prev));
      setShowLimitationsDetail(false);
    } else {
      completeAssessment();
    }
  }, [
    currentQuestion,
    answers,
    showLimitationsDetail,
    isLastQuestionFlag,
    completeAssessment,
  ]);

  const previousQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => getPreviousQuestionIndex(prev));
    setShowLimitationsDetail(false);
  }, []);

  const resetAssessment = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowLimitationsDetail(false);
    setCompleted(false);

    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.ANSWERS);
      localStorage.removeItem(STORAGE_KEYS.COMPLETED);
    }
  }, []);

  return {
    // Estado
    currentQuestionIndex,
    answers,
    showLimitationsDetail,
    completed,

    // Dados calculados
    currentQuestion,
    progress,
    canGoNext,
    canGoPrevious,
    isLastQuestion: isLastQuestionFlag,

    // Ações
    handleAnswer,
    nextQuestion,
    previousQuestion,
    resetAssessment,
    completeAssessment,
  };
}
