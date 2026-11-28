/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'node:crypto'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }))

import { MongoMemoryServer } from 'mongodb-memory-server'
import { buildConfig, getPayload, type Payload } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Users } from '@/collections/users/config'

let mongod: MongoMemoryServer
let payload: Payload

const PASSWORD = 'pass1234!'

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  const config = await buildConfig({
    admin: { user: Users.slug },
    collections: [Users],
    editor: lexicalEditor(),
    secret: 'test-secret',
    db: mongooseAdapter({ url: mongod.getUri('dbs-auth-test') }),
    typescript: { autoGenerate: false },
  })
  payload = await getPayload({ config })
})

afterAll(async () => {
  await payload?.db?.destroy?.()
  await mongod?.stop()
})

const create = (email: string) =>
  payload.create({
    collection: 'users',
    data: { email, password: PASSWORD, roles: ['admin'] as any },
    overrideAccess: true,
  })

const getRaw = async (id: string | number) =>
  (await (payload.db as any).collections.users.findById(id).lean()) as any

describe('password login after the Payload upgrade', () => {
  it('logs in a newly created user and rejects a wrong password', async () => {
    await create('new@test.pl')
    const ok = await payload.login({ collection: 'users', data: { email: 'new@test.pl', password: PASSWORD } })
    expect(ok.token).toBeTruthy()
    await expect(
      payload.login({ collection: 'users', data: { email: 'new@test.pl', password: 'wrong-pass-1' } }),
    ).rejects.toThrow()
  })

  it('still verifies a legacy hash (pbkdf2 25000 iterations, 512-byte key, as made by Payload 3.85)', async () => {
    const user = await create('legacy@test.pl')
    const salt = crypto.randomBytes(32).toString('hex')
    const hash = crypto.pbkdf2Sync(PASSWORD, salt, 25000, 512, 'sha256').toString('hex')
    await (payload.db as any).collections.users.collection.updateOne(
      { email: 'legacy@test.pl' },
      { $set: { salt, hash } },
    )
    const raw = await getRaw(user.id)
    expect(raw.hash).toBe(hash)

    const ok = await payload.login({ collection: 'users', data: { email: 'legacy@test.pl', password: PASSWORD } })
    expect(ok.token).toBeTruthy()
    await expect(
      payload.login({ collection: 'users', data: { email: 'legacy@test.pl', password: 'wrong-pass-1' } }),
    ).rejects.toThrow()
  })
})

describe('account creation', () => {
  it('an anonymous caller cannot create users once access control is applied', async () => {
    await expect(
      payload.create({
        collection: 'users',
        data: { email: 'evil@test.pl', password: PASSWORD, roles: ['admin'] as any },
        overrideAccess: false,
      }),
    ).rejects.toThrow()
    const found = await payload.find({ collection: 'users', where: { email: { equals: 'evil@test.pl' } }, overrideAccess: true })
    expect(found.totalDocs).toBe(0)
  })
})
