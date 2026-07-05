import type { CollectionConfig } from 'payload';
import { revalidatePath } from 'next/cache';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medium',
    plural: 'Media'
  },
  access: {
    read: () => true,
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
