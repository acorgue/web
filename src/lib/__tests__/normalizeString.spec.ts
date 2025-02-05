import { describe, expect, it } from "bun:test";
import { normalizeString } from "../normalizeString";

describe("normalizeString", () => {
  it("removes diacritic marks from a given string.", () => {
    expect(normalizeString("àÉ-ï_ó û")).toBe("aei_o u");
    expect(normalizeString("Què és l’Associació-catalana-de-lorgue?¡/()")).toBe(
      "que es lassociaciocatalanadelorgue",
    );
  });
});
