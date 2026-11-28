import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { NextRequest } from 'next/server'

let mongod: MongoMemoryServer
let newsletterPOST: (r: NextRequest) => Promise<Response>
let paktyPOST: (r: NextRequest) => Promise<Response>
let Subscriber: typeof import('@/lib/models/Subscriber').default
let RateLimit: typeof import('@/lib/models/RateLimit').default
let addSubscriber: typeof import('@/lib/subscribers').addSubscriber
let mongoose: typeof import('mongoose').default

let ipCounter = 0
const freshIp = () => `10.0.${Math.floor(++ipCounter / 250)}.${ipCounter % 250}`

const post = (body: unknown, ip: string | null = freshIp(), route = newsletterPOST) =>
  route(new NextRequest('http://localhost/api/x', {
    method: 'POST',
    body: typeof body === 'string' ? body : JSON.stringify(body),
    headers: { 'content-type': 'application/json', ...(ip ? { 'x-forwarded-for': ip } : {}) },
  }))

const valid = { fullName: 'Jan Kowalski', email: 'jan@example.com' }
const count = () => Subscriber.countDocuments({})

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  process.env.MONGODB_URI = mongod.getUri('newsletter-test')
  delete process.env.BREVO_API_KEY
  mongoose = (await import('mongoose')).default
  newsletterPOST = (await import('@/app/(app)/api/newsletter/route')).POST
  paktyPOST = (await import('@/app/(app)/api/pakty/route')).POST
  Subscriber = (await import('@/lib/models/Subscriber')).default
  RateLimit = (await import('@/lib/models/RateLimit')).default
  addSubscriber = (await import('@/lib/subscribers')).addSubscriber
  await (await import('@/lib/mongodb')).default()
  await Subscriber.init()
  await RateLimit.init()
})

afterAll(async () => {
  await mongoose?.disconnect()
  await mongod?.stop()
})

beforeEach(async () => {
  await Subscriber.deleteMany({})
  await RateLimit.deleteMany({})
})

