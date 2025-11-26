"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import LoadingState from "@/components/ui/LoadingState";
import ErrorState from "@/components/ui/ErrorState";
import {
  ChallengeWorkout,
  ChallengeExercise,
  ChallengeResult,
  defaultChallengeWorkout,
  saveChallengeResults,
  savePersonalizedChallenge,
  loadPersonalizedChallenge,
} from "@/lib/challengeWorkout";
import { getAssessmentAnswers } from "@/lib/workoutGenerator";
import {
  detectExerciseType,
  extractTimeLimit,
  formatExerciseTarget,
  extractMeasurementUnit,
} from "@/lib/exerciseUtils";
import { useExerciseState } from "@/hooks/useExerciseState";

interface ChallengeWorkoutModalProps {
  isOpen: boolean;
  onComplete: (results: ChallengeResult[]) => void;
  onClose: () => void;
}

export default function ChallengeWorkoutModal({
  isOpen,
  onComplete,
  onClose,
}: ChallengeWorkoutModalProps) {
  const [workout, setWorkout] = useState<ChallengeWorkout | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    currentExercise,
    results,
    isResting,
    restTimeLeft,
    isPerforming,
    currentResult,
    exerciseTimeLeft,
    exercise,
    startExercise,
    skipExercise,
    finishExercise,
    handleRestComplete,
    updateDifficulty,
    setCurrentResult,
  } = useExerciseState({
    workout,
    onExerciseComplete: (result) => {
      const newResults = [...results, result];
      saveChallengeResults(newResults);
      onComplete(newResults);
    },
  });

  // Carregar desafio personalizado quando o modal abrir
  useEffect(() => {
    if (isOpen && !workout) {
      loadChallengeAsync();
    }
  }, [isOpen, workout]);

  const loadChallengeAsync = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Primeiro tentar carregar desafio personalizado salvo
      const savedChallenge = loadPersonalizedChallenge();
      if (savedChallenge) {
        setWorkout(savedChallenge);
        setIsLoading(false);
        return;
      }

      // Se não houver desafio salvo, gerar um novo
      const profile = getAssessmentAnswers();
      if (!profile) {
        throw new Error("Perfil de avaliação não encontrado");
      }

      const response = await fetch("/api/challenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profile }),
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar desafio personalizado");
      }

      const data = await response.json();

      // Processar exercícios para detectar tipos automaticamente
      const processedExercises = data.challenge.exercises.map(
        (exercise: ChallengeExercise) => {
          const detectedType = detectExerciseType(exercise);
          const timeLimit = extractTimeLimit(exercise.target);
          const measurementUnit = extractMeasurementUnit(exercise.target);

          return {
            ...exercise,
            type: detectedType,
            timeLimit,
            measurementUnit,
          };
        },
      );

      const processedChallenge = {
        ...data.challenge,
        exercises: processedExercises,
      };

      setWorkout(processedChallenge);

      // Salvar o desafio gerado para uso futuro
      savePersonalizedChallenge(processedChallenge);
    } catch (err) {
      console.error("Erro ao carregar desafio:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      // Fallback para desafio padrão
      setWorkout(defaultChallengeWorkout);
      savePersonalizedChallenge(defaultChallengeWorkout);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="p-6 bg-slate-900 border-slate-700">
          {/* Loading State */}
          {isLoading && (
            <LoadingState
              title="Criando seu desafio personalizado..."
              message="Nossa IA está analisando seu perfil para criar um teste perfeito para você."
              emoji="🤖"
            />
          )}

          {/* Error State */}
          {error && !isLoading && (
            <ErrorState
              title="Erro ao carregar desafio"
              message={error}
              emoji="⚠️"
              onRetry={loadChallengeAsync}
              retryLabel="Tentar Novamente"
              onAlternative={() => {
                setWorkout(defaultChallengeWorkout);
                setError(null);
              }}
              alternativeLabel="Usar Desafio Padrão"
            />
          )}

          {/* Challenge Content */}
          {!isLoading && !error && workout && (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  🏋️ {workout.name}
                </h2>
                <p className="text-gray-300">
                  Exercício {currentExercise + 1} de {workout.exercises.length}
                </p>
                <div className="flex justify-center mt-4">
                  {workout.exercises.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full mx-1 ${
                        index < currentExercise
                          ? "bg-green-500"
                          : index === currentExercise
                            ? "bg-blue-500"
                            : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Rest Screen */}
              {isResting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-6xl mb-4">⏱️</div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    Tempo de Descanso
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Descanse o tempo que precisar
                  </p>

                  {/* Timer crescente */}
                  <div className="mb-6">
                    <div className="text-4xl font-mono text-green-400 mb-2">
                      {restTimeLeft}s
                    </div>
                    <p className="text-sm text-gray-400">tempo decorrido</p>
                  </div>

                  <Button
                    onClick={handleRestComplete}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    ➡️ Próximo Exercício
                  </Button>

                  <p className="text-xs text-gray-400 mt-4">
                    Vá para o próximo exercício quando estiver pronto
                  </p>
                </motion.div>
              )}

              {/* Exercise Screen */}
              {!isResting && exercise && (
                <div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {exercise.name}
                    </h3>
                    <Badge variant="info" className="mb-4">
                      {formatExerciseTarget(exercise.target)}
                    </Badge>
                    <p className="text-gray-300 leading-relaxed">
                      {exercise.instructions}
                    </p>
                  </div>

                  {/* Performing State */}
                  {isPerforming && (
                    <div className="text-center mb-6">
                      {/* Timer descendente para exercícios com tempo limitado */}
                      {exercise &&
                        detectExerciseType(exercise) === "timed_max_effort" &&
                        exerciseTimeLeft > 0 && (
                          <div className="mb-6">
                            <div className="text-4xl font-mono text-red-400 mb-2">
                              {exerciseTimeLeft >= 60
                                ? `${Math.floor(exerciseTimeLeft / 60)}:${(exerciseTimeLeft % 60).toString().padStart(2, "0")}`
                                : `${Math.floor(exerciseTimeLeft / 60)}:${(exerciseTimeLeft % 60).toString().padStart(2, "0")}`}
                            </div>
                            <p className="text-sm text-gray-400">
                              Tempo restante
                            </p>
                          </div>
                        )}

                      {/* Timer crescente para exercícios de tempo */}
                      {exercise && detectExerciseType(exercise) === "time" && (
                        <div className="text-4xl font-mono text-green-400 mb-4">
                          {currentResult.completedTime || 0}s
                        </div>
                      )}

                      <div className="mb-6">
                        <p className="text-gray-300 mb-3">
                          Quando terminar, avalie a dificuldade:
                        </p>
                        <div className="flex justify-center gap-2">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <button
                              key={level}
                              onClick={() =>
                                updateDifficulty(level as 1 | 2 | 3 | 4 | 5)
                              }
                              className={`w-10 h-10 rounded-full border-2 ${
                                currentResult.perceivedDifficulty === level
                                  ? "border-blue-500 bg-blue-500/20 text-blue-300"
                                  : "border-gray-600 text-gray-400 hover:border-gray-500"
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          1=Muito fácil • 5=Muito difícil
                        </p>
                      </div>

                      <Button
                        onClick={finishExercise}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {exercise &&
                        detectExerciseType(exercise) === "timed_max_effort"
                          ? "Finalizar"
                          : "Terminei!"}
                      </Button>
                    </div>
                  )}

                  {/* Ready State */}
                  {!isPerforming && (
                    <div className="text-center">
                      <div className="text-6xl mb-6">💪</div>
                      <p className="text-gray-300 mb-6">
                        Você consegue executar este exercício? Se não conseguir,
                        pode pular para o próximo.
                      </p>

                      <div className="space-y-4">
                        <Button
                          onClick={startExercise}
                          className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
                        >
                          ▶️ Sim, consigo fazer
                        </Button>

                        <Button
                          onClick={skipExercise}
                          variant="outline"
                          className="border-orange-600 text-orange-300 hover:bg-orange-600/20"
                        >
                          ❌ Não consigo fazer
                        </Button>

                        <Button
                          variant="outline"
                          onClick={onClose}
                          className="border-gray-600 text-gray-300"
                        >
                          Cancelar Desafio
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Input for reps */}
                  {isPerforming &&
                    exercise &&
                    detectExerciseType(exercise) === "max_effort" && (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Quantas repetições você conseguiu?
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={currentResult.completedReps || ""}
                          onChange={(e) =>
                            setCurrentResult((prev) => ({
                              ...prev,
                              completedReps: parseInt(e.target.value) || 0,
                            }))
                          }
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-center text-xl"
                          placeholder="0"
                        />
                      </div>
                    )}

                  {/* Input for timed max effort reps */}
                  {isPerforming &&
                    exercise &&
                    detectExerciseType(exercise) === "timed_max_effort" && (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Quantas repetições você conseguiu?
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={currentResult.completedReps || ""}
                          onChange={(e) =>
                            setCurrentResult((prev) => ({
                              ...prev,
                              completedReps: parseInt(e.target.value) || 0,
                            }))
                          }
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-center text-xl"
                          placeholder="0"
                        />
                      </div>
                    )}

                  {/* Input for measurements */}
                  {isPerforming &&
                    exercise &&
                    detectExerciseType(exercise) === "measurement" && (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Qual foi a medição?
                          {extractMeasurementUnit(exercise.target) && (
                            <span className="text-gray-400 ml-1">
                              ({extractMeasurementUnit(exercise.target)})
                            </span>
                          )}
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={currentResult.measuredValue || ""}
                          onChange={(e) =>
                            setCurrentResult((prev) => ({
                              ...prev,
                              measuredValue: parseFloat(e.target.value) || 0,
                            }))
                          }
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-center text-xl"
                          placeholder="0"
                        />
                      </div>
                    )}
                </div>
              )}

              {/* Results Summary */}
              {results.length > 0 &&
                currentExercise >= workout.exercises.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-6"
                  >
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      Desafio Concluído!
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Agora vamos analisar seus resultados para criar o treino
                      perfeito.
                    </p>
                  </motion.div>
                )}
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
