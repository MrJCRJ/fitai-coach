import type { WorkoutPlan } from './types'

export async function generateWorkout(profile: any): Promise<WorkoutPlan> {
  // This is a lightweight stub for the DeepSeek API.
  // Replace with actual API integration when ready.
  return {
    planId: 'mock-plan-1',
    exercises: [
      { name: 'Push-up', reps: 10, sets: 3 },
      { name: 'Squat', reps: 15, sets: 3 }
    ],
    note: 'This is a mocked plan. Integrate DeepSeek API in src/lib/ai/deepseek.ts'
  }
}
