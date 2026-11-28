/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from 'vitest'
import admin from './admin'
import editor from './editor'
import { authenticated } from './authenticated'
import { checkRole } from './checkRole'

const u = (roles: string[]) => ({ roles }) as any
const anon = null
const viewer = u(['viewer'])
const ed = u(['editor'])
const adm = u(['admin'])
const mixed = u(['viewer', 'editor'])
const run = (fn: any, user: any) => fn({ req: { user } })

describe('checkRole', () => {
  it('matches any listed role', () => {
    expect(checkRole(['admin', 'editor'], ed)).toBe(true)
    expect(checkRole(['admin'], ed)).toBe(false)
  })
  it('is false for missing user, missing roles or empty list', () => {
    expect(checkRole(['admin'], null)).toBe(false)
    expect(checkRole(['admin'], undefined)).toBe(false)
    expect(checkRole(['admin'], {} as any)).toBe(false)
    expect(checkRole([], adm)).toBe(false)
  })
})

describe('access functions', () => {
  it('admin: only admin', () => {
    expect([adm, ed, viewer, anon].map((x) => run(admin, x))).toEqual([true, false, false, false])
  })
  it('editor: admin and editor, including mixed roles', () => {
    expect([adm, ed, mixed, viewer, anon].map((x) => run(editor, x))).toEqual([true, true, true, false, false])
  })
  it('authenticated: any logged-in user', () => {
    expect([adm, ed, viewer, anon].map((x) => run(authenticated, x))).toEqual([true, true, true, false])
  })
})
