// MED-1: personal data must not reach the server logs, on success or on any failure path.
import { inspect } from 'node:util'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { NextRequest } from 'next/server'

let mongod: MongoMemoryServer
let paktyPOST: (r: NextRequest) => Promise<Response>
let newsletterPOST: (r: NextRequest) => Promise<Response>
let Pact: typeof import('@/lib/models/Pact').default
let RateLimit: typeof import('@/lib/models/RateLimit').default
let Subscriber: typeof import('@/lib/models/Subscriber').default
let mongoose: typeof import('mongoose').default

// distinctive values, so that any appearance in the output is a leak
const PII = {
  firstName: 'Zdzislawa',
  lastName: 'Tajemnicka',
  email: 'zdzislawa.tajemnicka@example.com',
}
const pact = { ...PII, schoolId: '22477', numberOfChildren: 1, gdpr_consent: true, newsletter_consent: true }
const subscription = { fullName: `${PII.firstName} ${PII.lastName}`, email: PII.email }

let ip = 0
const post = (route: (r: NextRequest) => Promise<Response>, body: unknown) =>
  route(new NextRequest('http://localhost/api/x', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json', 'x-forwarded-for': `10.2.0.${++ip}` },
  }))

let output: string[] = []
const logs = () => output.join('\n')

// part of the name of school 22477, which the server adds to the record from the registry
const SCHOOL_NAME_FRAGMENT = 'ABOR'

function expectNoPersonalData() {
  const text = logs().toLowerCase()
  for (const value of [...Object.values(PII), SCHOOL_NAME_FRAGMENT]) {
    expect(text).not.toContain(value.toLowerCase())
  }
}

/** An error shaped like the driver's duplicate-key error, which quotes the offending value everywhere. */
const leakyError = () =>
  Object.assign(new Error(`E11000 duplicate key error dup key: { email: "${PII.email}" }`), {
    name: 'MongoServerError',
    code: 11000,
    keyValue: { email: PII.email, lastName: PII.lastName },
  })

const brevo = vi.fn<typeof fetch>()

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  process.env.MONGODB_URI = mongod.getUri('logging-test')
  mongoose = (await import('mongoose')).default
  paktyPOST = (await import('@/app/(app)/api/pakty/route')).POST
  newsletterPOST = (await import('@/app/(app)/api/newsletter/route')).POST
  Pact = (await import('@/lib/models/Pact')).default
  RateLimit = (await import('@/lib/models/RateLimit')).default
  Subscriber = (await import('@/lib/models/Subscriber')).default
  await (await import('@/lib/mongodb')).default()
  await Promise.all([Pact.init(), RateLimit.init(), Subscriber.init()])
})

afterAll(async () => {
  await mongoose?.disconnect()
  await mongod?.stop()
})

beforeEach(async () => {
  await Promise.all([Pact.deleteMany({}), RateLimit.deleteMany({}), Subscriber.deleteMany({})])
  output = []
  for (const method of ['log', 'info', 'warn', 'error', 'debug', 'trace', 'dir'] as const) {
    vi.spyOn(console, method).mockImplementation((...args: unknown[]) => {
      // render objects in full, including nested properties
      output.push(args.map((a) => (typeof a === 'string' ? a : inspect(a, { depth: Infinity }))).join(' '))
    })
  }
  process.env.BREVO_API_KEY = 'test-key'
  // never call the real Brevo API
  brevo.mockReset().mockImplementation(async () => Response.json({ messageId: 'm1' }, { status: 201 }))
  vi.stubGlobal('fetch', brevo)
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  delete process.env.BREVO_API_KEY
})

describe('POST /api/pakty logging', () => {
  it('logs nothing for a successful submission', async () => {
    expect((await post(paktyPOST, pact)).status).toBe(200)
    expect(brevo).toHaveBeenCalledOnce()
    expect(await Pact.countDocuments({})).toBe(1)
    expect(output).toEqual([])
  })

  it('logs only status and code when Brevo rejects the email', async () => {
    brevo.mockImplementation(async () =>
      Response.json({ code: 'invalid_parameter', message: `${PII.email} is not valid` }, { status: 400 }))
    expect((await post(paktyPOST, pact)).status).toBe(200)
    expect(logs()).toContain('Brevo API error: 400 invalid_parameter')
    expectNoPersonalData()
  })

  it('copes with a non-JSON Brevo error body without quoting it', async () => {
    brevo.mockImplementation(async () => new Response(`${PII.email} bad gateway`, { status: 502 }))
    expect((await post(paktyPOST, pact)).status).toBe(200)
    expect(logs()).toContain('Brevo API error: 502 unknown')
    expectNoPersonalData()
  })

  it('logs the network error code, not the error object, when Brevo is unreachable', async () => {
    brevo.mockRejectedValue(new TypeError(`fetch failed for ${PII.email}`, { cause: { code: 'ECONNREFUSED' } }))
    expect((await post(paktyPOST, pact)).status).toBe(200)
    expect(logs()).toContain('Error sending email via Brevo:')
    expect(logs()).toContain('TypeError')
    expect(logs()).toContain('ECONNREFUSED')
    expectNoPersonalData()
  })

  it('does not leak values from a real database error', async () => {
    // a unique index makes MongoDB itself raise E11000, quoting the duplicated surname
    await Pact.collection.createIndex({ lastName: 1 }, { name: 'test_unique_lastName', unique: true })
    try {
      await Pact.create({
        ...pact, email: 'other@example.com', schoolName: 's', schoolVoivodship: 'v', schoolDistrict: 'd', schoolCounty: 'c',
      })
      expect((await post(paktyPOST, pact)).status).toBe(500)
      expect(logs()).toContain('Error processing pakt:')
      expect(logs()).toContain('MongoServerError')
      expect(logs()).toContain('11000')
      expectNoPersonalData()
    } finally {
      await Pact.collection.dropIndex('test_unique_lastName')
    }
  })

  it('does not leak the email in the rate-limit key when the counter fails', async () => {
    vi.spyOn(RateLimit, 'findOneAndUpdate').mockRejectedValue(leakyError())
    expect((await post(paktyPOST, pact)).status).toBe(200)
    expect(logs()).toContain('Rate limit check failed')
    expectNoPersonalData()
  })

  it('logs nothing personal for a rejected or honeypot submission', async () => {
    expect((await post(paktyPOST, { ...pact, numberOfChildren: 99 })).status).toBe(400)
    expect((await post(paktyPOST, { ...pact, website: 'http://spam' })).status).toBe(200)
    expectNoPersonalData()
  })
})

describe('POST /api/newsletter logging', () => {
  it('logs nothing for a successful subscription', async () => {
    expect((await post(newsletterPOST, subscription)).status).toBe(200)
    expect(output).toEqual([])
  })

  it('does not leak values when saving fails', async () => {
    vi.spyOn(Subscriber, 'updateOne').mockRejectedValue(Object.assign(leakyError(), { code: 121 }))
    expect((await post(newsletterPOST, subscription)).status).toBe(500)
    expect(logs()).toContain('Error saving subscriber:')
    expect(logs()).toContain('121')
    expectNoPersonalData()
  })
})
