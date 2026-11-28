import type { CollectionConfig } from 'payload';
import { revalidatePath } from 'next/cache';
import editor from '@/collections/users/access/editor';
import { anyone } from '@/collections/users/access/anyone';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medium',
    plural: 'Media'
  },
  access: {
    read: anyone,
    create: editor,
    update: editor,
    delete: editor,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
    displayPreview: true,
  },
  hooks: {
    afterChange: [
      () => revalidatePath('/', 'layout'),
    ],
    afterDelete: [
      () => revalidatePath('/', 'layout'),
    ],
  }
}
