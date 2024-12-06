/**
 * Removes diacritic marks from a given string.
 *
 * This function normalizes the input string to its decomposed form (NFD),
 * which separates base characters from their diacritical marks. It then
 * removes all diacritic marks using a regular expression that matches
 * Unicode diacritic characters.
 *
 * @param string The input string from which diacritics will be removed.
 * @returns The resulting string with diacritic marks removed.
 */
export function stripDiacritics(string: string) {
  return string.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}
