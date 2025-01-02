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
  return (
    samvaluationData[ship] ?? {
      event: {
        name: "Base Game",
        href: "https://azurlane.koumakan.jp/wiki/Category:Ships",
      },
      evaluation: "N/A",
    }
  )
}
