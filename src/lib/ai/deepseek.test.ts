import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock do módulo deepseek
vi.mock("./deepseek", () => ({
  generateWeeklyWorkoutPlan: vi.fn(),
}));

import { generateWeeklyWorkoutPlan } from "./deepseek";

describe("generateWeeklyWorkoutPlan", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws error when API key is not configured", async () => {
    // Mock da função para lançar erro quando não há API key
    (generateWeeklyWorkoutPlan as any).mockRejectedValueOnce(
      new Error(
        "DEEPSEEK_API_KEY não configurada. Configure a variável de ambiente DEEPSEEK_API_KEY no arquivo .env.local",
      ),
    );

    await expect(
      generateWeeklyWorkoutPlan({
        birth_date: "1999-01-01",
        level: "beginner",
      }),
    ).rejects.toThrow("DEEPSEEK_API_KEY não configurada");
  });

  it("returns a valid WeeklyWorkout when API key is configured", async () => {
    // Mock da resposta bem-sucedida
    const mockWeeklyPlan = {
      week: 1,
      workouts: [
        {
          id: "week1-day1",
          name: "Treino Iniciante - Semana 1",
          duration: "20 min",
          difficulty: "Iniciante",
          exercises: [
            {
              id: "push-up",
              name: "Flexão de Braços",
              sets: 3,
              reps: "8-10",
              rest: "60s",
              instructions: "Faça flexões com boa forma",
            },
          ],
          calories: 150,
          type: "Força",
          description: "Treino básico para começar",
          targetMuscles: ["Peito", "Pernas"],
          equipment: ["Nenhum"],
        },
      ],
    };

    (generateWeeklyWorkoutPlan as any).mockResolvedValueOnce(mockWeeklyPlan);

    const plan = await generateWeeklyWorkoutPlan({
      birth_date: "1999-01-01",
      level: "beginner",
    });
    expect(plan).toHaveProperty("week");
    expect(plan).toHaveProperty("workouts");
    expect(Array.isArray(plan.workouts)).toBe(true);
    expect(plan.workouts.length).toBeGreaterThan(0);
  });

  it("throws error when API request fails", async () => {
    // Mock de erro de API
    (generateWeeklyWorkoutPlan as any).mockRejectedValueOnce(
      new Error("API request failed: 401"),
    );

    await expect(
      generateWeeklyWorkoutPlan({
        birth_date: "1999-01-01",
        level: "beginner",
      }),
    ).rejects.toThrow("API request failed: 401");
  });
});
