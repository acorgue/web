import { stripDiacritics } from "./stripDiacritics";

export function normalizeString(string: string) {
  return stripDiacritics(string).replace(/[^\w\d ]/g, "");
}
