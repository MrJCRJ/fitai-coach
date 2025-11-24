import { generateWorkout } from '../../../lib/ai/deepseek'

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const profile = body.profile ?? {}
  const plan = await generateWorkout(profile)
  return new Response(JSON.stringify(plan), { headers: { 'Content-Type': 'application/json' } })
}
