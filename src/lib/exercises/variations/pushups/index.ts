import type { Exercise } from "@/lib/exercises";
import { beginnerPushups } from "./beginner";
import { intermediatePushups } from "./intermediate";
import { advancedPushups } from "./advanced";
import { extremePushups } from "./extreme";
import { canUnlockVariation } from "../../exerciseUtils";

export const pushUpVariations: Record<number, Exercise> = {
  ...beginnerPushups,
  ...intermediatePushups,
  ...advancedPushups,
  ...extremePushups,
};

// Export individual difficulty levels for carousel organization
export {
  beginnerPushups,
  intermediatePushups,
  advancedPushups,
  extremePushups,
};

export function canUnlockPushUpVariation(
  level: number,
  totalSets: number
): boolean {
  return canUnlockVariation(level, totalSets, "pushup", pushUpVariations);
}
