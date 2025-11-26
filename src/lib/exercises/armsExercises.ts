import type { Exercise } from "./exerciseTypes";

export const armsExercises: Exercise[] = [
  {
    id: "arm-circles",
    name: "Círculos de Braços",
    muscleGroup: "arms",
    difficulty: "beginner",
    sets: 3,
    reps: "15 cada direção",
    rest: "45s",
    instructions: "Faça círculos com os braços estendidos.",
    tips: "Mantenha os braços retos e os movimentos controlados.",
    equipment: [],
    calories: 4,
  },
  {
    id: "diamond-push-up",
    name: "Flexão Diamante",
    muscleGroup: "arms",
    difficulty: "intermediate",
    sets: 3,
    reps: "8-12",
    rest: "75s",
    instructions: "Junte as mãos formando um diamante e faça flexões.",
    tips: "Foca mais nos tríceps.",
    equipment: [],
    calories: 9,
  },
  {
    id: "tricep-dips",
    name: "Mergulho de Tríceps",
    muscleGroup: "arms",
    difficulty: "intermediate",
    sets: 3,
    reps: "8-12",
    rest: "75s",
    instructions:
      "Apoie as mãos atrás do corpo e desça abaixando os cotovelos.",
    tips: "Mantenha os cotovelos apontando para trás.",
    equipment: [],
    calories: 8,
  },
];
