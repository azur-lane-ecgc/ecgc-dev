import data from "./data.json"

interface SamvaluationProps {
  event: {
    name: string
    href: string
  }
  evaluation: string
}

const samvaluationData = data as Record<string, SamvaluationProps>

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
  }
}
