import { createHash } from 'crypto';
import type { Payload } from 'payload';
import { upsertSearchDoc } from './sync';
import { staticPageDocs } from './staticPages';

const META_ID = '__meta';

/**
 * Brings the `page` entries of the search index in line with STATIC_PAGES.
 * A hash of the list is kept on a marker entry so unchanged lists cost a single lookup.
 */
export async function syncStaticPages(payload: Payload, { force = false } = {}) {
  const docs = staticPageDocs();
  const hash = createHash('sha256').update(JSON.stringify(docs)).digest('hex');

  const markerUrl = `hash:${hash}`;

  const marker = await payload.find({
    collection: 'search-index',
    where: { sourceType: { equals: 'page' }, sourceId: { equals: META_ID } },
    limit: 1,
    depth: 0,
  });
  if (!force && marker.docs[0]?.url === markerUrl) return;

  for (const doc of docs) await upsertSearchDoc(payload, doc);

  await payload.delete({
    collection: 'search-index',
    where: {
      sourceType: { equals: 'page' },
      sourceId: { not_in: [...docs.map((d) => d.sourceId), META_ID] },
    },
  });

  await upsertSearchDoc(payload, {
    sourceType: 'page',
    sourceId: META_ID,
    title: '-', // no tokens, so the marker can never match a query
    url: markerUrl, // `url` is not part of the Atlas index
    excerpt: '',
    content: '',
  });
}
