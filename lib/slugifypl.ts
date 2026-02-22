export function slugifypl(text: string): string {
  if (!text) return '';

  // Polish letters → ASCII
  const polishToAscii: Record<string, string> = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
    'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N',
    'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
  };

  let slug = text
    .replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, m => polishToAscii[m] || m)
    .normalize('NFD')                    // decompose remaining diacritics
    .replace(/[\u0300-\u036f]/g, '')     // remove them
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')        // keep only letters, digits, spaces, hyphen
    .trim()
    .replace(/\s+/g, '-')                // spaces → hyphen
    .replace(/-+/g, '-');                // collapse multiple hyphens

  // Remove leading/trailing hyphens
  return slug.replace(/^-+|-+$/g, '');
}
