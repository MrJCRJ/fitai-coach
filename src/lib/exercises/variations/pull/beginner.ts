import { Exercise } from "../../types";
import { createPullExerciseWithGamification } from "./utils/gamificationUtils";
import { PULL_ACHIEVEMENTS, PULL_BADGES } from "./data/pullGameData";

// ====================
// EXERCÍCIOS DE PULL - NÍVEL BEGINNER
// ====================

export const beginnerPull: Record<number, Exercise> = {
  1: createPullExerciseWithGamification(
    {
      id: "dead_hang",
      name: "Dead Hang (Suspensão Morta)",
      muscleGroup: "back",
      difficulty: "beginner",
      sets: 3,
      reps: "10-30s",
      rest: "60s",
      instructions:
        "Pendure-se em uma barra com os braços totalmente estendidos. Mantenha o corpo reto e os ombros afastados das orelhas. Segure pelo tempo determinado.",
      tips: "Comece com 10 segundos e aumente gradualmente. Foque na força de preensão.",
      equipment: ["Barra"],
      calories: 6,
      xpReward: 8,
      estimatedTime: 180,
      badgeId: PULL_BADGES.firstHang.id,
      rarity: "common",
      category: "isometric",
      emoji: "⏱️",
    },
    1,
    8,
    180,
    undefined,
    [PULL_ACHIEVEMENTS[0]!], // first_pull
    "beginner"
  ),

  2: createPullExerciseWithGamification(
    {
      id: "active_hang",
      name: "Active Hang (Suspensão Ativa)",
      muscleGroup: "back",
      difficulty: "beginner",
      sets: 3,
      reps: "15-45s",
      rest: "75s",
      instructions:
        "Pendure-se na barra e ative os músculos das costas aproximando as escápulas. Mantenha os ombros para baixo e o core contraído.",
      tips: "Imagine 'dar de ombros' para cima. Este movimento prepara para scapular pull-ups.",
      equipment: ["Barra"],
      calories: 8,
      xpReward: 10,
      estimatedTime: 240,
      badgeId: PULL_BADGES.scapularMaster.id,
      rarity: "common",
      category: "isometric",
      emoji: "🏋️‍♂️",
    },
    2,
    10,
    240,
    [
      {
        type: "sets",
        exerciseType: "pullup",
        value: 8,
        description: "Complete 8 séries de dead hang",
      },
    ],
    undefined,
    "beginner"
  ),

  3: createPullExerciseWithGamification(
    {
      id: "scapular_pull_up",
      name: "Scapular Pull-up",
      muscleGroup: "back",
      difficulty: "beginner",
      sets: 4,
      reps: "8-12",
      rest: "60s",
      instructions:
        "Pendure-se na barra com os braços estendidos. Sem dobrar os cotovelos, aproxime as escápulas uma da outra, depois relaxe. Repita o movimento.",
      tips: "Foque apenas no movimento das escápulas. Braços permanecem retos. Este é o fundamento de todas as barras.",
      equipment: ["Barra"],
      calories: 7,
      xpReward: 12,
      estimatedTime: 240,
      rarity: "rare",
      category: "scapular",
      emoji: "🦴",
    },
    3,
    12,
    240,
    [
      {
        type: "sets",
        exerciseType: "pullup",
        value: 25,
        description: "Complete 25 séries de exercícios básicos de pull",
      },
    ],
    [PULL_ACHIEVEMENTS[1]!], // pull_warrior
    "beginner"
  ),

  4: createPullExerciseWithGamification(
    {
      id: "negative_pull_up",
      name: "Negative Pull-up (Negativa)",
      muscleGroup: "back",
      difficulty: "beginner",
      sets: 3,
      reps: "3-6",
      rest: "90s",
      instructions:
        "Comece no topo da barra (use um apoio se necessário). Desça lentamente controlando o movimento, levando 3-4 segundos para completar a negativa.",
      tips: "A fase negativa constrói mais força que a positiva. Controle total do movimento. Use impulso mínimo para chegar ao topo.",
      equipment: ["Barra"],
      calories: 10,
      xpReward: 15,
      estimatedTime: 300,
      badgeId: PULL_BADGES.negativeKing.id,
      rarity: "rare",
      category: "eccentric",
      emoji: "⬇️",
    },
    4,
    15,
    300,
    [
      {
        type: "sets",
        exerciseType: "pullup",
        value: 50,
        description: "Complete 50 séries de exercícios básicos",
      },
    ],
    undefined,
    "beginner"
  ),

  5: createPullExerciseWithGamification(
    {
      id: "assisted_pull_up",
      name: "Assisted Pull-up (Barra Assistida)",
      muscleGroup: "back",
      difficulty: "beginner",
      sets: 4,
      reps: "6-10",
      rest: "75s",
      instructions:
        "Use elástico, máquina de assistência ou apoios para ajudar no movimento. Puxe o corpo para cima até o queixo passar a barra, depois desça controladamente.",
      tips: "Reduza gradualmente a assistência conforme ganha força. Mantenha o corpo reto e evite balançar.",
      equipment: ["Barra", "Elástico (opcional)", "Máquina (opcional)"],
      calories: 12,
      xpReward: 18,
      estimatedTime: 360,
      rarity: "common",
      category: "assisted",
      emoji: "🔧",
    },
    5,
    18,
    360,
    [
      {
        type: "sets",
        exerciseType: "pullup",
        value: 100,
        description: "Complete 100 séries de exercícios básicos",
      },
    ],
    undefined,
    "beginner"
  ),

  6: createPullExerciseWithGamification(
    {
      id: "chin_up_assisted",
      name: "Chin-up Assistido (Barra de Queixo)",
      muscleGroup: "back",
      difficulty: "beginner",
      sets: 4,
      reps: "5-8",
      rest: "90s",
      instructions:
        "Use pegada supinada (palmas viradas para você). Puxe o corpo para cima até o queixo passar a barra. Use assistência conforme necessário.",
      tips: "A pegada supinada recruta mais bíceps. Mantenha os cotovelos apontando para baixo durante a subida.",
      equipment: ["Barra", "Elástico (opcional)"],
      calories: 13,
      xpReward: 20,
      estimatedTime: 360,
      rarity: "common",
      category: "assisted",
      emoji: "🤏",
    },
    6,
    20,
    360,
    [
      {
        type: "sets",
        exerciseType: "pullup",
        value: 200,
        description: "Complete 200 séries de exercícios básicos",
      },
    ],
    undefined,
    "beginner"
  ),

  7: createPullExerciseWithGamification(
    {
      id: "australian_row",
      name: "Australian Row (Remada Australiana)",
      muscleGroup: "back",
      difficulty: "beginner",
      sets: 4,
      reps: "10-15",
      rest: "60s",
      instructions:
        "Deite debaixo de uma barra baixa. Segure a barra com pegada pronada. Puxe o peito em direção à barra, contraindo as costas.",
      tips: "Mantenha o corpo reto como uma prancha. Foque na contração das costas, não apenas nos braços. Excelente para iniciantes.",
      equipment: ["Barra baixa", "Barra de dominadas baixa"],
      calories: 9,
      xpReward: 14,
      estimatedTime: 300,
      rarity: "common",
      category: "horizontal",
      emoji: "🇦🇺",
    },
    7,
    14,
    300,
    undefined, // Sempre disponível como alternativa
    undefined,
    "beginner"
  ),

  8: createPullExerciseWithGamification(
    {
      id: "neutral_grip_assisted",
      name: "Neutral Grip Pull-up Assistido",
      muscleGroup: "back",
      difficulty: "beginner",
      sets: 4,
      reps: "6-10",
      rest: "75s",
      instructions:
        "Use pegada neutra (palmas uma de frente para a outra). Puxe o corpo para cima usando assistência. Esta pegada é mais confortável para os ombros.",
      tips: "Pegada neutra reduz tensão nos ombros. Use argolas ou barras especiais. Perfeita para quem tem desconforto na pronada/supinada.",
      equipment: ["Barra neutra", "Argolas", "Elástico"],
      calories: 12,
      xpReward: 18,
      estimatedTime: 360,
      rarity: "rare",
      category: "assisted",
      emoji: "🤝",
    },
    8,
    18,
    360,
    [
      {
        type: "sets",
        exerciseType: "pullup",
        value: 400,
        description: "Complete 400 séries de exercícios básicos",
      },
    ],
    undefined,
    "beginner"
  ),
};
