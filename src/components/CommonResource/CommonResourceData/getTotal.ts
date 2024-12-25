import type { LocationProps, ResourceProps } from "./types"

export const getTotalGuaranteed = (
  resource: ResourceProps,
): {
  monthly: number
  weekly: number
  daily: number
} => {
  let monthlyTotal = 0

  if (resource.drops) {
    for (const key in resource.drops) {
      const location: LocationProps =
        resource.drops[key as keyof ResourceProps["drops"]]

      if (location && location.found && location.locations) {
        for (const loc of location.locations) {
          const { amount, timeFrame } = loc.quantity
          if (amount !== "RNG") {
            switch (timeFrame) {
              case "daily":
                monthlyTotal += amount * 30
                break
              case "weekly":
                monthlyTotal += amount * 4
                break
              case "monthly":
                monthlyTotal += amount
                break
              default:
                break
            }
          }
        }
      }
    }
  }

  return {
    monthly: monthlyTotal,
    weekly: Math.floor(monthlyTotal / 4),
    daily: Math.floor(monthlyTotal / 30),
  }
}
