import type { SamvaluationProps } from "@/tools/samvaluation/types"

const samvaluationData = (await import(
  "@/tools/samvaluation/samvaluationData.json"
).then((module) => module.default)) as Record<string, SamvaluationProps>

export const preloadRole = (): Set<string> => {
  const preloadSet = new Set<string>()

  for (const key in samvaluationData) {
    const shipProps = samvaluationData[key]
    if (shipProps?.preload && shipProps.preload.match("Preloaded")) {
      preloadSet.add(key)
    }
  }

  return preloadSet
}
