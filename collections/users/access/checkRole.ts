import type { User } from '@/payload-types'

export type Role = User['roles'][number]

export const checkRole = (roles: Role[], user?: Pick<User, 'roles'> | null): boolean =>
  Boolean(user?.roles?.some((role) => roles.includes(role)))
