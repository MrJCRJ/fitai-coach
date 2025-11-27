export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  sets: number;
  reps: string;
  rest: string;
  instructions: string;
  tips?: string;
  equipment: string[];
  calories?: number; // calorias queimadas por série aproximada
}

// Base de dados completa de exercícios organizada por grupo muscular
export const exercisesDatabase = {
  // PEITO (Chest)
  chest: [
    {
      id: "push-up",
      name: "Flexão de Braços",
      muscleGroup: "chest",
      difficulty: "beginner",
      sets: 3,
      reps: "10-15",
      rest: "60s",
      instructions:
        "Do topo da cabeça aos calcanhares, corpo em linha reta. Desça até o peito quase tocar o chão.",
      tips: "Mantenha os cotovelos próximos ao corpo e contraia o core.",
      equipment: [],
      calories: 8,
    },
    {
      id: "push-up-knees",
      name: "Flexão com Joelhos",
      muscleGroup: "chest",
      difficulty: "beginner",
      sets: 3,
      reps: "8-12",
      rest: "60s",
      instructions: "Faça flexões apoiando os joelhos no chão.",
      tips: "Mantenha o corpo em linha reta do topo da cabeça aos joelhos.",
      equipment: [],
      calories: 6,
    },
    {
      id: "diamond-push-up",
      name: "Flexão Diamante",
      muscleGroup: "chest",
      difficulty: "intermediate",
      sets: 3,
      reps: "8-12",
      rest: "75s",
      instructions: "Junte as mãos formando um diamante e faça flexões.",
      tips: "Foca mais nos tríceps também.",
      equipment: [],
      calories: 9,
    },
    {
      id: "decline-push-up",
      name: "Flexão Declinada",
      muscleGroup: "chest",
      difficulty: "intermediate",
      sets: 3,
      reps: "8-12",
      rest: "75s",
      instructions: "Coloque os pés elevados e faça flexões.",
      tips: "Aumenta a carga no peito superior.",
      equipment: [],
      calories: 10,
    },
    {
      id: "muscle-up",
      name: "Muscle Up",
      muscleGroup: "chest",
      difficulty: "advanced",
      sets: 3,
      reps: "3-5",
      rest: "90s",
      instructions: "Da barra baixa, puxe-se para cima passando por cima.",
      tips: "Use ímpeto controlado e força explosiva.",
      equipment: ["Barra"],
      calories: 15,
    },
  ],

  // COSTAS (Back)
  back: [
    {
      id: "superman",
      name: "Superman",
      muscleGroup: "back",
      difficulty: "beginner",
      sets: 3,
      reps: "10-15",
      rest: "45s",
      instructions:
        "Deitado de bruços, levante simultaneamente braços e pernas.",
      tips: "Contraia as costas e segure por 2 segundos no topo.",
      equipment: [],
      calories: 5,
    },
    {
      id: "reverse-snow-angel",
      name: "Anjo Invertido",
      muscleGroup: "back",
      difficulty: "beginner",
      sets: 3,
      reps: "10-12",
      rest: "45s",
      instructions:
        "Deitado de bruços, mova os braços como se estivesse nadando de costas.",
      tips: "Mantenha os ombros afastados do chão.",
      equipment: [],
      calories: 6,
    },
    {
      id: "pull-up-assisted",
      name: "Barra Assistida",
      muscleGroup: "back",
      difficulty: "intermediate",
      sets: 3,
      reps: "6-10",
      rest: "75s",
      instructions: "Puxe-se para cima em uma barra usando assistência.",
      tips: "Use elástico ou máquina para ajudar.",
      equipment: ["Barra", "Elástico (opcional)"],
      calories: 12,
    },
    {
      id: "inverted-rows",
      name: "Remada Invertida",
      muscleGroup: "back",
      difficulty: "intermediate",
      sets: 3,
      reps: "8-12",
      rest: "75s",
      instructions: "Debaixo de uma barra, puxe o peito em direção à barra.",
      tips: "Mantenha o corpo reto como uma prancha.",
      equipment: ["Barra"],
      calories: 10,
    },
  ],

  // PERNAS (Legs)
  legs: [
    {
      id: "bodyweight-squat",
      name: "Agachamento Livre",
      muscleGroup: "legs",
      difficulty: "beginner",
      sets: 3,
      reps: "12-15",
      rest: "60s",
      instructions: "Desça até os glúteos ficarem abaixo dos joelhos.",
      tips: "Mantenha os pés afastados e os joelhos alinhados com os pés.",
      equipment: [],
      calories: 8,
    },
    {
      id: "wall-sit",
      name: "Agachamento na Parede",
      muscleGroup: "legs",
      difficulty: "beginner",
      sets: 3,
      reps: "20-30s",
      rest: "60s",
      instructions:
        "Deslize pela parede até formar um ângulo de 90° com os joelhos.",
      tips: "Mantenha as costas retas e os pés afastados na largura dos ombros.",
      equipment: [],
      calories: 6,
    },
    {
      id: "lunge",
      name: "Afundo",
      muscleGroup: "legs",
      difficulty: "intermediate",
      sets: 3,
      reps: "10 por perna",
      rest: "75s",
      instructions:
        "Dê um passo à frente e desça até ambos os joelhos formarem 90°.",
      tips: "Mantenha o tronco ereto e o joelho da frente alinhado com o tornozelo.",
      equipment: [],
      calories: 9,
    },
    {
      id: "bulgarian-split-squat",
      name: "Afundo Búlgaro",
      muscleGroup: "legs",
      difficulty: "intermediate",
      sets: 3,
      reps: "8-10 por perna",
      rest: "75s",
      instructions:
        "Coloque um pé atrás em uma superfície elevada e faça agachamentos.",
      tips: "Mantenha o tronco ereto e desça devagar.",
      equipment: [],
      calories: 10,
    },
    {
      id: "pistol-squat",
      name: "Agachamento Pistola",
      muscleGroup: "legs",
      difficulty: "advanced",
      sets: 3,
      reps: "6-8 por perna",
      rest: "90s",
      instructions: "Agachamento unilateral com uma perna estendida.",
      tips: "Mantenha o equilíbrio e desça devagar.",
      equipment: [],
      calories: 12,
    },
    {
      id: "shrimp-squat",
      name: "Agachamento Shrimp",
      muscleGroup: "legs",
      difficulty: "advanced",
      sets: 3,
      reps: "4-6 por perna",
      rest: "90s",
      instructions: "Agachamento unilateral segurando o pé atrás das costas.",
      tips: "Movimento extremamente desafiador para equilíbrio e mobilidade.",
      equipment: [],
      calories: 14,
    },
    {
      id: "planche-squat",
      name: "Agachamento Planche",
      muscleGroup: "legs",
      difficulty: "advanced",
      sets: 3,
      reps: "3-5",
      rest: "120s",
      instructions:
        "Execute agachamentos mantendo o corpo em posição de planche.",
      tips: "Requer força excepcional. Progressão máxima de agachamentos.",
      equipment: [],
      calories: 16,
    },
  ],

  // BRAÇOS (Arms)
  arms: [
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
  ],

  // OMBROS (Shoulders)
  shoulders: [
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
  ],

  // CORE/ABDÔMEN (Core)
  core: [
    {
      id: "plank",
      name: "Prancha",
      muscleGroup: "core",
      difficulty: "beginner",
      sets: 3,
      reps: "20-30s",
      rest: "45s",
      instructions:
        "Mantenha o corpo reto apoiado nos antebraços e pontas dos pés.",
      tips: "Contraia o core e respire normalmente.",
      equipment: [],
      calories: 5,
    },
    {
      id: "side-plank",
      name: "Prancha Lateral",
      muscleGroup: "core",
      difficulty: "intermediate",
      sets: 3,
      reps: "20-30s por lado",
      rest: "45s",
      instructions: "Apoie-se no antebraço e lateral do pé.",
      tips: "Mantenha o corpo em linha reta e os quadris elevados.",
      equipment: [],
      calories: 6,
    },
    {
      id: "russian-twist",
      name: "Torção Russa",
      muscleGroup: "core",
      difficulty: "intermediate",
      sets: 3,
      reps: "15 por lado",
      rest: "60s",
      instructions: "Sentado, gire o tronco de um lado para o outro.",
      tips: "Mantenha os pés no chão e os joelhos dobrados.",
      equipment: [],
      calories: 7,
    },
    {
      id: "bicycle-crunch",
      name: "Abdominal Bicicleta",
      muscleGroup: "core",
      difficulty: "intermediate",
      sets: 3,
      reps: "15 por lado",
      rest: "60s",
      instructions: "Deitado, leve o cotovelo oposto ao joelho alternadamente.",
      tips: "Mantenha as costas coladas ao chão.",
      equipment: [],
      calories: 8,
    },
  ],

  // CARDIO (Cardio)
  cardio: [
    {
      id: "stationary-march",
      name: "Marcha Estacionária",
      muscleGroup: "cardio",
      difficulty: "beginner",
      sets: 1,
      reps: "5 minutos",
      rest: "30s",
      instructions: "Marche no lugar elevando os joelhos alternadamente.",
      tips: "Mantenha o ritmo constante e respire profundamente.",
      equipment: [],
      calories: 25,
    },
    {
      id: "jumping-jacks",
      name: "Polichinelos",
      muscleGroup: "cardio",
      difficulty: "beginner",
      sets: 3,
      reps: "20",
      rest: "45s",
      instructions:
        "Abra e feche as pernas enquanto move os braços para cima e para baixo.",
      tips: "Mantenha os pés juntos quando fechar as pernas.",
      equipment: [],
      calories: 20,
    },
    {
      id: "burpees",
      name: "Burpees",
      muscleGroup: "cardio",
      difficulty: "intermediate",
      sets: 3,
      reps: "10-12",
      rest: "60s",
      instructions:
        "Do agachamento, chute os pés para trás, faça uma flexão e volte.",
      tips: "Mantenha o ritmo constante e respire profundamente.",
      equipment: [],
      calories: 30,
    },
    {
      id: "mountain-climbers",
      name: "Mountain Climbers",
      muscleGroup: "cardio",
      difficulty: "intermediate",
      sets: 3,
      reps: "30s",
      rest: "45s",
      instructions:
        "Em posição de prancha, alterne trazendo os joelhos ao peito.",
      tips: "Mantenha o core contraído e os quadris baixos.",
      equipment: [],
      calories: 25,
    },
    {
      id: "burpee-box-jump",
      name: "Burpee com Salto na Caixa",
      muscleGroup: "cardio",
      difficulty: "advanced",
      sets: 4,
      reps: "8-10",
      rest: "75s",
      instructions: "Burpee seguido de salto sobre uma superfície elevada.",
      tips: "Aterrisse suavemente e mantenha o ritmo.",
      equipment: [],
      calories: 35,
    },
  ],

  // FULL BODY (Full Body)
  fullbody: [
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
  ],
};

