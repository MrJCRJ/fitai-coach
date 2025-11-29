import type { Exercise } from "@/lib/exercises";
import { beginnerPushups } from "@/lib/exercises/variations/pushups/beginner";
import { intermediatePushups } from "@/lib/exercises/variations/pushups/intermediate";
import { advancedPushups } from "@/lib/exercises/variations/pushups/advanced";
import { extremePushups } from "@/lib/exercises/variations/pushups/extreme";
import { canUnlockVariation } from "@/lib/exercises/exerciseUtils";

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
  totalSets: number,
): boolean {
  return canUnlockVariation(level, totalSets, "pushup", pushUpVariations);
}
