import { describe, it, expect } from "vitest";
import { getExercisesByDifficulty, getExercisesByMuscleGroup } from "./index";

describe("exercises by difficulty and muscle group", () => {
  it("returns an array for beginner difficulty", () => {
    const beginnerExercises = getExercisesByDifficulty("beginner");
    expect(Array.isArray(beginnerExercises)).toBe(true);
    // If the dataset has at least one beginner exercise
    if (beginnerExercises.length > 0) {
      expect(beginnerExercises.every((e) => e.difficulty === "beginner")).toBe(
        true,
      );
    }
  });

  it("returns empty array for unknown muscle group", () => {
    const unknown = getExercisesByMuscleGroup("unknown-group");
    expect(Array.isArray(unknown)).toBe(true);
    expect(unknown.length).toBe(0);
  });
});