// Funções auxiliares para trabalhar com a base de dados
export function getExercisesByMuscleGroup(muscleGroup: string): Exercise[] {
  return (exercisesDatabase[muscleGroup as keyof typeof exercisesDatabase] ||
    []) as Exercise[];
}

export function getExercisesByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): Exercise[] {
  const allExercises: Exercise[] = [];
  Object.values(exercisesDatabase).forEach((exercises) => {
    allExercises.push(
      ...(exercises.filter((ex) => ex.difficulty === difficulty) as Exercise[])
    );
  });
  return allExercises;
}

export function getExerciseById(id: string): Exercise | undefined {
  for (const muscleGroup of Object.values(exercisesDatabase)) {
    const exercise = muscleGroup.find((ex) => ex.id === id) as
      | Exercise
      | undefined;
    if (exercise) return exercise;
  }
  return undefined;
}

export function getAllExercises(): Exercise[] {
  const allExercises: Exercise[] = [];
  Object.values(exercisesDatabase).forEach((exercises) => {
    allExercises.push(...(exercises as Exercise[]));
  });
  return allExercises;
}

// Grupos musculares disponíveis
export const muscleGroups = {
  chest: "Peito",
  back: "Costas",
  legs: "Pernas",
  arms: "Braços",
  shoulders: "Ombros",
  core: "Core/Abdômen",
  cardio: "Cardio",
  fullbody: "Corpo Inteiro",
} as const;

