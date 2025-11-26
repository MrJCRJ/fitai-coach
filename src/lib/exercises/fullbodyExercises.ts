import type { Exercise } from "./exerciseTypes";

export const fullbodyExercises: Exercise[] = [
  {
    id: "burpees",
    name: "Burpees",
    muscleGroup: "fullbody",
    difficulty: "intermediate",
    sets: 3,
    reps: "10-12",
    rest: "60s",
    instructions:
      "Do agachamento, chute os pés para trás, faça uma flexão e volte.",
    tips: "Mantenha o ritmo constante.",
    equipment: [],
    calories: 30,
  },
  {
    id: "mountain-climbers",
    name: "Mountain Climbers",
    muscleGroup: "fullbody",
    difficulty: "intermediate",
    sets: 3,
    reps: "30s",
    rest: "45s",
    instructions:
      "Em posição de prancha, alterne trazendo os joelhos ao peito.",
    tips: "Mantenha o core contraído.",
    equipment: [],
    calories: 25,
  },
];
