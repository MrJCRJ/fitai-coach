"use client";

import { Suspense } from "react";
import { useAssessmentState } from "@/hooks/useAssessmentState";
import { assessmentQuestions } from "@/lib/assessmentData";
import {
  AssessmentHeader,
  QuestionCard,
  AssessmentCompleted,
} from "@/components/assessment";

function AssessmentContent() {
  const {
    currentQuestionIndex,
    answers,
    showLimitationsDetail,
    completed,
    personalGoals,
    currentQuestion,
    progress,
    canGoNext,
    canGoPrevious,
    isLastQuestion,
    handleAnswer,
    nextQuestion,
    previousQuestion,
    resetAssessment,
    setPersonalGoals,
  } = useAssessmentState();

  if (completed) {
    return <AssessmentCompleted answers={answers} onReset={resetAssessment} />;
  }

  if (!currentQuestion) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AssessmentHeader
          currentQuestion={currentQuestionIndex}
          totalQuestions={assessmentQuestions.length}
          progress={progress}
        />

        <QuestionCard
          question={currentQuestion}
          answer={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
          showLimitationsDetail={showLimitationsDetail}
          onNext={nextQuestion}
          onPrevious={previousQuestion}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
          isLastQuestion={isLastQuestion}
        />

        {isLastQuestion && (
          <div className="mt-8 bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <label
              htmlFor="personalGoals"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Objetivos Pessoais (opcional)
            </label>
            <p className="text-sm text-gray-400 mb-4">
              Descreva seus objetivos específicos, limitações ou preferências.
              Ex.: &ldquo;Quero treinar em casa com barra de parede, tenho lesão
              no joelho.&rdquo;
            </p>
            <textarea
              id="personalGoals"
              value={personalGoals}
              onChange={(e) => setPersonalGoals(e.target.value.slice(0, 500))}
              placeholder="Digite aqui seus objetivos pessoais..."
              className="w-full p-3 border rounded-md bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {personalGoals.length}/500 caracteres
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <div>Carregando...</div>
        </div>
      }
    >
      <AssessmentContent />
    </Suspense>
  );
}
