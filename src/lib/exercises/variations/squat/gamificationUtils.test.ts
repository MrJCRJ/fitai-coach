import { describe, it, expect } from "vitest";
import { createSquatExercise } from "./utils/gamificationUtils";
import type { Exercise } from "@/lib/exercises";

describe("createSquatExercise neutral constructor", () => {
  it("returns exercise object with estimatedTime and unlockRequirements", () => {
    const base: Partial<Exercise> = {
      id: "test_squat",
      name: "Test Squat",
      sets: 3,
      reps: "8-12",
      equipment: ["Nenhum"],
    };

    const unlockRequirements = [
      {
        type: "sets" as const,
        exerciseType: "squat" as const,
        value: 10,
        description: "test",
      },
    ];

    const ex = createSquatExercise(
      base as Exercise,
      7,
      600,
      unlockRequirements,
      "intermediate",
    );

    expect(ex.id).toBe("test_squat");
    expect(ex.name).toBe("Test Squat");
    expect(ex.estimatedTime).toBe(600);
    expect(ex.unlockRequirements).toEqual(unlockRequirements);
    expect(ex.difficulty).toBe("intermediate");
  });
});
