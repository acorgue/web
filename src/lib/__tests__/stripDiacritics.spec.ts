import { describe, expect, it } from "bun:test";
import { stripDiacritics } from "../stripDiacritics";

describe("stripDiacritics", () => {
  it("removes diacritic marks from a given string.", () => {
    expect(stripDiacritics("àÉ-ï_ó û")).toBe("aE-i_o u");
    expect(stripDiacritics("què-és-lassociació-catalana-de-lorgue")).toBe(
      "que-es-lassociacio-catalana-de-lorgue",
    );
  });
});
