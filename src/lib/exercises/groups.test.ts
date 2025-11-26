import { describe, it, expect } from "vitest";
import {
  exercisesDatabase,
  getExercisesByMuscleGroup,
  getExercisesByDifficulty,
  getAllExercises,
} from "./index";
import type { Exercise } from "./index";

describe("Exercises modular database - groups and utils", () => {
  it("exports non-empty arrays for main muscle groups", () => {
    const groups = Object.keys(exercisesDatabase);
    expect(Array.isArray(groups)).toBe(true);
    expect(groups.length).toBeGreaterThan(0);
    // Ensure each group has at least one exercise
    groups.forEach((g) => {
      const arr = getExercisesByMuscleGroup(g);
      expect(Array.isArray(arr)).toBe(true);
      expect(arr.length).toBeGreaterThan(0);
    });
  });

  it("getExercisesByDifficulty returns results for 'beginner'", () => {
    const beginner = getExercisesByDifficulty("beginner");
    expect(Array.isArray(beginner)).toBe(true);
  });

  it("getAllExercises returns a superset of group arrays", () => {
    const all = getAllExercises();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
    // Make sure each individual group exercise appears in the aggregated list
    Object.values(exercisesDatabase).forEach((group: Exercise[]) => {
      group.forEach((ex: Exercise) => {
        expect(all.find((a) => a.id === ex.id)).toBeTruthy();
      });
    });
  });
});
