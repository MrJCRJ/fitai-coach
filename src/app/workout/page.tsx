"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  isAssessmentCompleted,
  getAssessmentAnswers,
} from "@/lib/workoutGenerator";
import {
  isChallengeCompleted,
  loadChallengeResults,
} from "@/lib/challengeWorkout";
import type { WeeklyWorkout, WorkoutExercise } from "@/lib/ai/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createWeeklySchedule } from "@/lib/weeklySchedule";

export default function WorkoutPage() {
  const [assessmentCompleted] = useState(() => isAssessmentCompleted());
  const [challengeCompleted] = useState(() => isChallengeCompleted());
  const [workoutPlan, setWorkoutPlan] = useLocalStorage<WeeklyWorkout | null>(
    "fitai-weekly-workout-plan",
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar plano salvo ao montar o componente
  useEffect(() => {
    if (assessmentCompleted && challengeCompleted && !workoutPlan) {
      generateWorkoutPlan();
    }
  }, [assessmentCompleted, challengeCompleted, workoutPlan]);

  const generateWorkoutPlan = async () => {
    setLoading(true);
    setError(null);

    try {
      const assessmentAnswers = getAssessmentAnswers();
      const challengeResults = loadChallengeResults();

      if (!assessmentAnswers) {
        throw new Error("Dados da avaliação não encontrados");
      }

      const response = await fetch("/api/deepseek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile: assessmentAnswers,
          challengeResults: challengeResults || [],
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const plan = await response.json();
      setWorkoutPlan(plan);
    } catch (err) {
      console.error("Erro ao gerar plano:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  // Se não completou avaliação ou desafio, mostrar mensagem
  if (!assessmentCompleted || !challengeCompleted) {
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
                className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl"
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
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent mb-4">
              Treinos Indisponíveis
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Para acessar treinos personalizados, primeiro precisamos conhecer
              seu nível físico atual através da avaliação e do desafio
            </p>
          </motion.div>

          {/* Assessment Required Card */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card
              className="p-8 text-center bg-gradient-to-r from-orange-900/50 to-red-900/50 border-orange-500/30"
              glow
            >
              <div className="text-6xl mb-6">📊</div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Avaliação Física Necessária
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Antes de começar seus treinos, vamos fazer uma avaliação rápida
                e um desafio físico para entender seu nível atual, objetivos e
                criar um plano personalizado que realmente funcione para você.
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Avaliação rápida (5-10 minutos)</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-gray-300">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>Desafio físico para testar seu nível real</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-gray-300">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Treinos personalizados baseados nos resultados</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sm text-gray-300">
                  <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                  <span>Acompanhamento do seu progresso</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Link href="/assessment">
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-lg py-4">
                    🚀 Fazer Avaliação Agora
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700/50"
                  >
                    ← Voltar ao Dashboard
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Motivational Quote */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6 max-w-xl mx-auto">
              <blockquote className="text-lg text-gray-300 italic mb-3">
                &ldquo;A única maneira ruim de fazer exercícios é não
                fazê-los.&rdquo;
              </blockquote>
              <cite className="text-gray-400 text-sm">— Jerry Seinfeld</cite>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Se tem avaliação e desafio completos, mostrar plano de treino
  if (assessmentCompleted && challengeCompleted) {
    // Estado de carregamento
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </motion.div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
                Gerando Seu Plano
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Nossa IA está analisando seus dados e criando um plano semanal
                personalizado...
              </p>
            </motion.div>
          </div>
        </div>
      );
    }

    // Estado de erro
    if (error) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-6">⚠️</div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-red-200 to-red-200 bg-clip-text text-transparent mb-4">
                Erro ao Gerar Plano
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                {error}
              </p>
              <div className="space-x-4">
                <Button
                  onClick={generateWorkoutPlan}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Tentar Novamente
                </Button>
                <Link href="/dashboard">
                  <Button variant="outline">Voltar ao Dashboard</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    // Plano gerado com sucesso
    if (workoutPlan) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-6xl mx-auto px-4 py-16">
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
                Seu Plano Semanal - Semana {workoutPlan.week}
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Plano personalizado baseado na sua avaliação e desempenho no
                desafio
              </p>
            </motion.div>

            {/* Weekly Schedule */}
            <div className="space-y-4">
              {createWeeklySchedule(workoutPlan.workouts).map(
                (daySchedule, index) => (
                  <motion.div
                    key={daySchedule.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card
                      className={`p-6 ${
                        daySchedule.isRestDay
                          ? "bg-gradient-to-r from-slate-800/30 to-slate-900/30 border-slate-700/30"
                          : daySchedule.isToday
                            ? "bg-gradient-to-r from-green-900/60 to-blue-900/60 border-green-400/50 shadow-lg shadow-green-500/20"
                            : "bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">{daySchedule.emoji}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-bold text-white">
                                {daySchedule.day}
                              </h3>
                              {daySchedule.isToday && (
                                <span className="px-2 py-1 bg-green-500 text-black text-xs font-bold rounded-full">
                                  HOJE
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-400">
                              {daySchedule.date}
                            </p>
                          </div>
                        </div>

                        {daySchedule.isRestDay ? (
                          <div className="text-center">
                            <div className="text-2xl mb-1">😴</div>
                            <p className="text-sm text-gray-400">
                              Dia de Descanso
                            </p>
                          </div>
                        ) : (
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                              <span>⏱️ {daySchedule.workout?.duration}</span>
                              <span>•</span>
                              <span>
                                🔥 {daySchedule.workout?.calories} cal
                              </span>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                                daySchedule.workout?.difficulty === "Iniciante"
                                  ? "bg-green-500/20 text-green-400"
                                  : daySchedule.workout?.difficulty ===
                                      "Intermediário"
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {daySchedule.workout?.difficulty}
                            </div>
                          </div>
                        )}
                      </div>

                      {!daySchedule.isRestDay && (
                        <div className="mt-4 pt-4 border-t border-slate-700/50">
                          <h4 className="font-semibold text-white mb-2">
                            {daySchedule.workout?.name}
                          </h4>
                          <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                            {daySchedule.workout?.description}
                          </p>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-400 mb-1">
                                🎯 Grupos musculares:
                              </p>
                              <p className="text-xs text-gray-300">
                                {daySchedule.workout?.targetMuscles.join(", ")}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-1">
                                🏋️ Tipo:
                              </p>
                              <p className="text-xs text-gray-300">
                                {daySchedule.workout?.type}
                              </p>
                            </div>
                          </div>

                          <div className="border-t border-slate-700/50 pt-3">
                            <h5 className="text-sm font-medium text-white mb-2">
                              Exercícios (
                              {daySchedule.workout?.exercises.length}
                              ):
                            </h5>
                            <div className="space-y-1">
                              {daySchedule.workout?.exercises
                                .slice(0, 3)
                                .map((exercise: WorkoutExercise) => (
                                  <div
                                    key={exercise.id}
                                    className="text-xs text-gray-300 flex justify-between"
                                  >
                                    <span className="font-medium">
                                      {exercise.name}
                                    </span>
                                    <span className="text-gray-500">
                                      {exercise.sets}x {exercise.reps}
                                    </span>
                                  </div>
                                ))}
                              {daySchedule.workout &&
                                daySchedule.workout.exercises &&
                                daySchedule.workout.exercises.length > 3 && (
                                  <div className="text-xs text-gray-500">
                                    +{daySchedule.workout.exercises.length - 3}{" "}
                                    exercícios&hellip;
                                  </div>
                                )}
                            </div>
                          </div>

                          <div className="mt-4">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
                              Ver Treino Completo
                            </Button>
                          </div>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ),
              )}
            </div>

            {/* Actions */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/dashboard">
                <Button variant="outline">← Voltar ao Dashboard</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      );
    }

    // Fallback - plano ainda não gerado
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
                className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
              Preparando Seu Plano
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Com base na sua avaliação e desempenho no desafio, estamos criando
              um plano semanal personalizado.
            </p>
          </motion.div>

          {/* Loading Card */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card
              className="p-8 text-center bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30"
              glow
            >
              <div className="text-6xl mb-6">🤖</div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Gerando Plano Personalizado
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Analisando seus dados de avaliação e desafio para criar treinos
                perfeitos para seu nível e objetivos.
              </p>

              <Button
                onClick={generateWorkoutPlan}
                className="bg-blue-600 hover:bg-blue-700"
              >
                🚀 Gerar Plano Agora
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  } // Fallback
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <Card className="p-8 text-center">
        <div className="text-6xl mb-4">🔄</div>
        <h2 className="text-2xl font-bold text-white mb-4">Carregando...</h2>
        <Link href="/dashboard">
          <Button variant="outline">Voltar ao Dashboard</Button>
        </Link>
      </Card>
    </div>
  );
}
