export interface SamvaluationProps {
  event?: {
    name: string
    href: string
  }
  evaluation?: string
  preload?: string
  preload2?: {
    text: string
    reduction: number
    quantity: number
    conditional: string
  } | null
}

const samvaluationData = (await import(
  "@tools/typescript/samvaluation/samvaluationData.json"
).then((module) => module.default)) as Record<string, SamvaluationProps>

export const shipSamvaluationParse = (ship: string): SamvaluationProps => {
  const shipData = samvaluationData[ship] ?? {}

  // Original fields
  const event = {
    name: shipData.event?.name ?? "Base Game",
    href:
      shipData.event?.href ??
      "https://azurlane.koumakan.jp/wiki/Category:Ships",
  }
  const evaluation =
    shipData.evaluation?.trim() ??
    "N/A. Come back when this ship gets an Unique Augment or gets good :)"
  const preloadText = shipData.preload ?? ""

  let reduction = 0
  let quantity = 0
  let conditional = ""

  if (preloadText) {
    const lower = preloadText.toLowerCase()

    // preload
    if (/preloaded/.test(lower)) {
      reduction = 100

      const qtyMatch = preloadText.match(/(\d+)\s*preloaded/i)
      quantity = qtyMatch ? parseInt(qtyMatch[1], 10) : 0
    }
    // fast_load
    else {
      const pctMatch = preloadText.match(/(\d+)%/)
      reduction = pctMatch ? parseInt(pctMatch[1], 10) : 0

      const qtyAfterPct = preloadText.match(/%\s*(\d+)/)
      quantity = qtyAfterPct ? parseInt(qtyAfterPct[1], 10) : 0
    }

    // condition
    const condMatch = preloadText.match(/\(([^)]+)\)/)
    conditional = condMatch ? condMatch[1].trim() : ""
  }
  let preload2 = null

  if (reduction) {
    preload2 = {
      text: preloadText,
      reduction,
      quantity,
      conditional,
    }
  }

  return {
    event,
    evaluation,
    preload2,
  }
}
