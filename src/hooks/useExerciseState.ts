import { useState, useEffect, useCallback } from "react";
import type { ChallengeResult, ChallengeWorkout } from "@/lib/challengeWorkout";
import { detectExerciseType, extractTimeLimit } from "@/lib/exerciseUtils";

interface UseExerciseStateProps {
  workout: ChallengeWorkout | null;
  onExerciseComplete: (result: ChallengeResult) => void;
}

export function useExerciseState({
  workout,
  onExerciseComplete,
}: UseExerciseStateProps) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [results, setResults] = useState<ChallengeResult[]>([]);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [restStartTime, setRestStartTime] = useState<number | null>(null);
  const [isPerforming, setIsPerforming] = useState(false);
  const [currentResult, setCurrentResult] = useState<Partial<ChallengeResult>>(
    {}
  );
  const [exerciseTimeLeft, setExerciseTimeLeft] = useState(0);
  const [exerciseStartTime, setExerciseStartTime] = useState<number | null>(
    null
  );

  const exercise = workout?.exercises[currentExercise];

  const finishExercise = useCallback(() => {
    if (!exercise) return;

    setIsPerforming(false);

    // Calcular tempo realmente usado para exercícios timed_max_effort
    let timeUsed: number | undefined;
    const exerciseType = detectExerciseType(exercise);
    if (exerciseType === "timed_max_effort" && exerciseStartTime) {
      const timeLimit = extractTimeLimit(exercise.target);
      if (timeLimit) {
        timeUsed = timeLimit - exerciseTimeLeft;
      }
    }

    setExerciseTimeLeft(0);
    setExerciseStartTime(null);

    const finalResult: ChallengeResult = {
      ...currentResult,
      perceivedDifficulty: currentResult.perceivedDifficulty || 3,
    } as ChallengeResult;

    // Adicionar timeUsed apenas se tiver valor
    if (timeUsed !== undefined) {
      finalResult.timeUsed = timeUsed;
    }

    const newResults = [...results, finalResult];
    setResults(newResults);

    // Se não é o último exercício, mostrar tela de descanso
    if (currentExercise < (workout?.exercises.length ?? 0) - 1) {
      setIsResting(true);
      setRestTimeLeft(0); // Começar a contar do zero
      setRestStartTime(Date.now());
    } else {
      // Finalizar desafio
      onExerciseComplete(finalResult);
    }
  }, [
    exercise,
    exerciseStartTime,
    exerciseTimeLeft,
    currentResult,
    results,
    currentExercise,
    workout,
    onExerciseComplete,
  ]);
  // Timer para descanso (contagem crescente)
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isResting) {
      interval = setInterval(() => {
        setRestTimeLeft((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isResting]);

  // Timer para exercício com tempo limitado
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPerforming && exercise && exerciseTimeLeft > 0) {
      const exerciseType = detectExerciseType(exercise);
      if (exerciseType === "timed_max_effort") {
        interval = setInterval(() => {
          setExerciseTimeLeft((prev) => {
            if (prev <= 1) {
              // Tempo acabou, finalizar exercício
              finishExercise();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }

    return () => clearInterval(interval);
  }, [isPerforming, exercise, exerciseTimeLeft, finishExercise]);

  // Timer para exercício de tempo (contagem crescente)
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPerforming && exercise) {
      const exerciseType = detectExerciseType(exercise);
      if (exerciseType === "time") {
        interval = setInterval(() => {
          const elapsed = exerciseStartTime
            ? Math.floor((Date.now() - exerciseStartTime) / 1000)
            : 0;
          setCurrentResult((prev) => ({
            ...prev,
            completedTime: elapsed,
          }));
        }, 1000);
      }
    }

    return () => clearInterval(interval);
  }, [isPerforming, exercise, exerciseStartTime]);

  const startExercise = () => {
    if (!exercise) return;

    const exerciseType = detectExerciseType(exercise);
    const timeLimit = extractTimeLimit(exercise.target);

    setIsPerforming(true);
    setExerciseStartTime(Date.now());

    // Configurar timer para exercícios com tempo limitado
    if (exerciseType === "timed_max_effort" && timeLimit) {
      setExerciseTimeLeft(timeLimit);
      setCurrentResult({
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        perceivedDifficulty: 3,
        canPerform: true,
        timeLimit,
      });
    } else {
      setCurrentResult({
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        perceivedDifficulty: 3,
        canPerform: true,
      });
    }
  };

  const skipExercise = () => {
    if (!exercise) return;

    // Calcular tempo realmente usado para exercícios timed_max_effort
    let timeUsed: number | undefined;
    const exerciseType = detectExerciseType(exercise);
    if (exerciseType === "timed_max_effort" && exerciseStartTime) {
      const timeLimit = extractTimeLimit(exercise.target);
      if (timeLimit) {
        timeUsed = timeLimit - exerciseTimeLeft;
      }
    }

    const skipResult: Partial<ChallengeResult> = {
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      perceivedDifficulty: 5, // dificuldade máxima se não consegue fazer
      canPerform: false,
      skipReason: "Não consigo executar este exercício",
    };

    if (timeUsed !== undefined) {
      skipResult.timeUsed = timeUsed;
    }

    setCurrentResult(skipResult);

    // Pular diretamente para o próximo exercício
    finishExercise();
  };

  const nextExercise = () => {
    setCurrentExercise((prev) => prev + 1);
    setCurrentResult({});
    setIsPerforming(false);
    setExerciseTimeLeft(0);
    setExerciseStartTime(null);
    setIsResting(false);
    setRestTimeLeft(0);
    setRestStartTime(null);
  };

  const handleRestComplete = () => {
    // Calcular tempo de descanso
    const restDuration = restStartTime
      ? Math.floor((Date.now() - restStartTime) / 1000)
      : 0;

    setIsResting(false);
    setRestStartTime(null);

    // Adicionar tempo de descanso ao próximo resultado
    setCurrentResult((prev) => ({
      ...prev,
      restTime: restDuration,
    }));

    nextExercise();
  };

  const updateDifficulty = (difficulty: 1 | 2 | 3 | 4 | 5) => {
    setCurrentResult((prev) => ({ ...prev, perceivedDifficulty: difficulty }));
  };

  return {
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
    nextExercise,
    handleRestComplete,
    updateDifficulty,
    setCurrentResult,
  };
}
