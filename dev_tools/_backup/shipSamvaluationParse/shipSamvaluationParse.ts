export interface SamvaluationProps {
  event?: {
    name: string
    href: string
  }
  evaluation?: string
  preload?: string
}

const samvaluationData = (await import(
  "@tools/samvaluation/samvaluationData.json"
).then((module) => module.default)) as Record<string, SamvaluationProps>

export const shipSamvaluationParse = (ship: string): SamvaluationProps => {
  const shipData = samvaluationData[ship] ?? {}

  return {
    event: {
      name: shipData.event?.name ?? "Base Game",
      href:
        shipData.event?.href ??
        "https://azurlane.koumakan.jp/wiki/Category:Ships",
    },
    evaluation:
      shipData.evaluation?.trim() ??
      "N/A. Come back when this ship gets an Unique Augment or gets good :)",
    preload: shipData?.preload ?? "",
  }
}
