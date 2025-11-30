import { describe, it, expect } from "vitest";
import { parseRepRange } from "./gamificationUtils";

describe("gamificationUtils parseRepRange", () => {
  it("parses string rep ranges", () => {
    const r = parseRepRange("8-12");
    expect(r).toEqual({ min: 8, max: 12 });
  });

  it("returns fallback for invalid strings", () => {
    const r = parseRepRange("invalid");
    expect(r).toEqual({ min: 8, max: 12 });
  });

  it("returns object unchanged", () => {
    const input = { min: 5, max: 10 } as const;
    const r = parseRepRange(input);
    expect(r).toEqual({ min: 5, max: 10 });
  });
});
