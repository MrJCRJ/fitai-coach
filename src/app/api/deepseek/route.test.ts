import { describe, it, expect } from 'vitest'
import { POST } from './route'

describe('POST /api/deepseek', () => {
  it('returns a workout plan JSON', async () => {
    const req = new Request('http://localhost/api/deepseek', {
      method: 'POST',
      body: JSON.stringify({ profile: { age: 25, level: 'beginner' } }),
    })
    const resp = await POST(req as Request)
    expect(resp).toBeInstanceOf(Response)
    const text = await resp.text()
    const data = JSON.parse(text)
    expect(data).toHaveProperty('planId')
    expect(Array.isArray(data.exercises)).toBe(true)
  })
})
