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
    {
      name: 'search',
      label: 'Wyszukiwarka',
      type: 'group',
      fields: [
        {
          name: 'pageSize',
          label: 'Liczba wyników ładowanych naraz',
          type: 'number',
          defaultValue: 10,
          min: 1,
          max: 50,
          required: true,
          admin: {
            description: 'Tyle wyników pojawia się od razu; kolejne porcje doładowują się podczas przewijania strony.',
          },
        },
        {
          name: 'maxResults',
          label: 'Maksymalna łączna liczba wyników',
          type: 'number',
          defaultValue: 100,
          min: 1,
          max: 500,
          required: true,
          admin: {
            description: 'Wyszukiwarka nigdy nie pokaże więcej wyników niż ta liczba.',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      () => revalidatePath('/', 'layout'),
    ],
  },
};
