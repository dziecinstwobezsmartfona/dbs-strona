import { slugField } from 'payload';
import type { CollectionConfig } from 'payload';
import { slugifypl } from '@/lib/slugifypl';

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['slug', 'title', 'visible'],
  },
  fields: [
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    slugField({
      position: 'sidebar',
      slugify: ({valueToSlugify}) => slugifypl(valueToSlugify),
    }),
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Main cover image for the article',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
