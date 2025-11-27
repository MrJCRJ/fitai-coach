"use client";

import { DetailedSet } from "@/lib/workoutTypes";

interface SetBadgeProps {
  set: DetailedSet;
}

export function SetBadge({ set }: SetBadgeProps) {
  return (
    <div
      className={`text-xs px-2 py-1 rounded ${
        set.completed
          ? "bg-green-600/20 text-green-400 border border-green-600/30"
          : "bg-red-600/20 text-red-400 border border-red-600/30"
      }`}
      title={`Set ${set.order}: ${set.reps}/${set.targetReps} reps, ${set.duration}s`}
    >
      {set.reps}/{set.targetReps}
    </div>
  );
}
