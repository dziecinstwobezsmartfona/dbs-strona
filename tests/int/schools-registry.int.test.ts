import { describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from '@/app/(app)/api/schools-registry/route'

const get = (qs = '') => GET(new NextRequest(`http://localhost/api/schools-registry${qs}`))
const q = (o: Record<string, string>) => `?${new URLSearchParams(o)}`

describe('GET /api/schools-registry', () => {
  it('returns each level with a cache header', async () => {
    const r1 = await get()
    expect(r1.status).toBe(200)
    expect(r1.headers.get('cache-control')).toContain('s-maxage')
    const { voivodships } = await r1.json()
    expect(voivodships).toHaveLength(16)

    const { districts } = await (await get(q({ voivodship: 'DOLNOŚLĄSKIE' }))).json()
    expect(districts).toContain('Wrocław')
    const { counties } = await (await get(q({ voivodship: 'DOLNOŚLĄSKIE', district: 'Wrocław' }))).json()
    expect(counties).toContain('Wrocław-Krzyki')
    const { schools } = await (await get(q({ voivodship: 'DOLNOŚLĄSKIE', district: 'Wrocław', county: 'Wrocław-Krzyki' }))).json()
    expect(schools.find((s: any) => s.id === '22477')).toBeTruthy()
  })

  it('exposes only id, name and an optional detail per school', async () => {
    const { schools } = await (await get(q({ voivodship: 'DOLNOŚLĄSKIE', district: 'Wrocław', county: 'Wrocław-Krzyki' }))).json()
    for (const s of schools) expect(Object.keys(s).every((k) => ['id', 'name', 'detail'].includes(k))).toBe(true)
  })

  it('rejects skipped levels and oversized params, 404s unknown parents', async () => {
    expect((await get(q({ district: 'x' }))).status).toBe(400)
    expect((await get(q({ voivodship: 'x', county: 'y' }))).status).toBe(400)
    expect((await get(q({ voivodship: 'x'.repeat(201) }))).status).toBe(400)
    expect((await get(q({ voivodship: 'NOPE' }))).status).toBe(404)
    expect((await get(q({ voivodship: 'DOLNOŚLĄSKIE', district: 'NOPE' }))).status).toBe(404)
  })

  it('keeps the largest response small', async () => {
    const reg = await (await import('@/lib/schoolsRegistry')).getSchoolsRegistry()
    let max = 0
    for (const v of reg.voivodships()) for (const d of reg.districts(v)!) for (const c of reg.counties(v, d)!) {
      max = Math.max(max, JSON.stringify(reg.schools(v, d, c)).length)
    }
    expect(max).toBeLessThan(50_000)
  })
})
