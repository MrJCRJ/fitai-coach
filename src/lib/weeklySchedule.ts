import type { Workout } from "@/lib/ai/types";

export interface WeeklyScheduleItem {
  day: string;
  date: string;
  fullDate: Date;
  dayOfWeek: number;
  emoji: string;
  workout: Workout | null;
  isRestDay: boolean;
  isToday: boolean;
}

/**
 * Cria cronograma semanal com dias específicos baseado na data atual
 */
export function createWeeklySchedule(
  workouts: Workout[],
): WeeklyScheduleItem[] {
  const today = new Date();
  const daysOfWeek = [];

  // Criar array dos próximos 7 dias
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayNames = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    const emojis = ["🌅", "🌅", "�", "�🔥", "⚡", "🚀", "🎯"];

    daysOfWeek.push({
      day: dayNames[date.getDay()] || "Dia",
      date: date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
      fullDate: date,
      dayOfWeek: date.getDay(),
      emoji: emojis[date.getDay()] || "📅",
    });
  }

  // Distribuir treinos pelos dias (3 treinos por semana: seg, qua, sex)
  // Mas ajustado baseado no dia atual
  const workoutDays = [1, 3, 5]; // segunda, quarta, sexta (índices 1, 3, 5)

  return daysOfWeek.map((dayInfo, index) => {
    // Verificar se este dia deve ter treino baseado no dia da semana
    const shouldHaveWorkout = workoutDays.includes(dayInfo.dayOfWeek);
    const workoutIndex = shouldHaveWorkout
      ? workoutDays.indexOf(dayInfo.dayOfWeek)
      : -1;
    const workout =
      workoutIndex !== -1 && workoutIndex < workouts.length
        ? workouts[workoutIndex]
        : null;

    return {
      ...dayInfo,
      workout: workout || null,
      isRestDay: !workout,
      isToday: index === 0,
    };
  });
}
