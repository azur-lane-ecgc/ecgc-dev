import type { AllShipData } from "@db/types"

export const hasUniqueAugment = (
  augments: AllShipData["augments"] | null,
  hullType: string,
): boolean => {
  if (!!!augments) return false

  if (hullType.startsWith("AE") || hullType.startsWith("BM")) {
    return augments.length > 1
  }

  if (hullType.startsWith("IX")) {
    return augments.length > 0
  }

  return augments.length > 2
}
