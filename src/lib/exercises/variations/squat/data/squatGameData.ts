// DADOS DO JOGO - MÓDULO SQUAT (sem gamificação)

// Thresholds de progresso baseados em sets cumulativos
export const SQUAT_THRESHOLDS = [
  10, 25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 12800,
] as const;

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
