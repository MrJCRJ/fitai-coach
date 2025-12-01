"use client";

import { DetailedExercise } from "@/lib/workoutTypes";
import { SetBadge } from "./SetBadge";

interface ExerciseCardProps {
  exercise: DetailedExercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <div key={exercise.id} className="bg-slate-700/30 rounded-lg p-3">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-white font-medium">{exercise.name}</div>
          <div className="text-sm text-gray-400">{exercise.muscleGroup}</div>
        </div>
        <div className="text-right text-sm">
          <div className="text-white">{exercise.sets.length} sets</div>
          <div className="text-gray-400">{exercise.totalReps} reps</div>
        </div>
      </div>

      {/* Detalhes dos sets */}
      <div className="flex flex-wrap gap-1 mt-2">
        {exercise.sets.map((set) => (
          <SetBadge key={set.id} set={set} />
        ))}
      </div>
    </div>
  );
}
