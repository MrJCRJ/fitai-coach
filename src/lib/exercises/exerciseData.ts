import { Achievement } from "./types";

// ====================
// DADOS DOS EXERCÍCIOS
// ====================

// Thresholds comuns para todos os exercícios (0, 10, 25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800)
export const EXERCISE_THRESHOLDS = [
  0, 10, 25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800,
] as const;

// ====================
// CONQUISTAS POR EXERCÍCIO
// ====================

export const PUSHUP_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_pushup",
    name: "Primeira Flexão",
    description: "Complete sua primeira flexão",
    icon: "💪",
    xpReward: 10,
    condition: { type: "sets_completed", exerciseType: "pushup", value: 1 },
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
    id: "pushup_legend",
    name: "Lenda das Flexões",
    description: "Alcance o nível 10 de flexões",
    icon: "👑",
    xpReward: 1000,
    condition: { type: "level_reached", exerciseType: "pushup", value: 10 },
  },
  {
    id: "pushup_god",
    name: "Deus das Flexões",
    description: "Alcance o nível 12 de flexões",
    icon: "⚡",
    xpReward: 2000,
    condition: { type: "level_reached", exerciseType: "pushup", value: 12 },
  },
  {
    id: "pushup_streak",
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
    xpReward: 500,
    condition: {
      type: "streak_days",
      exerciseType: "pushup",
      value: 30,
      timeframe: "daily",
    },
  },
];

export const PULLUP_ACHIEVEMENTS: Achievement[] = [
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
  {
    id: "pullup_legend",
    name: "Lenda das Barras",
    description: "Alcance o nível 10 de barras",
    icon: "👑",
    xpReward: 1200,
    condition: { type: "level_reached", exerciseType: "pullup", value: 10 },
  },
  {
    id: "pullup_god",
    name: "Deus das Barras",
    description: "Alcance o nível 12 de barras",
    icon: "⚡",
    xpReward: 2500,
    condition: { type: "level_reached", exerciseType: "pullup", value: 12 },
  },
  {
    id: "pullup_streak_7",
    name: "Sequência de Barras",
    description: "Complete barras por 7 dias seguidos",
    icon: "🔥",
    xpReward: 120,
    condition: {
      type: "streak_days",
      exerciseType: "pullup",
      value: 7,
      timeframe: "daily",
    },
  },
  {
    id: "pullup_streak_30",
    name: "Mestre da Força Superior",
    description: "Complete barras por 30 dias seguidos",
    icon: "🔥🔥",
    xpReward: 600,
    condition: {
      type: "streak_days",
      exerciseType: "pullup",
      value: 30,
      timeframe: "daily",
    },
  },
];

export const SQUAT_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_squat",
    name: "Primeiro Agachamento",
    description: "Complete seu primeiro agachamento",
    icon: "🦵",
    xpReward: 15,
    condition: { type: "sets_completed", exerciseType: "squat", value: 1 },
  },
  {
    id: "squat_master",
    name: "Mestre dos Agachamentos",
    description: "Alcance o nível 8 de agachamentos",
    icon: "🦍",
    xpReward: 600,
    condition: { type: "level_reached", exerciseType: "squat", value: 8 },
  },
  {
    id: "squat_legend",
    name: "Lenda dos Agachamentos",
    description: "Alcance o nível 10 de agachamentos",
    icon: "👑",
    xpReward: 1200,
    condition: { type: "level_reached", exerciseType: "squat", value: 10 },
  },
  {
    id: "squat_god",
    name: "Deus dos Agachamentos",
    description: "Alcance o nível 12 de agachamentos",
    icon: "⚡",
    xpReward: 2500,
    condition: { type: "level_reached", exerciseType: "squat", value: 12 },
  },
  {
    id: "squat_streak_7",
    name: "Sequência de Agachamentos",
    description: "Complete agachamentos por 7 dias seguidos",
    icon: "🔥",
    xpReward: 120,
    condition: {
      type: "streak_days",
      exerciseType: "squat",
      value: 7,
      timeframe: "daily",
    },
  },
  {
    id: "squat_streak_30",
    name: "Mestre da Base",
    description: "Complete agachamentos por 30 dias seguidos",
    icon: "🔥🔥",
    xpReward: 600,
    condition: {
      type: "streak_days",
      exerciseType: "squat",
      value: 30,
      timeframe: "daily",
    },
  },
];

export const DIP_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_dip",
    name: "Primeiro Dip",
    description: "Complete seu primeiro dip",
    icon: "🏋️‍♂️",
    xpReward: 12,
    condition: { type: "sets_completed", exerciseType: "dip", value: 1 },
  },
  {
    id: "dip_master",
    name: "Mestre dos Dips",
    description: "Alcance o nível 5 de dips",
    icon: "💪",
    xpReward: 550,
    condition: { type: "level_reached", exerciseType: "dip", value: 5 },
  },
  {
    id: "dip_god",
    name: "Deus dos Dips",
    description: "Alcance o nível 6 de dips",
    icon: "⚡",
    xpReward: 2200,
    condition: { type: "level_reached", exerciseType: "dip", value: 6 },
  },
  {
    id: "dip_streak_7",
    name: "Sequência de Dips",
    description: "Complete dips por 7 dias seguidos",
    icon: "🔥",
    xpReward: 110,
    condition: {
      type: "streak_days",
      exerciseType: "dip",
      value: 7,
      timeframe: "daily",
    },
  },
  {
    id: "dip_streak_30",
    name: "Mestre dos Tríceps",
    description: "Complete dips por 30 dias seguidos",
    icon: "🔥🔥",
    xpReward: 550,
    condition: {
      type: "streak_days",
      exerciseType: "dip",
      value: 30,
      timeframe: "daily",
    },
  },
];