export type MuscleGroup = keyof typeof muscleGroups;

// Variações de push-ups por nível de calistenia
export const pushUpVariations: Record<number, Exercise> = {
  1: {
    id: "wall-push-up",
    name: "Flexão na Parede",
    muscleGroup: "chest",
    difficulty: "beginner",
    sets: 3,
    reps: "8-12",
    rest: "60s",
    instructions:
      "Apoie as mãos na parede em altura dos ombros. Dobre os cotovelos para aproximar o peito da parede, depois estenda os braços.",
    tips: "Mantenha o corpo reto e os cotovelos próximos ao corpo.",
    equipment: [],
    calories: 4,
  },
  2: {
    id: "knee-push-up",
    name: "Flexão com Joelhos",
    muscleGroup: "chest",
    difficulty: "beginner",
    sets: 3,
    reps: "8-12",
    rest: "60s",
    instructions:
      "Apoie os joelhos no chão. Mantenha o corpo em linha reta do topo da cabeça aos joelhos. Desça até o peito quase tocar o chão.",
    tips: "Mantenha o core contraído e os cotovelos próximos ao corpo.",
    equipment: [],
    calories: 6,
  },
  3: {
    id: "push-up",
    name: "Flexão de Braços",
    muscleGroup: "chest",
    difficulty: "beginner",
    sets: 3,
    reps: "10-15",
    rest: "60s",
    instructions:
      "Do topo da cabeça aos calcanhares, corpo em linha reta. Desça até o peito quase tocar o chão.",
    tips: "Mantenha os cotovelos próximos ao corpo e contraia o core.",
    equipment: [],
    calories: 8,
  },
  4: {
    id: "decline-push-up",
    name: "Flexão Declinada",
    muscleGroup: "chest",
    difficulty: "intermediate",
    sets: 3,
    reps: "8-12",
    rest: "75s",
    instructions:
      "Coloque os pés elevados (em uma cadeira ou step). Mantenha o corpo em linha reta e desça até o peito quase tocar o chão.",
    tips: "Aumenta a carga no peito superior. Mantenha o core contraído.",
    equipment: [],
    calories: 10,
  },
  5: {
    id: "diamond-push-up",
    name: "Flexão Diamante",
    muscleGroup: "chest",
    difficulty: "intermediate",
    sets: 3,
    reps: "8-12",
    rest: "75s",
    instructions:
      "Junte as mãos formando um diamante sob o peito. Desça até o peito tocar nas mãos.",
    tips: "Foca mais nos tríceps. Mantenha os cotovelos próximos ao corpo.",
    equipment: [],
    calories: 9,
  },
  6: {
    id: "archer-push-up",
    name: "Flexão Arqueiro",
    muscleGroup: "chest",
    difficulty: "advanced",
    sets: 3,
    reps: "6-8 por lado",
    rest: "90s",
    instructions:
      "Em posição de flexão, estenda um braço lateralmente enquanto desce com o outro braço. Alterne os lados.",
    tips: "Movimento unilateral que desafia o equilíbrio e força lateral.",
    equipment: [],
    calories: 12,
  },
  7: {
    id: "one-hand-push-up",
    name: "Flexão com Uma Mão",
    muscleGroup: "chest",
    difficulty: "advanced",
    sets: 3,
    reps: "3-5 por lado",
    rest: "90s",
    instructions:
      "Apoie uma mão no chão e a outra atrás das costas. Mantenha o corpo reto e execute a flexão.",
    tips: "Exige força e equilíbrio excepcionais. Comece com progressões parciais.",
    equipment: [],
    calories: 15,
  },
  8: {
    id: "planche-push-up",
    name: "Flexão Planche",
    muscleGroup: "chest",
    difficulty: "advanced",
    sets: 3,
    reps: "3-5",
    rest: "90s",
    instructions:
      "Das mãos, eleve os pés do chão mantendo o corpo paralelo ao solo. Execute flexões nessa posição.",
    tips: "Movimento extremamente avançado que requer força excepcional em todo o corpo.",
    equipment: [],
    calories: 18,
  },
};

