import { useState, useEffect, useCallback } from "react";

interface WindowWithTimers {
  timerIntervals?: Record<string, NodeJS.Timeout>;
}

export function useWorkoutTimers() {
  const [timers, setTimers] = useState<{ [key: string]: number }>({});
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);

  // Timer para o tempo total do treino
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (workoutStartTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor(
          (Date.now() - workoutStartTime.getTime()) / 1000,
        );
        setTotalWorkoutTime(elapsed);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [workoutStartTime]);

  // Timer para descanso
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isResting) {
      interval = setInterval(() => {
        setRestTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isResting]);

  // Iniciar timer de exercício
  const startTimer = useCallback(
    (exerciseId: string) => {
      if (activeTimer) return; // Só um timer por vez

      setActiveTimer(exerciseId);
      setTimers((prev) => ({ ...prev, [exerciseId]: 0 }));

      // Parar descanso quando iniciar exercício
      setIsResting(false);
      setRestTime(0);

      const interval = setInterval(() => {
        setTimers((prev) => {
          const newTime = (prev[exerciseId] || 0) + 1;
          return { ...prev, [exerciseId]: newTime };
        });
      }, 1000);

      // Salvar interval para limpar depois
      const windowWithTimers = window as WindowWithTimers;
      const timerIntervals = windowWithTimers.timerIntervals || {};
      timerIntervals[exerciseId] = interval;
      windowWithTimers.timerIntervals = timerIntervals;
    },
    [activeTimer],
  );

  // Parar timer de exercício
  const stopTimer = useCallback((exerciseId: string) => {
    const windowWithTimers = window as WindowWithTimers;
    const timerIntervals = windowWithTimers.timerIntervals || {};
    if (timerIntervals[exerciseId]) {
      clearInterval(timerIntervals[exerciseId]);
      delete timerIntervals[exerciseId];
      windowWithTimers.timerIntervals = timerIntervals;
    }
    setActiveTimer(null);
  }, []);

  // Iniciar descanso
  const startRest = useCallback(() => {
    setRestTime(0);
    setIsResting(true);
  }, []);

  // Finalizar descanso
  const finishRest = useCallback(() => {
    setIsResting(false);
    setRestTime(0);
  }, []);

  // Iniciar treino
  const startWorkout = useCallback(() => {
    setWorkoutStartTime(new Date());
    setTotalWorkoutTime(0);
  }, []);

  // Resetar todos os timers
  const resetTimers = useCallback(() => {
    // Limpar todos os intervals
    const windowWithTimers = window as WindowWithTimers;
    const timerIntervals = windowWithTimers.timerIntervals || {};
    Object.values(timerIntervals).forEach(clearInterval);
    windowWithTimers.timerIntervals = {};

    setTimers({});
    setActiveTimer(null);
    setWorkoutStartTime(null);
    setTotalWorkoutTime(0);
    setRestTime(0);
    setIsResting(false);
  }, []);

  return {
    // Estados
    timers,
    activeTimer,
    workoutStartTime,
    totalWorkoutTime,
    restTime,
    isResting,

    // Ações
    startTimer,
    stopTimer,
    startRest,
    finishRest,
    startWorkout,
    resetTimers,
  };
}
