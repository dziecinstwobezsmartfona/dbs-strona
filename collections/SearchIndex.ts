import type { CollectionConfig } from 'payload';

// Denormalized copy of everything searchable (articles, activities, static pages).
// Kept in sync by hooks and lib/search/staticPages; queried only through lib/search/query.
export const SearchIndex: CollectionConfig = {
  slug: 'search-index',
  labels: {
    singular: 'Wpis wyszukiwarki',
    plural: 'Wpisy wyszukiwarki',
  },
  admin: {
    hidden: true,
  },
  access: {
    read: () => false,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'sourceType',
      type: 'select',
      required: true,
      index: true,
      options: ['article', 'activity', 'page'],
    },
    { name: 'sourceId', type: 'text', required: true, index: true },
    { name: 'title', type: 'text', required: true },
    { name: 'url', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'content', type: 'textarea' },
  ],
};
