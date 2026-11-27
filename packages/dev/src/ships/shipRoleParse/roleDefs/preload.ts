import samvaluationDataJson from "@/tools/samvaluation/samvaluationData.json"
import type { SamvaluationProps } from "@/tools/samvaluation/types"

const samvaluationData = samvaluationDataJson as Record<
  string,
  SamvaluationProps
>

export const preloadRole = (): Set<string> => {
  const preloadSet = new Set<string>()

  for (const key in samvaluationData) {
    const shipProps = samvaluationData[key]
    if (shipProps?.preload && shipProps.preload.includes("Preloaded")) {
      preloadSet.add(key)
    }
  }

  return preloadSet
}
