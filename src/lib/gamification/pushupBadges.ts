export interface PushupBadge {
  id: string;
  title: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  emoji: string;
}

export const PUSHUP_BADGES: PushupBadge[] = [
  {
    id: "first-pushup",
    title: "Primeira Flexão",
    description: "Complete sua primeira série de flexões",
    rarity: "common",
    emoji: "💪",
  },
  {
    id: "wall-master",
    title: "Mestre da Parede",
    description: "Complete 100 séries de flexões na parede",
    rarity: "common",
    emoji: "🧱",
  },
  {
    id: "explosive-beginner",
    title: "Explosão Inicial",
    description: "Complete 50 séries de flexões explosivas",
    rarity: "rare",
    emoji: "💥",
  },
  {
    id: "clap-master",
    title: "Mestre das Palmas",
    description: "Complete 100 séries de flexões com palmas",
    rarity: "epic",
    emoji: "👏",
  },
  {
    id: "planche-holder",
    title: "Segurador de Planche",
    description: "Mantenha planche por 30 segundos",
    rarity: "rare",
    emoji: "🤸",
  },
  {
    id: "streak-warrior",
    title: "Guerreiro da Sequência",
    description: "Complete flexões por 7 dias consecutivos",
    rarity: "epic",
    emoji: "🔥",
  },
  {
    id: "diamond-warrior",
    title: "Guerreiro do Diamante",
    description: "Complete 200 séries de flexões diamante",
    rarity: "epic",
    emoji: "💎",
  },
  {
    id: "archer-elite",
    title: "Elite dos Arqueiros",
    description: "Complete 300 séries de flexões arqueiro",
    rarity: "legendary",
    emoji: "🏹",
  },
  {
    id: "planche-legend",
    title: "Lenda da Planche",
    description: "Complete 500 séries de flexões planche",
    rarity: "legendary",
    emoji: "👑",
  },
  {
    id: "pushup-god",
    title: "Deus das Flexões",
    description: "Alcance o nível máximo de flexões",
    rarity: "legendary",
    emoji: "⚡",
  },
];
