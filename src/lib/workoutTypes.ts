// Tipos detalhados para salvamento de exercícios
export interface DetailedSet {
  id: string; // UUID único para o set
  order: number; // Ordem do set (1, 2, 3...)
  reps: number; // Número de repetições realizadas
  targetReps: number; // Número de repetições alvo (do nível)
  duration: number; // Duração total do set em segundos
  weight?: number; // Peso utilizado (opcional)
  restTime?: number | undefined; // Tempo de descanso antes deste set
  startTime: string; // Timestamp ISO quando iniciou
  endTime: string; // Timestamp ISO quando terminou
  perceivedDifficulty?: 1 | 2 | 3 | 4 | 5 | undefined; // Dificuldade percebida (1=fácil, 5=muito difícil)
  notes?: string | undefined; // Notas opcionais do usuário
  completed: boolean; // Se foi completado com sucesso
}

export interface DetailedExercise {
  id: string; // ID único do exercício na sessão
  exerciseId: string; // ID do tipo (flexao, barra, agachamento)
  name: string; // Nome completo
  muscleGroup: "pushup" | "pullup" | "squat" | "dip";
  level: number; // Nível atual
  sets: DetailedSet[]; // Array detalhado dos sets
  totalDuration: number; // Tempo total gasto neste exercício
  startTime: string; // Quando começou o primeiro set
  endTime?: string; // Quando terminou o último set
  totalReps: number; // Total de reps realizadas
  completedSets: number; // Sets completados com sucesso
  skippedSets: number; // Sets pulados/incompletos
}

export interface DetailedWorkoutSession {
  id: string; // UUID único da sessão
  date: string; // Data ISO da sessão
  startTime: string; // Hora de início
  endTime?: string; // Hora de fim
  duration: number; // Duração total em segundos
  exercises: DetailedExercise[]; // Array dos exercícios realizados
  totalSets: number; // Total de sets realizados
  totalReps: number; // Total de repetições
  averageSetDuration: number; // Duração média dos sets
  restTimeTotal: number; // Tempo total de descanso
  completed: boolean; // Se a sessão foi completada
  notes?: string; // Notas da sessão
  version: string; // Versão do app que salvou
}
