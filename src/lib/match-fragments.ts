import { normalizeString } from "./normalize-string";

export function matchFragments(
  parts: (string | undefined)[],
  normalizedQuery: string,
) {
  return parts
    .filter((nom) => nom !== undefined)
    .some((part) => normalizeString(part).includes(normalizedQuery));
}