// Função para calcular o nível atual de push-ups baseado no progresso
export function getCurrentPushUpLevel(totalPushUpSets: number): number {
  if (totalPushUpSets < 10) return 1; // Wall push-ups
  if (totalPushUpSets < 25) return 2; // Knee push-ups
  if (totalPushUpSets < 50) return 3; // Standard push-ups
  if (totalPushUpSets < 100) return 4; // Decline push-ups
  if (totalPushUpSets < 200) return 5; // Diamond push-ups
  if (totalPushUpSets < 400) return 6; // Archer push-ups
  if (totalPushUpSets < 800) return 7; // One-hand push-ups
  return 8; // Planche push-ups
}

// Função para obter a variação atual de push-up baseada no nível
export function getCurrentPushUpVariation(totalPushUpSets: number): Exercise {
  const level = getCurrentPushUpLevel(totalPushUpSets);
  const variation = pushUpVariations[level];
  return variation || pushUpVariations[1]!;
}

// Variações de pull-ups por nível de calistenia
export const pullUpVariations: Record<number, Exercise> = {
  1: {
    id: "negative-pull-up",
    name: "Barra Negativa",
    muscleGroup: "back",
    difficulty: "beginner",
    sets: 3,
    reps: "3-5",
    rest: "90s",
    instructions:
      "Puxe-se para cima usando um impulso ou assistência, depois desça lentamente controlando o movimento.",
    tips: "Foque no movimento negativo (descida) para construir força.",
    equipment: ["Barra"],
    calories: 8,
  },
  2: {
    id: "assisted-pull-up",
    name: "Barra Assistida",
    muscleGroup: "back",
    difficulty: "beginner",
    sets: 3,
    reps: "6-8",
    rest: "75s",
    instructions:
      "Use elástico ou máquina de assistência para ajudar no movimento.",
    tips: "Reduza gradualmente a assistência conforme ganha força.",
    equipment: ["Barra", "Elástico (opcional)"],
    calories: 10,
  },
  3: {
    id: "pull-up",
    name: "Barra Fixa",
    muscleGroup: "back",
    difficulty: "intermediate",
    sets: 3,
    reps: "8-12",
    rest: "75s",
    instructions:
      "Puxe o corpo para cima até o queixo passar a barra, depois desça controladamente.",
    tips: "Mantenha os cotovelos apontando para baixo e contraia as costas.",
    equipment: ["Barra"],
    calories: 12,
  },
  4: {
    id: "l-sit-pull-up",
    name: "Barra L-Sit",
    muscleGroup: "back",
    difficulty: "intermediate",
    sets: 3,
    reps: "6-8",
    rest: "90s",
    instructions:
      "Mantenha as pernas em L (paralelas ao chão) durante a barra.",
    tips: "Exige força excepcional no core. Comece com as pernas mais baixas.",
    equipment: ["Barra"],
    calories: 15,
  },
  5: {
    id: "wide-pull-up",
    name: "Barra Larga",
    muscleGroup: "back",
    difficulty: "intermediate",
    sets: 3,
    reps: "6-10",
    rest: "75s",
    instructions:
      "Segure a barra com as mãos mais afastadas que a largura dos ombros.",
    tips: "Foca mais nas costas e menos nos bíceps.",
    equipment: ["Barra"],
    calories: 13,
  },
  6: {
    id: "muscle-up",
    name: "Muscle Up",
    muscleGroup: "back",
    difficulty: "advanced",
    sets: 3,
    reps: "3-5",
    rest: "90s",
    instructions:
      "Da posição pendurada, puxe-se para cima passando por cima da barra.",
    tips: "Combine tração explosiva com transição suave.",
    equipment: ["Barra"],
    calories: 18,
  },
  7: {
    id: "one-arm-pull-up",
    name: "Barra com Um Braço",
    muscleGroup: "back",
    difficulty: "advanced",
    sets: 3,
    reps: "2-4 por lado",
    rest: "120s",
    instructions: "Execute barras usando apenas um braço.",
    tips: "Movimento extremamente avançado. Comece com assistências parciais.",
    equipment: ["Barra"],
    calories: 20,
  },
  8: {
    id: "front-lever-pull-up",
    name: "Barra Front Lever",
    muscleGroup: "back",
    difficulty: "advanced",
    sets: 3,
    reps: "2-3",
    rest: "120s",
    instructions:
      "Mantenha o corpo em front lever (horizontal) durante a execução.",
    tips: "Requer força excepcional em todo o corpo. Progressão extrema.",
    equipment: ["Barra"],
    calories: 22,
  },
};

