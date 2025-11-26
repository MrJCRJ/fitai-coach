import type { Exercise } from "./exerciseTypes";

export const shouldersExercises: Exercise[] = [
  {
    id: "shoulder-taps",
    name: "Toque nos Ombros",
    muscleGroup: "shoulders",
    difficulty: "beginner",
    sets: 3,
    reps: "20",
    rest: "45s",
    instructions:
      "Em posição de prancha, toque alternadamente nos ombros opostos.",
    tips: "Mantenha o core contraído e os quadris estáveis.",
    equipment: [],
    calories: 6,
  },
  {
    id: "pike-push-up",
    name: "Flexão Pike",
    muscleGroup: "shoulders",
    difficulty: "intermediate",
    sets: 3,
    reps: "6-10",
    rest: "75s",
    instructions: "Em posição de prancha, eleve os quadris e faça flexões.",
    tips: "Foca nos ombros anteriores.",
    equipment: [],
    calories: 8,
  },
];
