import { describe, expect, it } from "bun:test";
import { stripDiacritics } from "../strip-diacritics";

describe("stripDiacritics", () => {
  it("removes diacritic marks from a given string.", () => {
    expect(stripDiacritics("")).toBe("");
    expect(stripDiacritics("àÉ-ï_ó û")).toBe("ae-i_o u");
    expect(stripDiacritics("Què-és-lassociació-catalana-de-lorgue")).toBe(
      "que-es-lassociacio-catalana-de-lorgue",
    );
  });
});
