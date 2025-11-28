import { Achievement } from "./types";

// Conquistas relacionadas a flexões
export const pushUpAchievements: Achievement[] = [
  {
    id: "first_pushup",
    name: "Primeira Flexão",
    description: "Complete sua primeira flexão",
    icon: "💪",
    xpReward: 10,
    condition: { type: "sets_completed", exerciseType: "pushup", value: 1 },
  },
  {
    id: "pushup_novice",
    name: "Aprendiz das Flexões",
    description: "Complete 10 séries de flexões",
    icon: "🏃‍♂️",
    xpReward: 25,
    condition: { type: "sets_completed", exerciseType: "pushup", value: 10 },
  },
  {
    id: "pushup_warrior",
    name: "Guerreiro das Flexões",
    description: "Alcance o nível 3 de flexões",
    icon: "⚔️",
    xpReward: 50,
    condition: { type: "level_reached", exerciseType: "pushup", value: 3 },
  },
  {
    id: "pushup_master",
    name: "Mestre das Flexões",
    description: "Alcance o nível 8 de flexões",
    icon: "🏆",
    xpReward: 500,
    condition: { type: "level_reached", exerciseType: "pushup", value: 8 },
  },
  {
    id: "pushup_streak_7",
    name: "Sequência de Flexões",
    description: "Complete flexões por 7 dias seguidos",
    icon: "🔥",
    xpReward: 100,
    condition: {
      type: "streak_days",
      exerciseType: "pushup",
      value: 7,
      timeframe: "daily",
    },
  },
  {
    id: "pushup_streak_30",
    name: "Mestre da Consistência",
    description: "Complete flexões por 30 dias seguidos",
    icon: "🔥🔥",
    xpReward: 300,
    condition: {
      type: "streak_days",
      exerciseType: "pushup",
      value: 30,
      timeframe: "daily",
    },
  },
];

// Conquistas relacionadas a barras
export const pullUpAchievements: Achievement[] = [
  {
    id: "first_pullup",
    name: "Primeira Barra",
    description: "Complete sua primeira barra fixa",
    icon: "🏋️‍♂️",
    xpReward: 15,
    condition: { type: "sets_completed", exerciseType: "pullup", value: 1 },
  },
  {
    id: "pullup_master",
    name: "Mestre das Barras",
    description: "Alcance o nível 8 de barras",
    icon: "🦍",
    xpReward: 600,
    condition: { type: "level_reached", exerciseType: "pullup", value: 8 },
  },
];

// Conquistas relacionadas a agachamentos
export const squatAchievements: Achievement[] = [
  {
    id: "first_squat",
    name: "Primeiro Agachamento",
    description: "Complete seu primeiro agachamento",
    icon: "🦵",
    xpReward: 8,
    condition: { type: "sets_completed", exerciseType: "squat", value: 1 },
  },
  {
    id: "squat_master",
    name: "Mestre dos Agachamentos",
    description: "Alcance o nível 8 de agachamentos",
    icon: "🦵💪",
    xpReward: 550,
    condition: { type: "level_reached", exerciseType: "squat", value: 8 },
  },
];

// Conquistas relacionadas ao uso de peso
export const weightAchievements: Achievement[] = [
  {
    id: "weight_first_time",
    name: "Primeiro Peso",
    description: "Use peso pela primeira vez em qualquer exercício",
    icon: "🏋️",
    xpReward: 25,
    condition: { type: "weight_used", value: 1 },
  },
  {
    id: "weight_warrior",
    name: "Guerreiro do Peso",
    description: "Complete 50 séries com peso adicional",
    icon: "💪🏋️",
    xpReward: 100,
    condition: { type: "weight_sets", value: 50 },
  },
  {
    id: "weight_master",
    name: "Mestre do Peso",
    description: "Complete 200 séries com peso adicional",
    icon: "🏆🏋️",
    xpReward: 300,
    condition: { type: "weight_sets", value: 200 },
  },
  {
    id: "heavy_lifter",
    name: "Levantador Pesado",
    description: "Use mais de 20kg em uma série",
    icon: "🏋️‍♀️💪",
    xpReward: 150,
    condition: { type: "max_weight", value: 20 },
  },
];

// Conquistas gerais (não específicas de exercício)
export const generalAchievements: Achievement[] = [
  {
    id: "first_workout",
    name: "Primeiro Treino",
    description: "Complete seu primeiro treino",
    icon: "🎯",
    xpReward: 20,
    condition: { type: "sets_completed", value: 1 },
  },
  {
    id: "week_warrior",
    name: "Guerreiro da Semana",
    description: "Treine 7 dias em uma semana",
    icon: "📅",
    xpReward: 150,
    condition: { type: "streak_days", value: 7, timeframe: "weekly" },
  },
  {
    id: "consistency_king",
    name: "Rei da Consistência",
    description: "Treine por 100 dias",
    icon: "👑",
    xpReward: 1000,
    condition: { type: "streak_days", value: 100, timeframe: "all_time" },
  },
  {
    id: "perfect_form",
    name: "Forma Perfeita",
    description: "Mantenha avaliação 5/5 em 10 séries",
    icon: "✨",
    xpReward: 75,
    condition: { type: "perfect_form", value: 10 },
  },
];

// Todas as conquistas organizadas
export const allAchievements: Achievement[] = [
  ...pushUpAchievements,
  ...pullUpAchievements,
  ...squatAchievements,
  ...weightAchievements,
  ...generalAchievements,
];
