import type { GlobalConfig } from 'payload';
import { revalidatePath } from 'next/cache';
import { anyone } from '@/collections/users/access/anyone';
import editor from '@/collections/users/access/editor';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Konfiguracja strony',
  access: {
    read: anyone,
    update: editor,
  },
  fields: [
    {
      name: 'showcaseArticles',
      label: 'Artykuły na stronie głównej',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      maxRows: 5,
      filterOptions: { visible: { equals: true } },
      admin: {
        description:
          'Artykuły wyświetlane w sekcji "Odkrywaj DBS" na stronie głównej (maks. 5, pierwszy jest wyróżniony). Brakujące miejsca zostaną uzupełnione losowymi artykułami.',
      },
    },
  ],
  hooks: {
    afterChange: [
      () => revalidatePath('/', 'layout'),
    ],
  },
};