describe('POST /api/newsletter', () => {
  it('stores a valid subscription with a normalised email and no extra keys', async () => {
    const res = await post({ fullName: ' Jan ', email: '  Jan@Example.COM ', isAdmin: true, createdAt: '2000-01-01' })
    expect(res.status).toBe(200)
    const docs = await Subscriber.find({}).lean<any[]>()
    expect(docs).toHaveLength(1)
    expect(docs[0].email).toBe('jan@example.com')
    expect(docs[0].fullName).toBe('Jan')
    expect(docs[0].isAdmin).toBeUndefined()
    expect(docs[0].createdAt.getFullYear()).toBeGreaterThan(2020)
  })

  it('treats a case/whitespace variant as the same subscriber and keeps the first record', async () => {
    await post(valid)
    const res = await post({ fullName: 'Someone Else', email: ' JAN@example.com ' })
    expect(res.status).toBe(200)
    const docs = await Subscriber.find({}).lean<any[]>()
    expect(docs).toHaveLength(1)
    expect(docs[0].fullName).toBe('Jan Kowalski')
  })

  const bad: [string, unknown][] = [
    ['bad email', { ...valid, email: 'not-an-email' }],
    ['empty email', { ...valid, email: '' }],
    ['long email', { ...valid, email: `${'a'.repeat(250)}@example.com` }],
    ['array email', { ...valid, email: ['a@b.pl'] }],
    ['numeric email', { ...valid, email: 5 }],
    ['missing email', { fullName: 'Jan' }],
    ['blank name', { ...valid, fullName: '   ' }],
    ['object name', { ...valid, fullName: { a: 1 } }],
    ['long name', { ...valid, fullName: 'x'.repeat(201) }],
    ['missing name', { email: valid.email }],
    ['malformed JSON', '{not json'],
    ['array body', []],
    ['null body', null],
    ['empty body', ''],
  ]
  it.each(bad)('rejects %s with 400 and stores nothing', async (_n, body) => {
    const res = await post(body)
    expect(res.status).toBe(400)
    expect(await count()).toBe(0)
    const text = JSON.stringify(await res.json())
    expect(text).not.toContain('xxxxxxxx')
    expect(text).not.toContain('not-an-email')
  })

  it('rejects an operator-injection email', async () => {
    await Subscriber.create(valid)
    const res = await post({ ...valid, email: { $gt: '' } })
    expect(res.status).toBe(400)
    expect(await count()).toBe(1)
  })

  it('answers a filled honeypot with 200 and stores nothing', async () => {
    const res = await post({ ...valid, website: 'http://spam' })
    expect(res.status).toBe(200)
    expect(await count()).toBe(0)
  })

  it('ends up with one document when the same email arrives concurrently', async () => {
    const results = await Promise.all(Array.from({ length: 3 }, () => post(valid)))
    expect(results.map((r) => r.status)).toEqual([200, 200, 200])
    expect(await count()).toBe(1)
  })

  it('addSubscriber is race-safe under 20 parallel calls', async () => {
    await Promise.all(Array.from({ length: 20 }, () => addSubscriber(valid)))
    expect(await count()).toBe(1)
  })

  it('has a unique index on email', async () => {
    const indexes = await Subscriber.collection.indexes()
    expect(indexes.some((i) => i.key.email === 1 && i.unique)).toBe(true)
  })

  it('limits one IP to 5 requests per window', async () => {
    const ip = '203.0.113.9'
    for (let i = 0; i < 5; i++) expect((await post({ ...valid, email: `u${i}@example.com` }, ip)).status).toBe(200)
    const res = await post({ ...valid, email: 'u6@example.com' }, ip)
    expect(res.status).toBe(429)
    expect(res.headers.get('retry-after')).toBe('600')
    expect(await count()).toBe(5)
  })

  it('limits one email to 3 requests per hour across IPs', async () => {
    for (let i = 0; i < 3; i++) expect((await post(valid)).status).toBe(200)
    const res = await post(valid)
    expect(res.status).toBe(429)
    expect(res.headers.get('retry-after')).toBe('3600')
  })

  it('without an IP only the per-email limit applies (no shared bucket)', async () => {
    for (let i = 0; i < 8; i++) expect((await post({ ...valid, email: `n${i}@example.com` }, null)).status).toBe(200)
    expect(await count()).toBe(8)
  })
})

describe('POST /api/pakty newsletter branch', () => {
  it('does not duplicate an existing subscriber whose email differs by case', async () => {
    await Subscriber.create({ fullName: 'Old', email: 'a@x.pl' })
    const res = await post({
      firstName: 'Ala', lastName: 'Kot', email: 'A@X.pl', schoolId: '123456',
      schoolVoivodship: 'MAZOWIECKIE', schoolDistrict: 'warszawski', schoolCounty: 'Warszawa',
      schoolName: 'Szkoła', numberOfChildren: 1, gdpr_consent: true, newsletter_consent: true,
    }, freshIp(), paktyPOST)
    expect(res.status).toBe(200)
    const docs = await Subscriber.find({}).lean<any[]>()
    expect(docs).toHaveLength(1)
    expect(docs[0].fullName).toBe('Old')
    await mongoose.model('Pact').deleteMany({})
  })

  it('creates a subscriber when none exists', async () => {
    const res = await post({
      firstName: 'Ala', lastName: 'Kot', email: 'new@x.pl', schoolId: '123456',
      schoolVoivodship: 'MAZOWIECKIE', schoolDistrict: 'warszawski', schoolCounty: 'Warszawa',
      schoolName: 'Szkoła', numberOfChildren: 1, gdpr_consent: true, newsletter_consent: true,
    }, freshIp(), paktyPOST)
    expect(res.status).toBe(200)
    const docs = await Subscriber.find({}).lean<any[]>()
    expect(docs.map((d) => d.email)).toEqual(['new@x.pl'])
    await mongoose.model('Pact').deleteMany({})
  })
})
