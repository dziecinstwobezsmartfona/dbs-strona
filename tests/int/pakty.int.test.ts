import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { NextRequest } from 'next/server'

let mongod: MongoMemoryServer
let paktyPOST: (r: NextRequest) => Promise<Response>
let Pact: typeof import('@/lib/models/Pact').default
let RateLimit: typeof import('@/lib/models/RateLimit').default
let mongoose: typeof import('mongoose').default

let n = 0
const post = (body: unknown) =>
  paktyPOST(new NextRequest('http://localhost/api/pakty', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json', 'x-forwarded-for': `10.1.0.${++n % 250}` },
  }))

const person = { firstName: 'Ala', lastName: 'Kot', numberOfChildren: 1, gdpr_consent: true }
let emailN = 0
const email = () => `p${++emailN}@example.com`

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  process.env.MONGODB_URI = mongod.getUri('pakty-test')
  delete process.env.BREVO_API_KEY
  mongoose = (await import('mongoose')).default
  paktyPOST = (await import('@/app/(app)/api/pakty/route')).POST
  Pact = (await import('@/lib/models/Pact')).default
  RateLimit = (await import('@/lib/models/RateLimit')).default
  await (await import('@/lib/mongodb')).default()
})

afterAll(async () => {
  await mongoose?.disconnect()
  await mongod?.stop()
})

beforeEach(async () => {
  await Pact.deleteMany({})
  await RateLimit.deleteMany({})
})

describe('POST /api/pakty school validation', () => {
  it('stores registry values and ignores a fake name/region sent by the client', async () => {
    const res = await post({ ...person, email: email(), schoolId: '22477', schoolName: 'FAKE', schoolVoivodship: 'FAKE', voivodship: 'FAKE', district: 'FAKE', county: 'FAKE' })
    expect(res.status).toBe(200)
    const doc = await Pact.findOne({}).lean<any>()
    expect(doc.schoolId).toBe('22477')
    expect(doc.schoolName).toContain('ABOR')
    expect(doc.schoolVoivodship).toBe('DOLNOŚLĄSKIE')
    expect(doc.schoolDistrict).toBe('Wrocław')
    expect(doc.schoolCounty).toBe('Wrocław-Krzyki')
  })

  it('rejects an unknown school id and stores nothing', async () => {
    const res = await post({ ...person, email: email(), schoolId: '999999999' })
    expect(res.status).toBe(400)
    expect(await Pact.countDocuments({})).toBe(0)
  })

  it('accepts "no school yet" with an existing region', async () => {
    const res = await post({ ...person, email: email(), schoolId: '0', voivodship: 'DOLNOŚLĄSKIE', district: 'Wrocław', county: 'Wrocław-Krzyki' })
    expect(res.status).toBe(200)
    const doc = await Pact.findOne({}).lean<any>()
    expect(doc.schoolId).toBe('0')
    expect(doc.schoolName).toBe('Moje dzieci nie chodzą jeszcze do szkoły')
    expect(doc.schoolCounty).toBe('Wrocław-Krzyki')
  })

  it('rejects "no school yet" with an unknown or missing region', async () => {
    expect((await post({ ...person, email: email(), schoolId: '0', voivodship: 'DOLNOŚLĄSKIE', district: 'Wrocław', county: 'Nowhere' })).status).toBe(400)
    expect((await post({ ...person, email: email(), schoolId: '0' })).status).toBe(400)
    expect(await Pact.countDocuments({})).toBe(0)
  })

  it('still accepts the legacy payload shape that includes a valid schoolId', async () => {
    const res = await post({ ...person, email: email(), schoolId: '22477', schoolVoivodship: 'x', schoolDistrict: 'x', schoolCounty: 'x', schoolName: 'x' })
    expect(res.status).toBe(200)
  })

  it('does not store the same email and school twice', async () => {
    const e = email()
    expect((await post({ ...person, email: e, schoolId: '22477' })).status).toBe(200)
    expect((await post({ ...person, email: e, schoolId: '22477' })).status).toBe(200)
    expect(await Pact.countDocuments({})).toBe(1)
  })
})