// Função para calcular o nível atual de pull-ups baseado no progresso
export function getCurrentPullUpLevel(totalPullUpSets: number): number {
  if (totalPullUpSets < 10) return 1; // Negative pull-ups
  if (totalPullUpSets < 25) return 2; // Assisted pull-ups
  if (totalPullUpSets < 50) return 3; // Standard pull-ups
  if (totalPullUpSets < 100) return 4; // L-sit pull-ups
  if (totalPullUpSets < 200) return 5; // Wide pull-ups
  if (totalPullUpSets < 400) return 6; // Muscle-ups
  if (totalPullUpSets < 800) return 7; // One-arm pull-ups
  return 8; // Front lever pull-ups
}

// Função para obter a variação atual de pull-up baseada no nível
export function getCurrentPullUpVariation(totalPullUpSets: number): Exercise {
  const level = getCurrentPullUpLevel(totalPullUpSets);
  const variation = pullUpVariations[level];
  return variation || pullUpVariations[1]!;
}

// Variações de squats por nível de calistenia
export const squatVariations: Record<number, Exercise> = {
  1: {
    id: "wall-sit",
    name: "Agachamento na Parede",
    muscleGroup: "legs",
    difficulty: "beginner",
    sets: 3,
    reps: "20-30s",
    rest: "60s",
    instructions:
      "Deslize pela parede até formar um ângulo de 90° com os joelhos.",
    tips: "Mantenha as costas retas e os pés afastados na largura dos ombros.",
    equipment: [],
    calories: 6,
  },
  2: {
    id: "assisted-squat",
    name: "Agachamento Assistido",
    muscleGroup: "legs",
    difficulty: "beginner",
    sets: 3,
    reps: "10-12",
    rest: "60s",
    instructions:
      "Use uma cadeira ou parede para assistência durante o movimento.",
    tips: "A cadeira serve como guia de profundidade e suporte.",
    equipment: [],
    calories: 7,
  },
  3: {
    id: "bodyweight-squat",
    name: "Agachamento Livre",
    muscleGroup: "legs",
    difficulty: "beginner",
    sets: 3,
    reps: "12-15",
    rest: "60s",
    instructions: "Desça até os glúteos ficarem abaixo dos joelhos.",
    tips: "Mantenha os pés afastados e os joelhos alinhados com os pés.",
    equipment: [],
    calories: 8,
  },
  4: {
    id: "jump-squat",
    name: "Agachamento com Salto",
    muscleGroup: "legs",
    difficulty: "intermediate",
    sets: 3,
    reps: "10-12",
    rest: "75s",
    instructions: "Execute agachamentos explosivos terminando com um salto.",
    tips: "Aterrisse suavemente e mantenha o ritmo constante.",
    equipment: [],
    calories: 12,
  },
  5: {
    id: "bulgarian-split-squat",
    name: "Afundo Búlgaro",
    muscleGroup: "legs",
    difficulty: "intermediate",
    sets: 3,
    reps: "8-10 por perna",
    rest: "75s",
    instructions:
      "Coloque um pé atrás em uma superfície elevada e faça agachamentos.",
    tips: "Mantenha o tronco ereto e desça devagar.",
    equipment: [],
    calories: 10,
  },
  6: {
    id: "pistol-squat",
    name: "Agachamento Pistola",
    muscleGroup: "legs",
    difficulty: "advanced",
    sets: 3,
    reps: "6-8 por perna",
    rest: "90s",
    instructions: "Agachamento unilateral com uma perna estendida.",
    tips: "Mantenha o equilíbrio e desça devagar.",
    equipment: [],
    calories: 12,
  },
  7: {
    id: "shrimp-squat",
    name: "Agachamento Shrimp",
    muscleGroup: "legs",
    difficulty: "advanced",
    sets: 3,
    reps: "4-6 por perna",
    rest: "90s",
    instructions: "Agachamento unilateral segurando o pé atrás das costas.",
    tips: "Movimento extremamente desafiador para equilíbrio e mobilidade.",
    equipment: [],
    calories: 14,
  },
  8: {
    id: "planche-squat",
    name: "Agachamento Planche",
    muscleGroup: "legs",
    difficulty: "advanced",
    sets: 3,
    reps: "3-5",
    rest: "120s",
    instructions:
      "Execute agachamentos mantendo o corpo em posição de planche.",
    tips: "Requer força excepcional. Progressão máxima de agachamentos.",
    equipment: [],
    calories: 16,
  },
};

// Função para calcular o nível atual de squats baseado no progresso
export function getCurrentSquatLevel(totalSquatSets: number): number {
  if (totalSquatSets < 10) return 1; // Wall sit
  if (totalSquatSets < 25) return 2; // Assisted squats
  if (totalSquatSets < 50) return 3; // Bodyweight squats
  if (totalSquatSets < 100) return 4; // Jump squats
  if (totalSquatSets < 200) return 5; // Bulgarian split squats
  if (totalSquatSets < 400) return 6; // Pistol squats
  if (totalSquatSets < 800) return 7; // Shrimp squats
  return 8; // Planche squats
}

// Funções para obter variações atuais
export function getCurrentSquatVariation(totalSquatSets: number): Exercise {
  const level = getCurrentSquatLevel(totalSquatSets);
  const variation = squatVariations[level];
  return variation || squatVariations[1]!;
}
