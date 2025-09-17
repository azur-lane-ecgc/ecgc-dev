import type {
  LocationProps,
  ResourceProps,
} from "../../components/CommonResource/CommonResourceData/types"

const numChapters = 15

export const getTotalGuaranteed = (
  resource: ResourceProps,
): {
  bimonthly: number | "N/A"
  monthly: number | "N/A"
  weekly: number | "N/A"
  daily: number | "N/A"
  oneTime?: number | "N/A"
} => {
  let monthlyTotal = 0
  let bimonthlyTotal = 0
  let oneTimeTotal = 0

  if (resource.drops) {
    for (const key in resource.drops) {
      const location: LocationProps | undefined =
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
              case "one-time":
                oneTimeTotal += amount
                break
              case "chapter":
                oneTimeTotal += amount * numChapters
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
    monthly: monthlyTotal || Math.floor(bimonthlyTotal / 2),
    weekly: Math.floor(monthlyTotal / 4),
    daily: Math.floor(monthlyTotal / 30),
    oneTime: oneTimeTotal || "N/A",
  }
}
