import type { SamvaluationProps } from "dev_tools/ships/shipSamvaluationParse"

const samvaluationData = (await import(
  "@data/samvaluation/samvaluationData.json"
).then((module) => module.default)) as Record<string, SamvaluationProps>

export const preloadRole = (): Set<string> => {
  const resultSet = new Set<string>()

  for (const key in samvaluationData) {
    const shipProps = samvaluationData[key]
    if (shipProps.preload && shipProps.preload.match("Preloaded")) {
      resultSet.add(key)
    }
  }

  return resultSet
}
