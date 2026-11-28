/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { brevoAdapter } from './BrevoAdapter'

const recipient = 'secret.parent@example.com'
const send = () =>
  brevoAdapter({ apiKey: 'test-key', defaultFromAddress: 'from@example.com', defaultFromName: 'From' })({} as any)
    .sendEmail({ to: recipient, subject: 'Reset', text: 'token' })

const consoleSpies: ReturnType<typeof vi.spyOn>[] = []

beforeEach(() => {
  for (const method of ['log', 'info', 'warn', 'error', 'debug'] as const) {
    consoleSpies.push(vi.spyOn(console, method).mockImplementation(() => {}))
  }
})

afterEach(() => {
  consoleSpies.length = 0
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

const stubFetch = (response: Response) => vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response))
const logged = () => consoleSpies.flatMap((spy) => spy.mock.calls)

describe('brevoAdapter logging', () => {
  it('writes nothing to the console when the email is sent', async () => {
    stubFetch(Response.json({ messageId: 'm1' }, { status: 201 }))
    await expect(send()).resolves.toEqual({ messageId: 'm1' })
    expect(logged()).toEqual([])
  })

  it('reports status and code, not the response body, when Brevo rejects the email', async () => {
    stubFetch(Response.json({ code: 'invalid_parameter', message: `${recipient} is not valid` }, { status: 400 }))
    await expect(send()).rejects.toThrow(/^Brevo API error 400: invalid_parameter$/)
    expect(logged()).toEqual([])
  })

  it.each([
    ['a non-JSON body', new Response(`<html>${recipient}</html>`, { status: 502 })],
    ['a body without a code', Response.json({ message: recipient }, { status: 502 })],
    ['a null body', Response.json(null, { status: 502 })],
  ])('copes with %s', async (_name, response) => {
    stubFetch(response)
    await expect(send()).rejects.toThrow(/^Brevo API error 502: unknown$/)
  })
})
