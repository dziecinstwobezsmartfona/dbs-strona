import type { FieldHook } from 'payload';
import type { User } from '@/payload-types';

export const protectRoles: FieldHook<{ id: string } & User> = ({ req, data }) => {
  const isAdmin = req.user?.roles?.includes('admin');

  if (!isAdmin) {
    return ['viewer']; // non-admins are forced to 'viewer' role
  }

  const userRoles = new Set(data?.roles || []);
  userRoles.add('viewer'); // ensure 'viewer' is always included

  return [...userRoles.values()];
};
