import { slugField } from 'payload';
import type { CollectionConfig } from 'payload';
import { slugifypl } from '@/lib/slugifypl';

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Artykuł',
    plural: 'Artykuły'
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['slug', 'title', 'visible'],
  },
  fields: [
    {
      name: 'visible',
      label: 'Widoczny na stronie',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    slugField({
      position: 'sidebar',
      slugify: ({ valueToSlugify }) => slugifypl(valueToSlugify),
    }),
    {
      name: 'coverImage',
      label: 'Ilustracja tytułowa',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Ilustracja do umieszczenia pod tytułem',
      },
    },
    {
      name: 'category',
      label: 'Kategoria',
      type: 'select',
      hasMany: true,
      required: false,
      options: [
        'artykuł',
        'pytanie',
        'materiał',
        'DBS poleca',
        'dziennik',
      ],
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'medium',
      label: 'Medium',
      type: 'select',
      hasMany: true,
      required: false,
      options: [
        'do czytania',
        'do słuchania',
        'do oglądania',
        'do wykorzystania',
      ],
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'title',
      label: 'Tytuł',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Zawartość',
      type: 'richText',
      required: true,
    },
  ],
}
