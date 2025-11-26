import type { WeeklyWorkout } from "./types";
import type { ChallengeWorkout, ChallengeResult } from "../challengeWorkout";
import {
  processAssessmentData,
  type UserAssessmentData,
  type RawAssessmentAnswers,
} from "./assessmentProcessor";
import { type ProgressionCriteria } from "./progressionAnalyzer";
import { processChallengeResults } from "./challengeProcessor";
import {
  generateChallengePrompt,
  generateWorkoutPlanPrompt,
  addChallengeResultsToPrompt,
  addProgressSummaryToPrompt,
} from "./workoutPrompts";
import { callDeepSeekApi } from "./apiClient";

// Re-export interfaces para manter compatibilidade
export type { UserAssessmentData, ProgressionCriteria };

export async function generatePersonalizedChallenge(
  userProfile: Record<string, unknown>
): Promise<ChallengeWorkout> {
  // Processar dados da avaliação para formato estruturado
  const processedData = processAssessmentData(
    userProfile as unknown as RawAssessmentAnswers
  );
  const prompt = generateChallengePrompt(processedData);

  const response = await callDeepSeekApi<ChallengeWorkout>({
    prompt,
    temperature: 0.7,
    maxTokens: 1500,
  });

  if (!response.success) {
    throw new Error(response.error || "Erro na API DeepSeek");
  }

  return response.data!;
}

export async function generateWeeklyWorkoutPlan(
  userProfile: Record<string, unknown>,
  progressSummary?: string,
  challengeResults?: ChallengeResult[]
): Promise<WeeklyWorkout> {
  // Processar dados da avaliação para formato estruturado
  const processedData = processAssessmentData(
    userProfile as unknown as RawAssessmentAnswers
  );

  let prompt = generateWorkoutPlanPrompt(processedData);

  if (challengeResults && challengeResults.length > 0) {
    const challengeSummary = processChallengeResults(challengeResults);
    prompt = addChallengeResultsToPrompt(prompt, challengeSummary);
  }

  if (progressSummary) {
    prompt = addProgressSummaryToPrompt(prompt, progressSummary);
  }

  const response = await callDeepSeekApi<WeeklyWorkout>({
    prompt,
    temperature: 0.7,
    maxTokens: 2500,
  });

  if (!response.success) {
    throw new Error(response.error || "Erro na API DeepSeek");
  }

  return response.data!;
}
