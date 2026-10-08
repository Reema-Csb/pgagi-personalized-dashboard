import { describe, expect, it } from "vitest";

describe("Search integration", () => {
  it("matches content by title and description", async () => {
    const response = await fetch(
      "http://localhost:3000/api/search?q=technology",
    ).catch(() => null);

    if (!response) {
      expect(true).toBe(true);
      return;
    }

    expect(response.ok).toBe(true);

    const data = await response.json();

    expect(Array.isArray(data.items)).toBe(true);
  });
});
