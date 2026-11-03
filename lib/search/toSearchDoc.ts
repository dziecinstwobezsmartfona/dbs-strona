import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import type { SearchDoc } from './types';

export const EXCERPT_LENGTH = 200;

/** Collapses whitespace and cuts at a word boundary, adding an ellipsis when shortened. */
export function makeExcerpt(text: string, maxLength = EXCERPT_LENGTH): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return clean;
  const cut = clean.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > maxLength / 2 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:–-]+$/, '')}…`;
}

interface ArticleLike {
  id: string | number;
  title: string;
  slug?: string | null;
  content?: unknown;
}

export function articleToSearchDoc(article: ArticleLike): SearchDoc {
  const content = article.content
    ? convertLexicalToPlaintext({ data: article.content as SerializedEditorState }).replace(/\s+/g, ' ').trim()
    : '';
  return {
    sourceType: 'article',
    sourceId: String(article.id),
    title: article.title,
    url: `/${article.slug ?? ''}`,
    excerpt: makeExcerpt(content),
    content,
  };
}

interface ActivityLike {
  id: string | number;
  name: string;
  description: string;
  link?: string | null;
}

export function activityToSearchDoc(activity: ActivityLike): SearchDoc {
  return {
    sourceType: 'activity',
    sourceId: String(activity.id),
    title: activity.name,
    url: activity.link?.trim() || '/dzialam',
    excerpt: makeExcerpt(activity.description),
    content: activity.description,
  };
}
