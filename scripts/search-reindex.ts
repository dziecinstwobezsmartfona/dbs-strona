import { getPayload } from 'payload';
import nextEnv from '@next/env';
import { ATLAS_INDEX_NAME, atlasIndexDefinition } from '../lib/search/atlasIndex';
import { activityToSearchDoc, articleToSearchDoc } from '../lib/search/toSearchDoc';
import { upsertSearchDoc } from '../lib/search/sync';
import { syncStaticPages } from '../lib/search/syncStaticPages';

// Creates the Atlas Search index if needed and rebuilds the whole `search-index` collection.
async function main() {
  nextEnv.loadEnvConfig(process.cwd());
  // imported after the env is loaded, since the config reads it at import time
  const { default: config } = await import('../payload.config');
  const payload = await getPayload({ config });

  const collection = payload.db.collections['search-index'].collection;
  try {
    const existing = await collection.listSearchIndexes().toArray();
    if (existing.some((i) => i.name === ATLAS_INDEX_NAME)) {
      console.log(`Atlas Search index "${ATLAS_INDEX_NAME}" already exists (update it in the Atlas UI if the definition changed).`);
    } else {
      await collection.createSearchIndex(atlasIndexDefinition);
      console.log(`Created Atlas Search index "${ATLAS_INDEX_NAME}" (it becomes queryable after a minute or so).`);
    }
  } catch (error) {
    if ((error as { code?: number }).code !== 8000) throw error;
    console.warn(
      `The database user may not manage Atlas Search indexes. Create the index by hand in the Atlas UI\n` +
      `(collection "${collection.collectionName}" → Search → Create Search Index → JSON editor, index name "${ATLAS_INDEX_NAME}"):\n` +
      JSON.stringify(atlasIndexDefinition.definition, null, 2),
    );
  }

  // Drop article/activity entries first so ones removed behind Payload's back disappear too.
  await payload.delete({
    collection: 'search-index',
    where: { sourceType: { in: ['article', 'activity'] } },
  });

  const articles = await payload.find({
    collection: 'articles',
    where: { visible: { equals: true } },
    limit: 0,
    pagination: false,
    depth: 0,
  });
  for (const article of articles.docs) await upsertSearchDoc(payload, articleToSearchDoc(article));

  const activities = await payload.find({
    collection: 'activities',
    where: { visible: { equals: true } },
    limit: 0,
    pagination: false,
    depth: 0,
  });
  for (const activity of activities.docs) await upsertSearchDoc(payload, activityToSearchDoc(activity));

  await syncStaticPages(payload, { force: true });

  console.log(`Indexed ${articles.docs.length} articles, ${activities.docs.length} activities and the static pages.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
