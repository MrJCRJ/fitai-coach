// ====================
// EXERCÍCIOS DE SQUAT - NÍVEL EXTREME
// ====================

import { Exercise } from "../../types";
import { createSquatExerciseWithGamification } from "./utils/gamificationUtils";

export const extremeSquat: Record<number, Exercise> = {
  23: createSquatExerciseWithGamification(
    {
      id: "pistol_squat_full",
      name: "Pistol Squat Full (5-10 Reps)",
      muscleGroup: "legs",
      difficulty: "extreme",
      sets: 4,
      reps: "5-10 por perna",
      rest: "240s",
      instructions:
        "Execute pistol squats completos sem assistência. Técnica perfeita, força unilateral máxima. Alterna pernas.",
      tips: "Força sobre-humana. Técnica impecável obrigatória. Movimento lendário da calistenia.",
      equipment: ["Nenhum"],
      calories: 25,
    },
    23,
    100,
    720,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 6400,
        description: "Complete 6400 séries de exercícios extremos",
      },
    ],
    undefined,
    "extreme"
  ),

  24: createSquatExerciseWithGamification(
    {
      id: "shrimp_squat_full",
      name: "Shrimp Squat Full",
      muscleGroup: "legs",
      difficulty: "extreme",
      sets: 4,
      reps: "6-8 por perna",
      rest: "240s",
      instructions:
        "Execute shrimp squats completos sem assistência. Perna de trás pega pelo calcanhar. Controle absoluto. Alterna pernas.",
      tips: "Equilíbrio lendário. Força unilateral extrema. Técnica perfeita evita lesões.",
      equipment: ["Nenhum"],
      calories: 22,
    },
    24,
    85,
    720,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 7200,
        description: "Complete 7200 séries de exercícios extremos",
      },
    ],
    undefined,
    "extreme"
  ),

  25: createSquatExerciseWithGamification(
    {
      id: "heavy_weighted_squat",
      name: "Heavy Weighted Squat (Mochila Pesada)",
      muscleGroup: "legs",
      difficulty: "extreme",
      sets: 4,
      reps: "6-8",
      rest: "240s",
      instructions:
        "Use mochila com peso significativo (20kg+). Execute squats completos. Técnica impecável mesmo com carga máxima.",
      tips: "Força máxima absoluta. Técnica perfeita obrigatória. Construa carga gradualmente.",
      equipment: ["Mochila pesada"],
      calories: 30,
    },
    25,
    110,
    720,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 8000,
        description: "Complete 8000 séries de exercícios extremos",
      },
    ],
    undefined,
    "extreme"
  ),

  26: createSquatExerciseWithGamification(
    {
      id: "360_jump_squat",
      name: "360° Jump Squat (Rotação Completa)",
      muscleGroup: "legs",
      difficulty: "extreme",
      sets: 4,
      reps: "3-5",
      rest: "300s",
      instructions:
        "Execute jump squat, gire 360° no ar, aterrisse de volta na posição de squat. Coordenação e controle sobre-humanos.",
      tips: "Coordenação máxima. Controle absoluto. Técnica perfeita evita lesões graves.",
      equipment: ["Nenhum"],
      calories: 28,
    },
    26,
    120,
    900,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 8800,
        description: "Complete 8800 séries de exercícios extremos",
      },
    ],
    undefined,
    "extreme"
  ),

  27: createSquatExerciseWithGamification(
    {
      id: "single_leg_box_jump_squat",
      name: "Single-Leg Box Jump → Squat Landing Control",
      muscleGroup: "legs",
      difficulty: "extreme",
      sets: 4,
      reps: "4-6 por perna",
      rest: "300s",
      instructions:
        "Salte para caixa com uma perna, aterrisse em squat unilateral controlado. Força e controle extremos. Alterna pernas.",
      tips: "Potência unilateral máxima. Controle no pouso. Técnica perfeita evita lesões.",
      equipment: ["Caixa ou step"],
      calories: 26,
    },
    27,
    105,
    900,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 9600,
        description: "Complete 9600 séries de exercícios extremos",
      },
    ],
    undefined,
    "extreme"
  ),

  28: createSquatExerciseWithGamification(
    {
      id: "deep_isometric_single_leg_hold",
      name: "Deep Isometric Single-Leg Hold (10-30s)",
      muscleGroup: "legs",
      difficulty: "extreme",
      sets: 4,
      reps: "10-30s por perna",
      rest: "180s",
      instructions:
        "Mantenha posição de pistol squat (perna estendida) por tempo determinado. Força isométrica unilateral máxima. Alterna pernas.",
      tips: "Força isométrica extrema. Controle absoluto. Construa tempo gradualmente.",
      equipment: ["Nenhum"],
      calories: 15,
    },
    28,
    75,
    600,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 10400,
        description: "Complete 10400 séries de exercícios extremos",
      },
    ],
    undefined,
    "extreme"
  ),

  29: createSquatExerciseWithGamification(
    {
      id: "dragon_squat_assisted",
      name: "Dragon Squat Assisted (Pé Puxado)",
      muscleGroup: "legs",
      difficulty: "extreme",
      sets: 4,
      reps: "3-5 por perna",
      rest: "300s",
      instructions:
        "Pé de trás puxado para frente do corpo. Execute squat profundo. Mobilidade e força extrema. Use assistência inicial.",
      tips: "Mobilidade lendária. Força excepcional. Técnica muito avançada. Construa gradualmente.",
      equipment: ["Apoio para equilíbrio"],
      calories: 20,
    },
    29,
    90,
    900,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 11200,
        description: "Complete 11200 séries de exercícios extremos",
      },
    ],
    undefined,
    "extreme"
  ),

  30: createSquatExerciseWithGamification(
    {
      id: "overload_tempo_pistol",
      name: "Overload Tempo Pistol (4-2-4 com Carga)",
      muscleGroup: "legs",
      difficulty: "extreme",
      sets: 4,
      reps: "3-4 por perna",
      rest: "360s",
      instructions:
        "Execute pistol squats com cadência 4-2-4 (4s descendo, 2s pausa, 4s subindo). Use peso leve para sobrecarga controlada. Alterna pernas.",
      tips: "Força máxima controlada. Técnica perfeita. Movimento que desafia limites humanos.",
      equipment: ["Peso leve opcional"],
      calories: 24,
    },
    30,
    95,
    1080,
    [
      {
        type: "sets",
        exerciseType: "squat",
        value: 12000,
        description: "Complete 12000 séries de exercícios extremos",
      },
    ],
    undefined,
    "extreme"
  ),
};
