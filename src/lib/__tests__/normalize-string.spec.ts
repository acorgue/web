import { describe, expect, it } from "bun:test";
import { normalizeString } from "../normalize-string";

describe("normalizeString", () => {
  it("normalizes the given string.", () => {
    expect(normalizeString("")).toBe("");
    expect(normalizeString("àÉ-ï_ó û")).toBe("aei_o u");
    expect(normalizeString("Què és l’Associació-catalana-de-lorgue?¡/()")).toBe(
      "que es lassociaciocatalanadelorgue",
    );
  });
});
