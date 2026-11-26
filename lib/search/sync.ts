import type { Payload, PayloadRequest } from 'payload';
import type { SearchDoc, SearchSourceType } from './types';

async function findEntry(payload: Payload, sourceType: SearchSourceType, sourceId: string, req?: PayloadRequest) {
  const found = await payload.find({
    collection: 'search-index',
    where: { sourceType: { equals: sourceType }, sourceId: { equals: sourceId } },
    limit: 1,
    depth: 0,
    pagination: false,
    req,
  });
  return found.docs[0];
}

export async function upsertSearchDoc(payload: Payload, doc: SearchDoc, req?: PayloadRequest) {
  const existing = await findEntry(payload, doc.sourceType, doc.sourceId, req);
  if (existing) {
    await payload.update({ collection: 'search-index', id: existing.id, data: doc, req });
  } else {
    await payload.create({ collection: 'search-index', data: doc, req });
  }
}

export async function removeSearchDoc(payload: Payload, sourceType: SearchSourceType, sourceId: string, req?: PayloadRequest) {
  await payload.delete({
    collection: 'search-index',
    where: { sourceType: { equals: sourceType }, sourceId: { equals: sourceId } },
    req,
  });
}
