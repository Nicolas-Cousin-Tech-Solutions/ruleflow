import { POST } from './route'
import { NextRequest } from 'next/server'
import { Rule, Context } from '@/lib/evaluateRule'

function createMockRequest(data: { rule?: Rule; context?: Context }): NextRequest {
  const body = JSON.stringify(data)
  const blob = new Blob([body], { type: 'application/json' })
  const request = new Request('http://localhost/api/evaluate', {
    method: 'POST',
    body: blob,
    headers: { 'Content-Type': 'application/json' }
  })
  return request as NextRequest
}

describe('POST /api/evaluate', () => {
  const validRule: Rule = {
    if: [
      { ">": [{ var: "x" }, 10] },
      "ok",
      "nope"
    ]
  }

  const validContext: Context = {
    x: 15
  }

  it('retourne 200 et la bonne décision', async () => {
    const req = createMockRequest({ rule: validRule, context: validContext })
    const res = await POST(req)

    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toEqual({ decision: "ok" })
  })

  it('retourne 400 si rule est manquant', async () => {
    const req = createMockRequest({ context: validContext })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('retourne 400 si context est manquant', async () => {
    const req = createMockRequest({ rule: validRule })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('retourne 400 si le body est invalide JSON', async () => {
    const request = new Request('http://localhost/api/evaluate', {
      method: 'POST',
      body: 'not a json'
    }) as unknown as NextRequest

    const res = await POST(request)
    expect(res.status).toBe(400)
  })
})
