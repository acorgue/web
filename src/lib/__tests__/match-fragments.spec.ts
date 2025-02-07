import { describe, expect, it } from "bun:test";
import { matchFragments } from "../match-fragments";

describe("matchFragments", () => {
  it("returns whether any given fragment matches the query.", () => {
    expect(matchFragments([], "test")).toBe(false);
    expect(
      matchFragments(["tested? fragment!", "example", "sample"], "test"),
    ).toBe(true);
    expect(matchFragments(["example", "sample"], "test")).toBe(false);
  });
});
