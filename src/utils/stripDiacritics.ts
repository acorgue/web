export function stripDiacritics(string: string) {
  return string.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}
