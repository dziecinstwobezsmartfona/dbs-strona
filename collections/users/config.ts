import type { CollectionConfig } from 'payload'
import { protectRoles } from './hooks/protectRoles';
import admin from './access/admin';
import viewer from './access/viewer';
import editor from './access/editor';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Użytkownik',
    plural: 'Użytkownicy'
  },
  access: {
    create: admin,
    read: admin,
    update: admin,
    delete: admin,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      hooks: {
        beforeChange: [protectRoles],
      },
    }
  ],
}
