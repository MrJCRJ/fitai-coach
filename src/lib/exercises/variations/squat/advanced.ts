// ====================
// EXERCÍCIOS DE SQUAT - NÍVEL ADVANCED
// ====================

import type { Exercise } from "@/lib/exercises";
import { createSquatExercise } from "@/lib/exercises/variations/squat/utils/gamificationUtils";

export const advancedSquat: Record<number, Exercise> = {
  15: createSquatExercise(
    {
      id: "pistol_squat_assisted",
      name: "Pistol Squat Assisted → Full (Baixas Reps)",
      muscleGroup: "legs",
      difficulty: "advanced",
      sets: 4,
      reps: "3-5 por perna",
      rest: "180s",
      instructions:
        "Execute pistol squats com assistência (segurando em algo). Progrida para execução completa. Alterna pernas. Baixa repetição, alta qualidade.",
      tips: "Força unilateral máxima. Técnica perfeita obrigatória. Construa gradualmente.",
      equipment: ["Apoio para equilíbrio"],
      calories: 18,
    },
    15,
    600,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 1600,
        description: "Complete 1600 séries de exercícios avançados",
      },
    ],
    "advanced",
  ),

  16: createSquatExercise(
    {
      id: "shrimp_squat_assisted",
      name: "Shrimp Squat Assisted → Full",
      muscleGroup: "legs",
      difficulty: "advanced",
      sets: 4,
      reps: "4-6 por perna",
      rest: "180s",
      instructions:
        "Perna de trás pega pelo calcanhar. Comece assistido, progrida para completo. Alterna pernas. Controle excepcional necessário.",
      tips: "Equilíbrio e força unilateral. Técnica avançada. Construa pacientemente.",
      equipment: ["Apoio opcional"],
      calories: 16,
    },
    16,
    600,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 2000,
        description: "Complete 2000 séries de exercícios avançados",
      },
    ],
    "advanced",
  ),

  17: createSquatExercise(
    {
      id: "bulgarian_split_squat_full",
      name: "Bulgarian Split Squat (Completo)",
      muscleGroup: "legs",
      difficulty: "advanced",
      sets: 4,
      reps: "8-10 por perna",
      rest: "120s",
      instructions:
        "Pé traseiro elevado em banco. Execute squats completos sem assistência. Alterna pernas. Profundidade máxima.",
      tips: "Força unilateral pura. Equilíbrio perfeito. Construa força gradualmente.",
      equipment: ["Banco ou step"],
      calories: 14,
    },
    17,
    480,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 2400,
        description: "Complete 2400 séries de exercícios avançados",
      },
    ],
    "advanced",
  ),

  18: createSquatExercise(
    {
      id: "weighted_squat",
      name: "Weighted Squat (Mochila)",
      muscleGroup: "legs",
      difficulty: "advanced",
      sets: 4,
      reps: "8-12",
      rest: "150s",
      instructions:
        "Use mochila com peso nas costas. Execute air squats completos. Técnica impecável mesmo com carga.",
      tips: "Peso aumenta intensidade. Técnica perfeita obrigatória. Construa carga gradualmente.",
      equipment: ["Mochila com peso"],
      calories: 20,
    },
    18,
    480,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 2800,
        description: "Complete 2800 séries de exercícios avançados",
      },
    ],
    "advanced",
  ),

  19: createSquatExercise(
    {
      id: "deep_cossack_squat",
      name: "Cossack Squat Profundo",
      muscleGroup: "legs",
      difficulty: "advanced",
      sets: 4,
      reps: "6-8 por lado",
      rest: "120s",
      instructions:
        "Cossack squat com profundidade máxima. Glúteo toca o calcanhar. Mobilidade lateral extrema. Alterna lados.",
      tips: "Mobilidade excepcional. Construa amplitude gradualmente. Core contraído.",
      equipment: ["Nenhum"],
      calories: 13,
    },
    19,
    360,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 3200,
        description: "Complete 3200 séries de exercícios avançados",
      },
    ],
    "advanced",
  ),

  20: createSquatExercise(
    {
      id: "archer_squat_assisted",
      name: "Archer Squat Assisted (Transferência Lateral)",
      muscleGroup: "legs",
      difficulty: "advanced",
      sets: 4,
      reps: "4-6 por lado",
      rest: "180s",
      instructions:
        "Pés afastados. Transfira peso lateralmente para um lado, desça em squat unilateral. Use assistência inicial. Alterna lados.",
      tips: "Transferência de peso controlada. Força unilateral avançada. Técnica complexa.",
      equipment: ["Apoio para equilíbrio"],
      calories: 15,
    },
    20,
    600,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 3600,
        description: "Complete 3600 séries de exercícios avançados",
      },
    ],
    "advanced",
  ),

  21: createSquatExercise(
    {
      id: "elevated_heel_deep_squat",
      name: "Elevated-heel Deep Squat (Mobilidade Extrema)",
      muscleGroup: "legs",
      difficulty: "advanced",
      sets: 4,
      reps: "8-10",
      rest: "120s",
      instructions:
        "Calcanhares elevados significativamente. Execute squats com profundidade extrema. Mobilidade de tornozelo excepcional.",
      tips: "Mobilidade máxima. Profundidade extrema. Construa gradualmente para evitar lesões.",
      equipment: ["Plataforma elevada"],
      calories: 12,
    },
    21,
    360,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 4000,
        description: "Complete 4000 séries de exercícios avançados",
      },
    ],
    "advanced",
  ),

  22: createSquatExercise(
    {
      id: "explosive_squat_broad_hop",
      name: "Explosive Squat to Broad Hop (Quique Frontal)",
      muscleGroup: "legs",
      difficulty: "advanced",
      sets: 4,
      reps: "6-8",
      rest: "150s",
      instructions:
        "Execute squat, exploda em salto frontal. Aterrisse de volta em posição de squat. Controle e potência máxima.",
      tips: "Potência horizontal. Controle no pouso. Técnica perfeita evita lesões.",
      equipment: ["Nenhum"],
      calories: 22,
    },
    22,
    480,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 4400,
        description: "Complete 4400 séries de exercícios avançados",
      },
    ],
    "advanced",
  ),
};
