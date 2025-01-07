import data from "./data.json"

interface SamvaluationProps {
  evaluation?: string
  preload?: string
}

const samvaluationData = data as Record<string, SamvaluationProps>

export const shipSamvaluationParse = (ship: string): SamvaluationProps => {
  const shipData = samvaluationData[ship] ?? {}

  return {
    evaluation:
      shipData.evaluation?.trim() ??
      "N/A. Come back when this ship gets an Unique Augment or gets good :)",
    preload: shipData?.preload ?? "",
  }
}
