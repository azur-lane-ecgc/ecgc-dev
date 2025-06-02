import type { ShipData } from "@db/types"

export const hasUniqueAugment = (
  augments: ShipData["augments"] | null,
  hullType: string,
): boolean => {
  if (!!!augments) return false

  if (hullType.startsWith("AR") || hullType.startsWith("BM")) {
    return augments.length > 1
  }

  if (hullType.startsWith("IX")) {
    return augments.length > 0
  }

  return augments.length > 2
}
