export const ARTICLE_CATEGORIES = [
  { slug: 'artykuly', value: 'artykuły', title: 'Artykuły' },
  { slug: 'pytania', value: 'pytania', title: 'Pytania' },
  { slug: 'narzedzia', value: 'narzędzia', title: 'Narzędzia' },
  { slug: 'dbs-poleca', value: 'DBS poleca', title: 'DBS Poleca' },
] as const;

export function getCategoryBySlug(slug: string) {
  return ARTICLE_CATEGORIES.find((c) => c.slug === slug);
}
