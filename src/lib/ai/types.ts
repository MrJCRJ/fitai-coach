export interface Exercise {
  name: string;
  reps?: number | null;
  sets?: number;
  durationSeconds?: number;
}

export interface WorkoutPlan {
  planId: string;
  exercises: Exercise[];
  note?: string;
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

export interface WeeklyWorkout {
  week: number;
  workouts: Workout[];
}

export interface MonthlyWorkoutPlan {
  weeks: WeeklyWorkout[];
}

export interface ExerciseExecution {
  exerciseId: string;
  plannedReps: number;
  actualReps: number;
  plannedSets: number;
  actualSets: number;
  completed: boolean;
}

export interface WorkoutExecution {
  workoutId: string;
  date: string;
  exercises: ExerciseExecution[];
  totalCompletion: number; // % de conclusão
}

export interface WeeklyProgress {
  week: number;
  workouts: WorkoutExecution[];
  summary: string; // Gerado automaticamente
}

export default WorkoutPlan;
