import { stripDiacritics } from "./strip-diacritics";

export function normalizeString(string: string) {
  return stripDiacritics(string).replace(/[^\w\d ]/g, "");
}
