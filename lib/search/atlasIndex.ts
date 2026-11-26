export const ATLAS_INDEX_NAME = 'search';

// Atlas Search index definition for the `search-index` collection.
// `folded` is a diacritic-insensitive variant so "zaleznosc" finds "zależność".
export const atlasIndexDefinition = {
  name: ATLAS_INDEX_NAME,
  type: 'search' as const,
  definition: {
    mappings: {
      dynamic: false,
      fields: {
        title: { type: 'string', analyzer: 'lucene.polish', multi: { folded: { type: 'string', analyzer: 'foldedAnalyzer' } } },
        excerpt: { type: 'string', analyzer: 'lucene.polish' },
        content: { type: 'string', analyzer: 'lucene.polish', multi: { folded: { type: 'string', analyzer: 'foldedAnalyzer' } } },
      },
    },
    analyzers: [
      {
        name: 'foldedAnalyzer',
        tokenizer: { type: 'standard' },
        tokenFilters: [{ type: 'lowercase' }, { type: 'icuFolding' }],
      },
    ],
  },
};
