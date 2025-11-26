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
    currentQuestion,
    progress,
    canGoNext,
    canGoPrevious,
    isLastQuestion,
    handleAnswer,
    nextQuestion,
    previousQuestion,
    resetAssessment,
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
