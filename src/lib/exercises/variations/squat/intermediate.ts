// ====================
// EXERCÍCIOS DE SQUAT - NÍVEL INTERMEDIATE
// ====================

import { Exercise } from "../../types";
import { createSquatExerciseWithGamification } from "./utils/gamificationUtils";

export const intermediateSquat: Record<number, Exercise> = {
  7: createSquatExerciseWithGamification(
    {
      id: "full_air_squat",
      name: "Full Air Squat (Profundidade Completa)",
      muscleGroup: "legs",
      difficulty: "intermediate",
      sets: 4,
      reps: "10-15",
      rest: "90s",
      instructions:
        "Execute air squats com profundidade completa - glúteos abaixo dos joelhos. Mantenha peito ereto e core contraído.",
      tips: "Profundidade máxima. Joelhos acompanham os pés. Construa mobilidade gradualmente.",
      equipment: ["Nenhum"],
      calories: 12,
    },
    7,
    35,
    300,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 200,
        description: "Complete 200 séries de exercícios intermediários",
      },
    ],
    undefined,
    "intermediate"
  ),

  8: createSquatExerciseWithGamification(
    {
      id: "pause_squat",
      name: "Pause Squat (Pausa em Baixo)",
      muscleGroup: "legs",
      difficulty: "intermediate",
      sets: 4,
      reps: "6-10",
      rest: "120s",
      instructions:
        "Execute air squat, pause por 1-2 segundos na posição mais baixa, então levante. Construa força isométrica.",
      tips: "Pausa aumenta força na posição mais fraca. Mantenha tensão. Controle perfeito.",
      equipment: ["Nenhum"],
      calories: 11,
    },
    8,
    32,
    360,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 250,
        description: "Complete 250 séries de exercícios intermediários",
      },
    ],
    undefined,
    "intermediate"
  ),

  9: createSquatExerciseWithGamification(
    {
      id: "low_chair_box_squat",
      name: "Low Chair/Box Squat (Cadeira Baixa)",
      muscleGroup: "legs",
      difficulty: "intermediate",
      sets: 4,
      reps: "8-12",
      rest: "90s",
      instructions:
        "Use cadeira ou caixa baixa. Desça até tocar o assento completamente. Foque em profundidade e controle.",
      tips: "Altura baixa aumenta amplitude. Construa força gradualmente. Técnica impecável.",
      equipment: ["Cadeira ou caixa baixa"],
      calories: 10,
    },
    9,
    30,
    300,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 300,
        description: "Complete 300 séries de exercícios intermediários",
      },
    ],
    undefined,
    "intermediate"
  ),

  10: createSquatExerciseWithGamification(
    {
      id: "cossack_squat",
      name: "Cossack Squat (Lateral)",
      muscleGroup: "legs",
      difficulty: "intermediate",
      sets: 4,
      reps: "6-8 por lado",
      rest: "90s",
      instructions:
        "Pés mais largos que ombros. Peso vai para um lado, joelho acompanha. Pernas oposta estendida. Alterna lados.",
      tips: "Mobilidade lateral excepcional. Construa amplitude gradualmente. Core contraído.",
      equipment: ["Nenhum"],
      calories: 9,
    },
    10,
    28,
    300,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 400,
        description: "Complete 400 séries de exercícios intermediários",
      },
    ],
    undefined,
    "intermediate"
  ),

  11: createSquatExerciseWithGamification(
    {
      id: "bulgarian_split_squat_assisted",
      name: "Bulgarian Split Squat Assisted → Full",
      muscleGroup: "legs",
      difficulty: "intermediate",
      sets: 4,
      reps: "6-8 por perna",
      rest: "120s",
      instructions:
        "Pé traseiro elevado. Comece com assistência (segurando em algo), progrida para execução completa. Alterna pernas.",
      tips: "Construa força unilateral. Comece assistido. Foque em equilíbrio e profundidade.",
      equipment: ["Banco ou step", "Apoio opcional"],
      calories: 11,
    },
    11,
    35,
    360,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 500,
        description: "Complete 500 séries de exercícios intermediários",
      },
    ],
    undefined,
    "intermediate"
  ),

  12: createSquatExerciseWithGamification(
    {
      id: "jump_squat",
      name: "Jump Squat (Explosão Controlada)",
      muscleGroup: "legs",
      difficulty: "intermediate",
      sets: 4,
      reps: "8-12",
      rest: "120s",
      instructions:
        "Execute squat, então exploda para cima em salto. Aterrisse suavemente de volta na posição de squat. Controle total.",
      tips: "Potência explosiva. Aterrisse suavemente. Não sacuda - controle é prioridade.",
      equipment: ["Nenhum"],
      calories: 15,
    },
    12,
    40,
    360,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 600,
        description: "Complete 600 séries de exercícios intermediários",
      },
    ],
    undefined,
    "intermediate"
  ),

  13: createSquatExerciseWithGamification(
    {
      id: "180_jump_squat",
      name: "180° Jump Squat (Meia Rotação)",
      muscleGroup: "legs",
      difficulty: "intermediate",
      sets: 4,
      reps: "6-8",
      rest: "120s",
      instructions:
        "Execute jump squat, gire 180° no ar, aterrisse voltado para o lado oposto. Coordenação e controle excepcionais.",
      tips: "Coordenação máxima. Controle o pouso. Técnica perfeita evita lesões.",
      equipment: ["Nenhum"],
      calories: 16,
    },
    13,
    42,
    360,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 700,
        description: "Complete 700 séries de exercícios intermediários",
      },
    ],
    undefined,
    "intermediate"
  ),

  14: createSquatExerciseWithGamification(
    {
      id: "heel_elevated_squat",
      name: "Squat com Elevação de Calcanhar",
      muscleGroup: "legs",
      difficulty: "intermediate",
      sets: 4,
      reps: "10-12",
      rest: "90s",
      instructions:
        "Coloque calcanhares elevados (em peso ou step baixo). Execute air squats. Melhora mobilidade de tornozelo.",
      tips: "Mobilidade de tornozelo. Profundidade aumentada. Construa força gradualmente.",
      equipment: ["Peso ou step baixo"],
      calories: 10,
    },
    14,
    30,
    300,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 800,
        description: "Complete 800 séries de exercícios intermediários",
      },
    ],
    undefined,
    "intermediate"
  ),
};
