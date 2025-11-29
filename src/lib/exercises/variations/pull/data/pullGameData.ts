import type { Achievement } from "@/lib/exercises";

// ====================
// DADOS DO JOGO - PULL PATH
// ====================

// Thresholds específicos para exercícios de pull (mais desafiadores que push-ups)
export const PULL_THRESHOLDS = [
  0, 8, 25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800,
] as const;

// ====================
// CONQUISTAS ESPECÍFICAS DO PULL PATH
// ====================

export const PULL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_pull",
    name: "Primeira Tração",
    description: "Complete seu primeiro exercício de tração",
    icon: "🏋️‍♂️",
    xpReward: 15,
    condition: { type: "sets_completed", exerciseType: "pullup", value: 1 },
  },
  {
    id: "pull_warrior",
    name: "Guerreiro das Trações",
    description: "Alcance o nível 3 de exercícios de pull",
    icon: "⚔️",
    xpReward: 100,
    condition: { type: "level_reached", exerciseType: "pullup", value: 3 },
  },
  {
    id: "pull_master",
    name: "Mestre das Trações",
    description: "Alcance o nível 6 de exercícios de pull",
    icon: "🦍",
    xpReward: 300,
    condition: { type: "level_reached", exerciseType: "pullup", value: 6 },
  },
  {
    id: "pull_legend",
    name: "Lenda das Trações",
    description: "Alcance o nível 9 de exercícios de pull",
    icon: "👑",
    xpReward: 800,
    condition: { type: "level_reached", exerciseType: "pullup", value: 9 },
  },
  {
    id: "pull_god",
    name: "Deus das Trações",
    description: "Alcance o nível 12 de exercícios de pull",
    icon: "⚡",
    xpReward: 2000,
    condition: { type: "level_reached", exerciseType: "pullup", value: 12 },
  },
  {
    id: "pull_streak_7",
    name: "Sequência de Trações",
    description: "Complete exercícios de pull por 7 dias seguidos",
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
    id: "pull_streak_30",
    name: "Mestre da Força Superior",
    description: "Complete exercícios de pull por 30 dias seguidos",
    icon: "🔥🔥",
    xpReward: 600,
    condition: {
      type: "streak_days",
      exerciseType: "pullup",
      value: 30,
      timeframe: "daily",
    },
  },
  {
    id: "perfect_form_pull",
    name: "Forma Perfeita",
    description: "Complete 50 séries com forma perfeita",
    icon: "🎯",
    xpReward: 250,
    condition: {
      type: "perfect_form",
      exerciseType: "pullup",
      value: 50,
      timeframe: "all_time",
    },
  },
  {
    id: "explosive_pull",
    name: "Força Explosiva",
    description: "Complete 25 séries explosivas",
    icon: "💥",
    xpReward: 300,
    condition: {
      type: "sets_completed",
      exerciseType: "pullup",
      value: 25,
    },
  },
  {
    id: "pull_champion",
    name: "Campeão das Barras",
    description: "Complete 1000 séries de exercícios de pull",
    icon: "🏆",
    xpReward: 1500,
    condition: {
      type: "sets_completed",
      exerciseType: "pullup",
      value: 1000,
      timeframe: "all_time",
    },
  },
];

// ====================
// BADGES ESPECÍFICOS DO PULL PATH
// ====================

export const PULL_BADGES = {
  firstHang: {
    id: "first_hang",
    name: "Primeira Suspensão",
    description: "Segure na barra por 10 segundos",
    icon: "⏱️",
    rarity: "common" as const,
    xpBonus: 10,
  },
  scapularMaster: {
    id: "scapular_master",
    name: "Mestre Escapular",
    description: "Domine o movimento escapular",
    icon: "🦴",
    rarity: "rare" as const,
    xpBonus: 50,
  },
  negativeKing: {
    id: "negative_king",
    name: "Rei das Negativas",
    description: "Complete 100 negativas controladas",
    icon: "👑",
    rarity: "epic" as const,
    xpBonus: 200,
  },
  fullPullMaster: {
    id: "full_pull_master",
    name: "Mestre das Barras Completas",
    description: "Complete 500 barras completas",
    icon: "💪",
    rarity: "legendary" as const,
    xpBonus: 500,
  },
  leverLord: {
    id: "lever_lord",
    name: "Senhor dos Levers",
    description: "Mantenha front lever por 10 segundos",
    icon: "🤸‍♂️",
    rarity: "legendary" as const,
    xpBonus: 1000,
  },
} as const;

// ====================
// DICAS DE PROGRESSÃO POR NÍVEL
// ====================

export const PULL_PROGRESSION_TIPS = {
  beginner: [
    "Comece com exercícios isométricos (segurar) para construir força de preensão",
    "Pratique movimentos escapulares diariamente - são fundamentais para barras",
    "Use assistências progressivas: elásticos, máquinas, apoios",
    "Foque na cadência lenta nas negativas para construir força excêntrica",
    "A remada australiana é perfeita para iniciantes construírem força de costas",
  ],
  intermediate: [
    "Transite gradualmente da assistência para barras completas",
    "Varie as pegadas: pronada, supinada, neutra para desenvolvimento equilibrado",
    "Incorpore pausas nos movimentos para aumentar tempo sob tensão",
    "As argolas aumentam a instabilidade e fortalecem estabilizadores",
    "O chest-to-bar desenvolve força explosiva superior",
  ],
  advanced: [
    "Movimentos assimétricos como archer pull-up desenvolvem força unilateral",
    "L-sit aumenta drasticamente a dificuldade do core",
    "Peso adicional acelera progressão quando dominar forma perfeita",
    "Muscle-ups requerem coordenação e potência máxima",
    "Front levers demandam força relativa excepcional",
  ],
  extreme: [
    "One-arm pull-ups exigem força unilateral máxima",
    "Movimentos com peso são para atletas avançados",
    "Ring muscle-ups combinam força e controle",
    "Front lever raises são extremamente desafiadores",
    "Movimentos de 360° exigem coordenação excepcional",
  ],
} as const;

// ====================
// DICAS DE FORMA POR EXERCÍCIO
// ====================

export const PULL_FORM_TIPS = {
  general: [
    "Mantenha o core contraído durante todo o movimento",
    "Evite balançar o corpo (kipping) em barras completas",
    "Desça controladamente - a fase excêntrica constrói mais força",
    "Mantenha os ombros afastados das orelhas",
    "Respire no topo do movimento, expire durante a subida",
  ],
  scapular: [
    "Sinta as escápulas se aproximando na coluna",
    "Não levante os ombros - foque no movimento das escápulas",
    "Mantenha os braços retos durante o exercício",
    "Imagine 'dar de ombros' para cima e para trás",
  ],
  pullup: [
    "Inicie com os braços totalmente estendidos",
    "Puxe os cotovelos para baixo, não para trás",
    "Toque o peito na barra (chest-to-bar) quando possível",
    "Controle a descida - não caia abruptamente",
    "Mantenha o corpo reto, sem dobrar os quadris",
  ],
  lever: [
    "Mantenha o corpo completamente reto como uma prancha",
    "Gire os ombros para manter o corpo horizontal",
    "Contraia todos os músculos estabilizadores",
    "Respire calmamente - tensão isométrica é alta",
  ],
} as const;
