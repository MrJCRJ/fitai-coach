export interface PushupChallenge {
  id: string;
  title: string;
  rule: string;
  rewardBadgeId: string;
}

export const PUSHUP_CHALLENGES: PushupChallenge[] = [
  {
    id: "daily-streak",
    title: "Sequência Diária",
    rule: "Complete pelo menos 1 série de flexões por 7 dias consecutivos",
    rewardBadgeId: "streak-warrior",
  },
  {
    id: "explosive-emom",
    title: "EMOM Explosivo",
    rule: "Complete 5 flexões explosivas a cada minuto por 10 minutos",
    rewardBadgeId: "explosive-beginner",
  },
  {
    id: "planche-amrap",
    title: "AMRAP Planche",
    rule: "Quantas flexões planche você consegue em 5 minutos?",
    rewardBadgeId: "planche-legend",
  },
  {
    id: "clap-challenge",
    title: "Desafio das Palmas",
    rule: "Complete 10 flexões com palmas duplas em sequência",
    rewardBadgeId: "clap-master",
  },
];
