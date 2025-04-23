export type Rule = {
  if?: [Condition, string, string]
}

export type Condition =
  | { ">": [Expression, number] }

export type Expression =
  | { var: string }
  | number

export type Context = Record<string, unknown>

export const evaluateRule = (rule: Rule, context: Context): string | null => {
    if (!rule.if) return null;

    const [condition, onTrue, onFalse] = rule.if;

    if (">" in condition){
        const [left, right] = condition[">"];

        const leftValue = resolveExpression(left, context);

        return (typeof leftValue === 'number' && leftValue > right)
        ? onTrue
        : onFalse
    }

    return null
};

function resolveExpression(expr: Expression, context: Context): number {
  if (typeof expr === 'number') return expr
  if ('var' in expr) {
    const value = context[expr.var]
    return typeof value === 'number' ? value : NaN
  }
  return NaN
}