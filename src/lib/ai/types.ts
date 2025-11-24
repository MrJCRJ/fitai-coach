export interface Exercise {
  name: string
  reps?: number
  sets?: number
  durationSeconds?: number
}

export interface WorkoutPlan {
  planId: string
  exercises: Exercise[]
  note?: string
}

export default WorkoutPlan
