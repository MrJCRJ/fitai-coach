// PULL - DADOS DE REFERÊNCIA (sem gamificação)

export const PULL_THRESHOLDS = [
  0, 8, 25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800,
] as const;

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
