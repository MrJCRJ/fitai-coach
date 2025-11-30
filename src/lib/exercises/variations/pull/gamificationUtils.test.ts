import { describe, it, expect } from "vitest";
import { createPullExercise } from "./utils/gamificationUtils";
import type { Exercise } from "@/lib/exercises";

describe("createPullExercise neutral constructor", () => {
  it("returns exercise object with estimatedTime and unlockRequirements", () => {
    const base: Partial<Exercise> = {
      id: "test_pull",
      name: "Test Pull",
      sets: 3,
      reps: "5-8",
      equipment: ["Barra"],
    };

    const unlockRequirements = [
      {
        type: "sets" as const,
        exerciseType: "pullup" as const,
        value: 50,
        description: "test",
      },
    ];

    const ex = createPullExercise(
      base as Exercise,
      99,
      1800,
      unlockRequirements,
      "advanced",
    );

    expect(ex.id).toBe("test_pull");
    expect(ex.name).toBe("Test Pull");
    expect(ex.estimatedTime).toBe(1800);
    expect(ex.unlockRequirements).toEqual(unlockRequirements);
    expect(ex.difficulty).toBe("advanced");
  });
});
