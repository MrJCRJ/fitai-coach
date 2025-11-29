"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Exercise } from "@/lib/exercises";
import { getMinReps, formatTime } from "@/lib/exerciseUtils";
import SavedSets from "./SavedSets";

interface ExerciseControlsProps {
  exerciseId: string;
  exercise: Exercise;
  activeTimer: string | null;
  timers: { [key: string]: number };
  currentSession: {
    [key: string]: {
      sets: {
        reps: number;
        time: number;
        level: number;
        exerciseName: string;
        restTime?: number;
      }[];
      totalTime: number;
    };
  };
  onStartTimer: (exerciseId: string) => void;
  onStopTimer: (exerciseId: string) => void;
  onSaveProgress: (
    exerciseId: string,
    reps: number,
    weight?: number,
    exercise?: Exercise,
    selectedDifficulty?: string,
  ) => void;
}

export default function ExerciseControls({
  exerciseId,
  exercise,
  activeTimer,
  timers,
  currentSession,
  onStartTimer,
  onStopTimer,
  onSaveProgress,
}: ExerciseControlsProps) {
  const [useWeight, setUseWeight] = useState(false);
  const [weight, setWeight] = useState<number>(0);
  const [expandedSet, setExpandedSet] = useState<number | null>(null);

  // Sincronizar checkbox com input de peso
  useEffect(() => {
    const weightInput = document.getElementById(
      `weight-${exerciseId}`,
    ) as HTMLInputElement;
    if (weightInput) {
      weightInput.disabled = !useWeight;
      if (!useWeight) {
        weightInput.value = "";
      }
    }
  }, [useWeight, exerciseId]);

  const handleWeightToggle = (checked: boolean) => {
    setUseWeight(checked);
    if (!checked) {
      setWeight(0);
    }
  };

  const handleSaveProgress = () => {
    const reps = parseInt(
      (document.getElementById(`reps-${exerciseId}`) as HTMLInputElement)
        ?.value || "0",
    );
    const weightToSave = useWeight ? weight : undefined;
    onSaveProgress(exerciseId, reps, weightToSave, exercise, undefined);
  };

  return (
    <div className="space-y-3">
      <input
        type="number"
        min="1"
        defaultValue={getMinReps(exercise.reps)}
        className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-center"
        id={`reps-${exerciseId}`}
      />

      {/* Weight Control */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={useWeight}
            onChange={(e) => handleWeightToggle(e.target.checked)}
            className="rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
          />
          Usar peso adicional
        </label>
        <input
          type="number"
          min="0"
          step="0.5"
          placeholder="Peso em kg (ex: 5.5)"
          value={weight || ""}
          onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
          className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!useWeight}
        />
      </div>

      <div className="flex gap-2">
        {activeTimer === exerciseId ? (
          <Button
            onClick={() => onStopTimer(exerciseId)}
            variant="outline"
            className="flex-1"
          >
            Parar Timer
          </Button>
        ) : (
          <Button onClick={() => onStartTimer(exerciseId)} className="flex-1">
            Iniciar Timer
          </Button>
        )}
        <Button
          onClick={handleSaveProgress}
          variant="outline"
          disabled={activeTimer !== exerciseId}
          className={
            activeTimer !== exerciseId ? "opacity-50 cursor-not-allowed" : ""
          }
        >
          Salvar Set
        </Button>
      </div>

      {/* Saved Sets */}
      <SavedSets
        exerciseId={exerciseId}
        currentSession={currentSession}
        expandedSet={expandedSet}
        setExpandedSet={setExpandedSet}
      />

      {activeTimer === exerciseId && (
        <Badge variant="success" className="justify-center">
          {formatTime(timers[exerciseId] || 0)}
        </Badge>
      )}
    </div>
  );
}
