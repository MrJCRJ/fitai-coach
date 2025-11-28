// ====================
// DADOS DO JOGO - MÓDULO SQUAT
// ====================

import { Achievement } from "../../../types";

// Thresholds de progresso baseados em sets cumulativos
export const SQUAT_THRESHOLDS = [
  10, // Nível 1 - Iniciante
  25, // Nível 2
  50, // Nível 3
  100, // Nível 4
  200, // Nível 5
  400, // Nível 6
  800, // Nível 7
  1600, // Nível 8
  3200, // Nível 9
  6400, // Nível 10
  12800, // Nível 11
  12800, // Nível 12 - Mestre
] as const;

// Conquistas específicas para squats
export const SQUAT_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_wall_sit",
    name: "Primeiro Wall Sit",
    description: "Complete seu primeiro wall sit de 20 segundos",
    xpReward: 25,
    icon: "🧱",
    condition: {
      type: "sets_completed",
      exerciseType: "squat",
      value: 1,
    },
  },
  {
    id: "air_squat_master",
    name: "Mestre do Air Squat",
    description: "Complete 100 air squats perfeitos",
    xpReward: 50,
    icon: "💨",
    condition: {
      type: "sets_completed",
      exerciseType: "squat",
      value: 100,
    },
  },
  {
    id: "pistol_pioneer",
    name: "Pioneiro do Pistol",
    description: "Complete seu primeiro pistol squat assistido",
    xpReward: 75,
    icon: "🔫",
    condition: {
      type: "sets_completed",
      exerciseType: "squat",
      value: 10,
    },
  },
  {
    id: "deep_squat_warrior",
    name: "Guerreiro do Agachamento Profundo",
    description: "Alcance profundidade completa no air squat",
    xpReward: 100,
    icon: "🗡️",
    condition: {
      type: "sets_completed",
      exerciseType: "squat",
      value: 50,
    },
  },
  {
    id: "explosive_power",
    name: "Poder Explosivo",
    description: "Complete 50 jump squats explosivos",
    xpReward: 125,
    icon: "💥",
    condition: {
      type: "sets_completed",
      exerciseType: "squat",
      value: 50,
    },
  },
  {
    id: "unilateral_master",
    name: "Mestre Unilateral",
    description: "Domine pistol e shrimp squats",
    xpReward: 150,
    icon: "🏆",
    condition: {
      type: "sets_completed",
      exerciseType: "squat",
      value: 200,
    },
  },
  {
    id: "weighted_warrior",
    name: "Guerreiro Ponderado",
    description: "Complete 200 squats com peso",
    xpReward: 200,
    icon: "🏋️‍♂️",
    condition: {
      type: "sets_completed",
      exerciseType: "squat",
      value: 200,
    },
  },
  {
    id: "legendary_depth",
    name: "Profundidade Lendária",
    description: "Alcance mobilidade extrema nos squats",
    xpReward: 250,
    icon: "👑",
    condition: {
      type: "sets_completed",
      exerciseType: "squat",
      value: 1000,
    },
  },
];

// Badges por categoria
export const SQUAT_BADGES = {
  isometric: "🧱",
  mobility: "🦵",
  explosive: "💥",
  unilateral: "🏆",
  weighted: "🏋️‍♂️",
  advanced: "👑",
} as const;

// Dicas de progressão por dificuldade
export const SQUAT_PROGRESSION_TIPS = {
  beginner: [
    "Foque na profundidade gradual - qualidade sobre quantidade",
    "Use apoios para construir confiança na técnica",
    "Pratique diariamente para melhorar mobilidade",
    "Mantenha os joelhos alinhados com os pés",
  ],
  intermediate: [
    "Transite para variações sem apoio gradualmente",
    "Incorpore pausas para força isométrica",
    "Explore mobilidade lateral com cossack squats",
    "Adicione explosividade controlada",
  ],
  advanced: [
    "Domine variações unilaterais com baixa repetição",
    "Incorpore peso quando a técnica for perfeita",
    "Foque em profundidade extrema e mobilidade",
    "Combine força com controle explosivo",
  ],
  extreme: [
    "Priorize qualidade técnica sobre volume",
    "Use progressões controladas para movimentos lendários",
    "Mantenha consistência na forma perfeita",
    "Foco em força unilateral e controle absoluto",
  ],
} as const;

// Dicas específicas de forma por exercício
export const SQUAT_FORM_TIPS = {
  wall_sit: [
    "Mantenha as costas coladas na parede",
    "Joelhos em 90° - não force além do confortável",
    "Pés afastados na largura dos ombros",
    "Respire calmamente - tensão isométrica é alta",
  ],
  air_squat: [
    "Pés afastados na largura dos ombros",
    "Joelhos acompanham a direção dos pés",
    "Profundidade: glúteos abaixo dos joelhos",
    "Mantenha peito ereto e core contraído",
  ],
  pistol_squat: [
    "Perna de apoio totalmente estendida",
    "Braço oposto estendido para equilíbrio",
    "Desça controladamente até o glúteo tocar o calcanhar",
    "Mantenha equilíbrio perfeito durante todo o movimento",
  ],
  shrimp_squat: [
    "Perna de trás pega pelo calcanhar",
    "Mantenha perna de trás próxima ao corpo",
    "Desça até o joelho quase tocar o chão",
    "Core contraído para estabilidade",
  ],
  cossack_squat: [
    "Pés mais largos que os ombros",
    "Peso transferido para o lado alvo",
    "Mantenha perna oposta estendida",
    "Profundidade máxima sem perder forma",
  ],
  bulgarian_split: [
    "Pé traseiro elevado em superfície estável",
    "Joelho dianteiro não passa da ponta do pé",
    "Mantenha torso ereto",
    "Desça até o joelho traseiro quase tocar o chão",
  ],
  jump_squat: [
    "Aterrisse suavemente com joelhos flexionados",
    "Mantenha controle durante a descida",
    "Use explosão controlada - não sacuda",
    "Pés firmes no chão após o pouso",
  ],
} as const;
