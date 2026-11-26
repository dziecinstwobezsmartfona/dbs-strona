import { describe, expect, it } from 'vitest';
import { activityToSearchDoc, articleToSearchDoc, EXCERPT_LENGTH, makeExcerpt } from './toSearchDoc';

const lexical = (text: string) => ({
  root: {
    type: 'root', version: 1, direction: 'ltr', format: '', indent: 0,
    children: [{
      type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0,
      children: [{ type: 'text', version: 1, text, format: 0, detail: 0, mode: 'normal', style: '' }],
    }],
  },
});

describe('makeExcerpt', () => {
  it('returns short text unchanged apart from whitespace', () => {
    expect(makeExcerpt('  Krótki   tekst\n ')).toBe('Krótki tekst');
  });

  it('cuts long text at a word boundary and adds an ellipsis', () => {
    const text = 'słowo '.repeat(100);
    const out = makeExcerpt(text);
    expect(out.length).toBeLessThanOrEqual(EXCERPT_LENGTH + 1);
    expect(out.endsWith('słowo…')).toBe(true);
  });
});

describe('articleToSearchDoc', () => {
  it('maps title, slug url and plain text content', () => {
    const doc = articleToSearchDoc({ id: 'a1', title: 'Tytuł', slug: 'tytul', content: lexical('Treść artykułu') });
    expect(doc).toMatchObject({ sourceType: 'article', sourceId: 'a1', title: 'Tytuł', url: '/tytul', content: 'Treść artykułu' });
  });
});

describe('activityToSearchDoc', () => {
  it('uses the link when present', () => {
    expect(activityToSearchDoc({ id: 1, name: 'N', description: 'D', link: '/x' }).url).toBe('/x');
  });

  it('falls back to /dzialam', () => {
    expect(activityToSearchDoc({ id: 1, name: 'N', description: 'D', link: '  ' }).url).toBe('/dzialam');
  });
});
