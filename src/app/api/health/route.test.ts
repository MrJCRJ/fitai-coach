import { describe, it, expect } from "vitest";
import { GET } from "./route";

describe("GET /api/health", () => {
  it("returns status ok and timestamp", async () => {
    const resp = await GET();
    expect(resp).toBeInstanceOf(Response);
    const text = await resp.text();
    const data = JSON.parse(text);
    expect(data).toHaveProperty("status", "ok");
    expect(data).toHaveProperty("timestamp");
  });
});
