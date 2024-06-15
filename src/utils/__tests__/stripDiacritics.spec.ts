import { describe, expect } from "bun:test";
import { stripDiacritics } from "../stripDiacritics";

describe("stripDiacritics", () => {
  expect(stripDiacritics("àÉ-ï_ó û")).toBe("aE-i_o u");
  expect(stripDiacritics("què-és-lassociació-catalana-de-lorgue")).toBe(
    "que-es-lassociacio-catalana-de-lorgue"
  );
});
