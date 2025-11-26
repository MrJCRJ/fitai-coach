import { describe, it, expect } from "vitest";
import { validateRawAssessment } from "./schemas";

describe("validateRawAssessment", () => {
  it("accepts valid raw assessment", () => {
    const valid = {
      birth_date: "1990-01-01",
      weight: 70,
      height: 175,
      experience: "some experience",
      fitness_level: 5,
      frequency: "3x per week",
      goal: "build muscle",
      limitations: "none",
      time_per_session: "45 minutes",
    };

    const parsed = validateRawAssessment(valid);
    expect(parsed.birth_date).toBe(valid.birth_date);
    expect(parsed.weight).toBe(valid.weight);
  });

  it("throws on missing fields", () => {
    const invalid = {
      weight: 70,
      height: 175,
    } as unknown;
    expect(() => validateRawAssessment(invalid)).toThrow();
  });
});
