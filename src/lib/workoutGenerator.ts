// REMOVIDO: Imports desnecessários - lógica movida para IA e novos utilitários

export interface AssessmentAnswers {
  birth_date: string;
  age?: number; // Calculada automaticamente
  gender: string;
  weight: number;
  height: number;
  experience: string;
  frequency: string;
  goal: string;
  limitations: string;
  fitness_level: number;
}

export interface Workout {
  id: string;
  name: string;
  duration: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  exercises: WorkoutExercise[];
  calories: number;
  type: string;
  description: string;
  targetMuscles: string[];
  equipment: string[];
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  instructions: string;
  tips?: string | undefined;
}

// REMOVIDO: generatePersonalizedWorkout - agora usamos planos mensais
// REMOVIDO: generateWorkoutFromLevel - lógica movida para IA
// REMOVIDO: Funções auxiliares de geração de treino único

// Manter apenas funções essenciais para avaliação inicial e compatibilidade
export function isAssessmentCompleted(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem("fitai-assessment-completed") === "true";
  }
  return false;
}

export function getAssessmentAnswers(): AssessmentAnswers | null {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("fitai-assessment-answers");
    return saved ? JSON.parse(saved) : null;
  }
  return null;
}

// REMOVIDO: saveGeneratedWorkout e loadGeneratedWorkout - substituídos por planos mensais
// REMOVIDO: Funções auxiliares de nome, tipo e descrição de treino

// REMOVIDO: Toda lógica de geração de treino único - substituída por planos mensais com IA
// Manter apenas interfaces e funções essenciais para avaliação inicial
