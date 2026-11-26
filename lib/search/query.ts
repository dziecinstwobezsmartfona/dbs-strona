import { ATLAS_INDEX_NAME } from './atlasIndex';

const FUZZY = { maxEdits: 1, prefixLength: 2 };
const TITLE_BOOST = 3;

export interface SearchPipelineOptions {
  q: string;
  offset: number;
  limit: number;
  maxResults: number;
}

/** Number of results to return for this page, never going past `maxResults` in total. */
export function pageLimit({ offset, limit, maxResults }: Omit<SearchPipelineOptions, 'q'>): number {
  return Math.max(0, Math.min(limit, maxResults - offset));
}

export function buildSearchPipeline({ q, offset, limit, maxResults }: SearchPipelineOptions) {
  return [
    {
      $search: {
        index: ATLAS_INDEX_NAME,
        compound: {
          should: [
            { text: { query: q, path: 'title', fuzzy: FUZZY, score: { boost: { value: TITLE_BOOST } } } },
            { text: { query: q, path: { value: 'title', multi: 'folded' }, score: { boost: { value: TITLE_BOOST } } } },
            { text: { query: q, path: ['content', 'excerpt'], fuzzy: FUZZY } },
            { text: { query: q, path: { value: 'content', multi: 'folded' } } },
          ],
          minimumShouldMatch: 1,
        },
        highlight: { path: 'content', maxNumPassages: 1, maxCharsToExamine: 500000 },
      },
    },
    { $limit: maxResults },
    { $skip: offset },
    { $limit: pageLimit({ offset, limit, maxResults }) },
    {
      $project: {
        _id: 0,
        title: 1,
        url: 1,
        excerpt: 1,
        highlights: { $meta: 'searchHighlights' },
      },
    },
  ];
}

interface Highlight {
  texts?: Array<{ value: string; type: 'text' | 'hit' }>;
}

export interface RawSearchRow {
  title: string;
  url: string;
  excerpt?: string;
  highlights?: Highlight[];
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

/** Prefers the highlighted passage from the full text, falling back to the stored excerpt. */
export function toSearchResult(row: RawSearchRow): SearchResult {
  const passage = row.highlights?.[0]?.texts?.map((t) => t.value).join('').replace(/\s+/g, ' ').trim();
  return { title: row.title, url: row.url, snippet: passage ? `…${passage}…` : row.excerpt ?? '' };
}
