import { slugField } from 'payload';
import type { CollectionConfig } from 'payload';
import { slugifypl } from '@/lib/slugifypl';
import { revalidatePath } from 'next/cache';
import { lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical';

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
      name: 'order',
      label: 'Kolejność',
      type: 'number',
      required: true,
    },
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
        'artykuły',
        'pytania',
        'narzędzia',
        'DBS poleca',
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
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          UploadFeature({
            collections: {
              media: {
                fields: [
                  {
                    name: 'width',
                    label: 'Szerokość',
                    type: 'select',
                    defaultValue: 'w-full',
                    options: [
                      { label: 'Pełna', value: 'w-full' },
                      { label: '3/4', value: 'w-3/4' },
                      { label: '2/3', value: 'w-2/3' },
                      { label: '1/2', value: 'w-1/2' },
                      { label: '1/3', value: 'w-1/3' },
                      { label: '1/4', value: 'w-1/4' },
                    ],
                  },
                  {
                    name: 'alignment',
                    label: 'Wyrównanie',
                    type: 'select',
                    defaultValue: 'left',
                    options: [
                      { label: 'Do lewej', value: 'left' },
                      { label: 'Na środku', value: 'center' },
                      { label: 'Do prawej', value: 'right' },
                    ],
                  },
                  {
                    name: 'rounded',
                    label: 'Zaokrąglone rogi',
                    type: 'checkbox',
                    defaultValue: false,
                  },
                ],
              },
            },
          }),
        ],
      }),
    },
  ],
  hooks: {
    afterChange: [
      () => revalidatePath('/', 'layout'),
    ],
    afterDelete: [
      () => revalidatePath('/', 'layout'),
    ],
  }
}
