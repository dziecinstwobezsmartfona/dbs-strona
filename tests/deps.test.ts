import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'))
const deps: Record<string, string> = { ...pkg.dependencies, ...pkg.devDependencies }

describe('dependency alignment', () => {
  it('pins payload and every @payloadcms/* package to one identical exact version', () => {
    const entries = Object.entries(deps).filter(([n]) => n === 'payload' || n.startsWith('@payloadcms/'))
    expect(entries.length).toBeGreaterThan(1)
    const versions = new Set(entries.map(([, v]) => v))
    expect([...versions]).toHaveLength(1)
    expect([...versions][0]).toMatch(/^\d+\.\d+\.\d+$/)
  })
})
