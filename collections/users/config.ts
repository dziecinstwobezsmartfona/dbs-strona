import type { CollectionConfig } from 'payload'
import { protectRoles } from './hooks/protectRoles';
import admin from './access/admin';

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
  auth: {
    forgotPassword: {
      generateEmailSubject: ({ user } = {}) => `Zresetuj swoje hasło`,
      generateEmailHTML: ({ token, user, req } = {}) => {
        const resetURL = `${process.env.FRONTEND_URL}/admin/reset/${token}`;
        return `
          <p>Ten e-mail został wysłany, ponieważ przy użyciu Twojego adresu e-mail: ${user.email} wpłynęła prośba o zresetowanie hasła do panelu administracyjnego strony dziecinstwobezsmartfona.pl.</p>
          <p>Jeśli to Ty prosisz o zresetowanie hasła, kliknij w poniższy link lub skopiuj go do przeglądarki, aby kontynuować proces:</p>
          <p><a href="${resetURL}">${resetURL}</a></p>
          <p>Jeśli prośba nie pochodzi od Ciebie, możesz po prostu zignorować tę wiadomość — Twoje hasło pozostanie niezmienione.</p>
        `
      }
    }
  },
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
