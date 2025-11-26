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
  difficulty: "beginner" | "intermediate" | "advanced",
): Exercise[] {
  const allExercises: Exercise[] = [];
  Object.values(exercisesDatabase).forEach((exercises) => {
    allExercises.push(
      ...(exercises.filter((ex) => ex.difficulty === difficulty) as Exercise[]),
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
