import { NextRequest, NextResponse } from 'next/server'
import { evaluateRule, Rule, Context } from '@/lib/evaluateRule'

type EvaluateRequestBody = {
  rule: Rule
  context: Context
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<EvaluateRequestBody>

    if (!body.rule || !body.context) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    const decision = evaluateRule(body.rule, body.context)
    return NextResponse.json({ decision })
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 })
  }
}
