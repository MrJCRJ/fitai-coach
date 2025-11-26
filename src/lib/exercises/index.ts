import type { Exercise, ExercisesDatabase } from "./exerciseTypes";
import { chestExercises } from "./chestExercises";
import { backExercises } from "./backExercises";
import { legsExercises } from "./legsExercises";
import { armsExercises } from "./armsExercises";
import { shouldersExercises } from "./shouldersExercises";
import { coreExercises } from "./coreExercises";
import { cardioExercises } from "./cardioExercises";
import { fullbodyExercises } from "./fullbodyExercises";

// Base de dados completa de exercícios organizada por grupo muscular
export const exercisesDatabase: ExercisesDatabase = {
  chest: chestExercises,
  back: backExercises,
  legs: legsExercises,
  arms: armsExercises,
  shoulders: shouldersExercises,
  core: coreExercises,
  cardio: cardioExercises,
  fullbody: fullbodyExercises,
};

// Funções auxiliares para trabalhar com a base de dados
export function getExercisesByMuscleGroup(muscleGroup: string): Exercise[] {
  return exercisesDatabase[muscleGroup as keyof typeof exercisesDatabase] || [];
}

export function getExercisesByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): Exercise[] {
  const allExercises: Exercise[] = [];
  Object.values(exercisesDatabase).forEach((exercises) => {
    allExercises.push(
      ...exercises.filter((ex: Exercise) => ex.difficulty === difficulty)
    );
  });
  return allExercises;
}

export function getExerciseById(id: string): Exercise | undefined {
  for (const muscleGroup of Object.values(exercisesDatabase)) {
    const exercise = muscleGroup.find((ex: Exercise) => ex.id === id);
    if (exercise) return exercise;
  }
  return undefined;
}

export function getAllExercises(): Exercise[] {
  const allExercises: Exercise[] = [];
  Object.values(exercisesDatabase).forEach((exercises) => {
    allExercises.push(...exercises);
  });
  return allExercises;
}

// Re-export types and constants
export type { Exercise, ExercisesDatabase, MuscleGroup } from "./exerciseTypes";
export { muscleGroups } from "./exerciseTypes";
