import { describe, it, expect } from "vitest";
import {
  calculateSquatLevel,
  getSetsToNextSquatLevel,
  getUnlockedSquatVariations,
} from "./utils/gamificationUtils";
import type { Exercise } from "@/lib/exercises";

describe("squat level utilities", () => {
  it("calculateSquatLevel should return correct levels at thresholds", () => {
    expect(calculateSquatLevel(0)).toBe(0);
    expect(calculateSquatLevel(9)).toBe(0);
    expect(calculateSquatLevel(10)).toBe(1);
    expect(calculateSquatLevel(24)).toBe(1);
    expect(calculateSquatLevel(25)).toBe(2);
    expect(calculateSquatLevel(12800)).toBe(12);
  });

  it("getSetsToNextSquatLevel should return sets required to reach next threshold", () => {
    expect(getSetsToNextSquatLevel(0)).toBe(10); // next threshold 10
    expect(getSetsToNextSquatLevel(10)).toBe(15); // next threshold 25
    expect(getSetsToNextSquatLevel(12800)).toBe(0); // at max
  });

  it("getUnlockedSquatVariations should return expected count of unlocked exercises", () => {
    const variations: Record<number, Exercise> = {
      1: {
        id: "a",
        name: "a",
        muscleGroup: "legs",
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
        muscleGroup: "legs",
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
        muscleGroup: "legs",
        difficulty: "advanced",
        sets: 3,
        reps: "8-12",
        rest: "60s",
        instructions: "",
        equipment: [],
      },
    };

    // totalSets 0 -> level 0 -> no variation unlocked when thresholds start at 10
    expect(getUnlockedSquatVariations(0, variations).length).toBe(0);
    // totalSets 50 -> falls into a higher level; expect at least 2 variations unlocked
    expect(
      getUnlockedSquatVariations(50, variations).length,
    ).toBeGreaterThanOrEqual(2);
  });
});
