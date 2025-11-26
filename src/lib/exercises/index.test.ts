import { describe, it, expect } from "vitest";
import {
  getAllExercises,
  getExerciseById,
  getExercisesByMuscleGroup,
  exercisesDatabase,
} from "./index";

describe("exercises database utilities", () => {
  it("getAllExercises returns a non-empty array", () => {
    const all = getAllExercises();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
  });

  it("getExercisesByMuscleGroup returns chest exercises", () => {
    const chest = getExercisesByMuscleGroup("chest");
    expect(Array.isArray(chest)).toBe(true);
    expect(chest.length).toBeGreaterThan(0);
  });

  it("getExerciseById returns known exercise", () => {
    // pick a known id from chest exercises
    const known = exercisesDatabase.chest?.[0];
    expect(known).toBeDefined();
    if (known) {
      const found = getExerciseById(known.id);
      expect(found).toBeDefined();
      expect(found?.id).toBe(known.id);
    }
  });
});
