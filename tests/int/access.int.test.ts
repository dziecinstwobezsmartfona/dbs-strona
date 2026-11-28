/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))

import { MongoMemoryServer } from 'mongodb-memory-server'
import { buildConfig, getPayload, type Payload } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Users } from '@/collections/users/config'
import { Media } from '@/collections/Media'
import { Articles } from '@/collections/Articles'
import { Schools } from '@/collections/Schools'
import { Activities } from '@/collections/Activities'
import { SearchIndex } from '@/collections/SearchIndex'
import { SiteSettings } from '@/globals/SiteSettings'

let mongod: MongoMemoryServer
let payload: Payload
let tmp: string
const u: Record<string, any> = {}
const ids: Record<string, any> = {}

const lexical = {
  root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0,
    children: [{ type: 'paragraph', version: 1, direction: 'ltr', format: '', indent: 0,
      children: [{ type: 'text', version: 1, text: 'x', format: 0, detail: 0, mode: 'normal', style: '' }] }] },
}
const article = (title = 'T') => ({ title, order: 1, content: lexical as any }) as any
const school = () => ({ school_name: 's', school_full_name: 'sf' })
const activity = () => ({ order: 1, name: 'n', description: 'd' })
const file = () => ({ data: Buffer.from('hello'), mimetype: 'text/plain', name: `f-${Math.random()}.txt`, size: 5 })

const as = (role: string) => ({ overrideAccess: false, user: u[role] }) as any
const creators: Record<string, (role: string) => Promise<any>> = {
  articles: (r) => payload.create({ collection: 'articles', data: article(), ...as(r) }),
  schools: (r) => payload.create({ collection: 'schools', data: school(), ...as(r) }),
  activities: (r) => payload.create({ collection: 'activities', data: activity(), ...as(r) }),
  media: (r) => payload.create({ collection: 'media', data: { alt: 'a' }, file: file(), ...as(r) }),
}
const patch: Record<string, any> = {
  articles: { title: 'changed' },
  schools: { school_name: 'changed' },
  activities: { name: 'changed' },
  media: { alt: 'changed' },
}

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dbs-int-'))
  const config = await buildConfig({
    admin: { user: Users.slug },
    collections: [
      Users,
      { ...Media, upload: { ...(Media.upload as object), disableLocalStorage: false, staticDir: tmp } },
      Articles,
      Schools,
      Activities,
      SearchIndex,
    ],
    globals: [SiteSettings],
    editor: lexicalEditor(),
    secret: 'test-secret',
    db: mongooseAdapter({ url: mongod.getUri('dbs-test') }),
    typescript: { autoGenerate: false },
  })
  payload = await getPayload({ config })

  for (const role of ['admin', 'editor', 'viewer']) {
    u[role] = await payload.create({
      collection: 'users',
      data: { email: `${role}@test.pl`, password: 'pass1234!', roles: [role] as any },
      overrideAccess: true,
    })
  }
  ids.articles = (await payload.create({ collection: 'articles', data: article('seed'), draft: false, overrideAccess: true })).id
  ids.schools = (await payload.create({ collection: 'schools', data: school(), overrideAccess: true })).id
  ids.activities = (await payload.create({ collection: 'activities', data: activity(), overrideAccess: true })).id
  ids.media = (await payload.create({ collection: 'media', data: { alt: 'seed' }, file: file(), overrideAccess: true })).id
})

afterAll(async () => {
  await payload?.db?.destroy?.()
  await mongod?.stop()
  if (tmp) fs.rmSync(tmp, { recursive: true, force: true })
})

const slugs = ['articles', 'media', 'schools', 'activities'] as const

describe('viewer is read-only', () => {
  for (const slug of slugs) {
    it(`cannot create/update/delete ${slug}`, async () => {
      await expect(creators[slug]('viewer')).rejects.toMatchObject({ status: 403 })
      await expect(
        payload.update({ collection: slug, id: ids[slug], data: patch[slug], ...as('viewer') }),
      ).rejects.toMatchObject({ status: 403 })
      await expect(
        payload.delete({ collection: slug, id: ids[slug], ...as('viewer') }),
      ).rejects.toMatchObject({ status: 403 })
      const still = await payload.findByID({ collection: slug, id: ids[slug], overrideAccess: true })
      expect(still).toBeTruthy()
      expect(JSON.stringify(still)).not.toContain('changed')
    })
  }
  it('cannot update site settings', async () => {
    await expect(
      payload.updateGlobal({ slug: 'site-settings', data: {}, ...as('viewer') }),
    ).rejects.toMatchObject({ status: 403 })
  })
  it('can read articles and schools', async () => {
    await expect(payload.find({ collection: 'articles', ...as('viewer') })).resolves.toBeTruthy()
    await expect(payload.find({ collection: 'schools', ...as('viewer') })).resolves.toBeTruthy()
  })
})

describe('editor can manage content but not users', () => {
  for (const slug of slugs) {
    it(`create/update/delete ${slug}`, async () => {
      const created = await creators[slug]('editor')
      const updated = await payload.update({ collection: slug, id: created.id, data: patch[slug], ...as('editor') })
      expect(JSON.stringify(updated)).toContain('changed')
      await payload.delete({ collection: slug, id: created.id, ...as('editor') })
    })
  }
  it('can update site settings', async () => {
    await expect(payload.updateGlobal({ slug: 'site-settings', data: {}, ...as('editor') })).resolves.toBeTruthy()
  })
  it('cannot read or modify users', async () => {
    await expect(payload.find({ collection: 'users', ...as('editor') })).rejects.toMatchObject({ status: 403 })
    await expect(
      payload.update({ collection: 'users', id: u.editor.id, data: { roles: ['admin'] }, ...as('editor') }),
    ).rejects.toMatchObject({ status: 403 })
    const fresh = await payload.findByID({ collection: 'users', id: u.editor.id, overrideAccess: true })
    expect(fresh.roles).toEqual(['editor'])
  })
})

describe('admin', () => {
  it('can change another user\'s roles', async () => {
    const r = await payload.update({ collection: 'users', id: u.viewer.id, data: { roles: ['viewer', 'editor'] }, ...as('admin') })
    expect((r as any).roles).toContain('editor')
    await payload.update({ collection: 'users', id: u.viewer.id, data: { roles: ['viewer'] }, overrideAccess: true })
  })
})

describe('anonymous', () => {
  const anon = { overrideAccess: false } as any
  it('cannot read articles or schools', async () => {
    await expect(payload.find({ collection: 'articles', ...anon })).rejects.toMatchObject({ status: 403 })
    await expect(payload.find({ collection: 'schools', ...anon })).rejects.toMatchObject({ status: 403 })
  })
  it('can read media and activities', async () => {
    await expect(payload.find({ collection: 'media', ...anon })).resolves.toBeTruthy()
    await expect(payload.find({ collection: 'activities', ...anon })).resolves.toBeTruthy()
  })
  for (const slug of slugs) {
    it(`cannot write ${slug}`, async () => {
      await expect(
        payload.update({ collection: slug, id: ids[slug], data: patch[slug], ...anon }),
      ).rejects.toMatchObject({ status: 403 })
    })
  }
})
