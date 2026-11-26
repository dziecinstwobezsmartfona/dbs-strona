import { describe, expect, it } from 'vitest';
import { buildSearchPipeline, pageLimit, toSearchResult } from './query';

describe('pageLimit', () => {
  it('returns the page size when well below the cap', () => {
    expect(pageLimit({ offset: 0, limit: 10, maxResults: 100 })).toBe(10);
  });

  it('shrinks the last page to respect maxResults', () => {
    expect(pageLimit({ offset: 95, limit: 10, maxResults: 100 })).toBe(5);
  });

  it('is zero at or past the cap', () => {
    expect(pageLimit({ offset: 100, limit: 10, maxResults: 100 })).toBe(0);
    expect(pageLimit({ offset: 150, limit: 10, maxResults: 100 })).toBe(0);
  });
});

describe('buildSearchPipeline', () => {
  it('searches first, then caps, skips and limits', () => {
    const stages = buildSearchPipeline({ q: 'smartfon', offset: 20, limit: 10, maxResults: 25 });
    expect(Object.keys(stages[0])).toEqual(['$search']);
    expect(stages.slice(1, 4)).toEqual([{ $limit: 25 }, { $skip: 20 }, { $limit: 5 }]);
  });
});

describe('toSearchResult', () => {
  it('prefers the highlighted passage', () => {
    const r = toSearchResult({
      title: 'T', url: '/t', excerpt: 'excerpt',
      highlights: [{ texts: [{ value: 'przed ', type: 'text' }, { value: 'smartfon', type: 'hit' }] }],
    });
    expect(r.snippet).toBe('…przed smartfon…');
  });

  it('falls back to the excerpt', () => {
    expect(toSearchResult({ title: 'T', url: '/t', excerpt: 'excerpt' }).snippet).toBe('excerpt');
  });
});
