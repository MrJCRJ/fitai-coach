// ====================
// EXERCÍCIOS DE SQUAT - NÍVEL BEGINNER
// ====================

import type { Exercise } from "@/lib/exercises";
import { createSquatExercise } from "@/lib/exercises/variations/squat/utils/gamificationUtils";

export const beginnerSquat: Record<number, Exercise> = {
  1: createSquatExercise(
    {
      id: "wall_sit",
      name: "Wall Sit (Isometria na Parede)",
      muscleGroup: "legs",
      difficulty: "beginner",
      sets: 3,
      reps: "20-45s",
      rest: "60s",
      instructions:
        "Encoste as costas na parede, desça até os joelhos formarem 90°. Mantenha a posição isométrica. Não force além do confortável.",
      tips: "Mantenha as costas coladas na parede. Pés afastados na largura dos ombros. Construa força base gradualmente.",
      equipment: ["Parede"],
      calories: 6,
    },
    1,
    180,
    undefined,
    "beginner",
  ),

  2: createSquatExercise(
    {
      id: "chair_box_squat_high",
      name: "Chair/Box Squat (Cadeira Alta)",
      muscleGroup: "legs",
      difficulty: "beginner",
      sets: 3,
      reps: "8-12",
      rest: "90s",
      instructions:
        "Use uma cadeira ou caixa alta. Desça até tocar levemente o assento, então levante. Mantenha o controle total.",
      tips: "Use altura que permita profundidade confortável. Construa confiança na técnica. Foque no equilíbrio.",
      equipment: ["Cadeira ou caixa alta"],
      calories: 8,
    },
    2,
    240,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 10,
        description: "Complete 10 séries de exercícios básicos",
      },
    ],
    "beginner",
  ),

  3: createSquatExercise(
    {
      id: "assisted_squat_hold",
      name: "Assisted Squat Hold (Apoio na Parede)",
      muscleGroup: "legs",
      difficulty: "beginner",
      sets: 3,
      reps: "15-30s",
      rest: "60s",
      instructions:
        "Segure na parede ou móvel para apoio. Desça até posição de squat parcial e mantenha. Use os braços para assistência.",
      tips: "Use apoio apenas o necessário. Construa força gradualmente. Mantenha core contraído.",
      equipment: ["Parede ou móvel para apoio"],
      calories: 7,
    },
    3,
    180,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 25,
        description: "Complete 25 séries de exercícios básicos",
      },
    ],
    "beginner",
  ),

  4: createSquatExercise(
    {
      id: "partial_squat",
      name: "Partial Squat (½ Profundidade)",
      muscleGroup: "legs",
      difficulty: "beginner",
      sets: 3,
      reps: "10-15",
      rest: "60s",
      instructions:
        "Execute squats parciais - desça apenas até a metade da profundidade completa. Mantenha velocidade controlada.",
      tips: "Foque na técnica perfeita. Construa força base. Prepare-se para profundidade completa gradualmente.",
      equipment: ["Nenhum"],
      calories: 8,
    },
    4,
    180,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 50,
        description: "Complete 50 séries de exercícios básicos",
      },
    ],
    "beginner",
  ),

  5: createSquatExercise(
    {
      id: "air_squat",
      name: "Air Squat (Agachamento Livre)",
      muscleGroup: "legs",
      difficulty: "beginner",
      sets: 3,
      reps: "8-12",
      rest: "90s",
      instructions:
        "Execute squats completos sem equipamento. Desça até os glúteos ficarem abaixo dos joelhos. Mantenha peito ereto.",
      tips: "Pés afastados na largura dos ombros. Joelhos acompanham os pés. Profundidade máxima confortável.",
      equipment: ["Nenhum"],
      calories: 9,
    },
    5,
    240,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 75,
        description: "Complete 75 séries de exercícios básicos",
      },
    ],
    "beginner",
  ),

  6: createSquatExercise(
    {
      id: "tempo_air_squat",
      name: "Tempo Air Squat (Cadência Lenta)",
      muscleGroup: "legs",
      difficulty: "beginner",
      sets: 3,
      reps: "6-10",
      rest: "90s",
      instructions:
        "Execute air squats com cadência 3-1-3 (3s descendo, 1s pausa embaixo, 3s subindo). Controle total do movimento.",
      tips: "Movimento lento constrói força isométrica. Mantenha tensão constante. Técnica perfeita é prioridade.",
      equipment: ["Nenhum"],
      calories: 10,
    },
    6,
    300,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 100,
        description: "Complete 100 séries de exercícios básicos",
      },
    ],
    "beginner",
  ),
};
