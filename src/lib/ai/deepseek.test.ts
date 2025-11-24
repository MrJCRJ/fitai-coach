import { describe, it, expect } from 'vitest'
import { generateWorkout } from './deepseek'

describe('generateWorkout stub', () => {
  it('returns a valid WorkoutPlan', async () => {
    const plan = await generateWorkout({ age: 25, level: 'beginner' })
    expect(plan).toHaveProperty('planId')
    expect(plan).toHaveProperty('exercises')
    expect(Array.isArray(plan.exercises)).toBe(true)
    expect(plan.exercises.length).toBeGreaterThan(0)
  })
})
