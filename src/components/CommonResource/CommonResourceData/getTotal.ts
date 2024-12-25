import type { LocationProps, ResourceProps } from "./types"

export const getTotalGuaranteed = (
  resource: ResourceProps,
): {
  bimonthly: number
  monthly: number
  weekly: number
  daily: number
} => {
  let monthlyTotal = 0
  let bimonthlyTotal = 0

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
                bimonthlyTotal += amount * 60
                break
              case "weekly":
                monthlyTotal += amount * 4
                bimonthlyTotal += amount * 8
                break
              case "monthly":
                monthlyTotal += amount
                bimonthlyTotal += amount * 2
                break
              case "bimonthly":
                bimonthlyTotal += amount
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
    bimonthly: bimonthlyTotal,
    monthly: monthlyTotal,
    weekly: Math.floor(monthlyTotal / 4),
    daily: Math.floor(monthlyTotal / 30),
  }
}
