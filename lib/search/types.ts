export type SearchSourceType = 'article' | 'activity' | 'page';

export interface SearchDoc {
  sourceType: SearchSourceType;
  sourceId: string;
  title: string;
  url: string;
  excerpt: string;
  content: string;
}
