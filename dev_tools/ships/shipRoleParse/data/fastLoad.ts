import type { SamvaluationProps } from "dev_tools/ships/shipSamvaluationParse"

const samvaluationData = (await import(
  "@data/samvaluation/samvaluationData.json"
).then((module) => module.default)) as Record<string, SamvaluationProps>

export const fastLoadRole = (): Set<string> => {
  const resultSet = new Set<string>()

  for (const key in samvaluationData) {
    const shipProps = samvaluationData[key]
    if (shipProps.preload && shipProps.preload.trim() !== "") {
      resultSet.add(key)
    }
  }

  return resultSet
}
