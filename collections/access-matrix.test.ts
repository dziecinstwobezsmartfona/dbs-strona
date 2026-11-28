/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))

import { Articles } from './Articles'
import { Media } from './Media'
import { Schools } from './Schools'
import { Activities } from './Activities'
import { Users } from './users/config'

const users = {
  anon: null,
  viewer: { roles: ['viewer'] },
  editor: { roles: ['editor'] },
  admin: { roles: ['admin'] },
} as Record<string, any>

// [read, write] allowed roles
const matrix = [
  { c: Articles, read: ['viewer', 'editor', 'admin'], write: ['editor', 'admin'] },
  { c: Media, read: ['anon', 'viewer', 'editor', 'admin'], write: ['editor', 'admin'] },
  { c: Schools, read: ['viewer', 'editor', 'admin'], write: ['editor', 'admin'] },
  { c: Activities, read: ['anon', 'viewer', 'editor', 'admin'], write: ['editor', 'admin'] },
  { c: Users, read: ['admin'], write: ['admin'] },
]

describe.each(matrix)('access of $c.slug', ({ c, read, write }) => {
  for (const op of ['read', 'create', 'update', 'delete'] as const) {
    it(`defines ${op} explicitly`, () => {
      expect(typeof (c.access as any)?.[op]).toBe('function')
    })
    for (const [role, user] of Object.entries(users)) {
      const allowed = (op === 'read' ? read : write).includes(role)
      it(`${op}: ${role} -> ${allowed}`, () => {
        expect(Boolean((c.access as any)[op]({ req: { user } }))).toBe(allowed)
      })
    }
  }
})
