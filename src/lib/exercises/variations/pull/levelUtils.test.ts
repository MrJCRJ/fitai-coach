import { describe, it, expect } from "vitest";
import {
  calculatePullLevel,
  getSetsToNextPullLevel,
  getUnlockedPullVariations,
} from "./utils/gamificationUtils";
import type { Exercise } from "@/lib/exercises";

describe("pull level utilities", () => {
  it("calculatePullLevel should return correct levels at thresholds", () => {
    expect(calculatePullLevel(0)).toBe(1);
    expect(calculatePullLevel(7)).toBe(1);
    expect(calculatePullLevel(8)).toBe(2);
    expect(calculatePullLevel(24)).toBe(2);
    expect(calculatePullLevel(25)).toBe(3);
    expect(calculatePullLevel(12800)).toBe(12);
  });

  it("getSetsToNextPullLevel should return sets required to reach next threshold", () => {
    expect(getSetsToNextPullLevel(7)).toBe(1); // next threshold 8
    expect(getSetsToNextPullLevel(8)).toBe(17); // next threshold 25
    expect(getSetsToNextPullLevel(12800)).toBe(0); // at max
  });

  it("getUnlockedPullVariations should return expected count of unlocked exercises", () => {
    const variations: Record<number, Exercise> = {
      1: {
        id: "a",
        name: "a",
        muscleGroup: "back",
        difficulty: "beginner",
        sets: 3,
        reps: "8-12",
        rest: "60s",
        instructions: "",
        equipment: [],
      },
      2: {
        id: "b",
        name: "b",
        muscleGroup: "back",
        difficulty: "intermediate",
        sets: 3,
        reps: "8-12",
        rest: "60s",
        instructions: "",
        equipment: [],
      },
      3: {
        id: "c",
        name: "c",
        muscleGroup: "back",
        difficulty: "advanced",
        sets: 3,
        reps: "8-12",
        rest: "60s",
        instructions: "",
        equipment: [],
      },
    };

    // if totalSets is 0 -> level 1 -> the first variation should be unlocked
    expect(getUnlockedPullVariations(0, variations).length).toBe(1);
    // totalSets 50 -> falls between thresholds -> bigger level
    expect(
      getUnlockedPullVariations(50, variations).length,
    ).toBeGreaterThanOrEqual(2);
  });
});
