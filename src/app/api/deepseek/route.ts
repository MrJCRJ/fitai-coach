import { generateWeeklyWorkoutPlan } from "../../../lib/ai/deepseek_v2";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const profile = body.profile ?? {};
  const progressSummary = body.progressSummary;
  const challengeResults = body.challengeResults;
  const plan = await generateWeeklyWorkoutPlan(
    profile,
    progressSummary,
    challengeResults,
  );
  return new Response(JSON.stringify(plan), {
    headers: { "Content-Type": "application/json" },
  });
}
