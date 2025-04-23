import { evaluateRule, Rule } from './evaluateRule'

describe('evaluateRule', () => {
  it('retourne "ok" si x > 10', () => {
    const rule: Rule = {
      if: [
        { ">": [{ var: "x" }, 10] },
        "ok",
        "nope"
      ]
    }

    const context = { x: 12 }

    const result = evaluateRule(rule, context)
    expect(result).toBe("ok")
  })

  it('retourne "nope" si x <= 10', () => {
    const rule: Rule = {
      if: [
        { ">": [{ var: "x" }, 10] },
        "ok",
        "nope"
      ]
    }

    const context = { x: 5 }

    const result = evaluateRule(rule, context)
    expect(result).toBe("nope")
  })

  it('retourne null si la règle est vide', () => {
    const rule: Rule = {}
    const context = { x: 10 }

    const result = evaluateRule(rule, context)
    expect(result).toBeNull()
  })
})