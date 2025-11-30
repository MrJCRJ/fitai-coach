import { describe, it, expect } from "vitest";
import { canUnlockPushUpVariation, pushUpVariations } from "./index";
import { getUnlockedVariations } from "../../gamificationUtils";
import { EXERCISE_THRESHOLDS } from "../../exerciseData";

describe("pushup level utilities", () => {
  it("canUnlockPushUpVariation should reflect unlock requirements for a level", () => {
    // level 11 requires at least 8 pushup sets per intermediate config in repo
    expect(canUnlockPushUpVariation(11, 0)).toBe(false);
    expect(canUnlockPushUpVariation(11, 8)).toBe(true);
  });

  it("getUnlockedVariations should return expected number of unlocked exercises", () => {
    // at 0 sets the first level should be unlocked by default
    expect(
      getUnlockedVariations(0, EXERCISE_THRESHOLDS, pushUpVariations).length,
    ).toBe(1);
    // at 50 sets more variations should be unlocked
    expect(
      getUnlockedVariations(50, EXERCISE_THRESHOLDS, pushUpVariations).length,
    ).toBeGreaterThanOrEqual(2);
  });
});
