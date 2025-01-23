import type { ShipAAProps } from "@data/aa/types"
import type {
  VanguardFleetRankingProps,
  MainFleetRankingProps,
} from "@data/rankings/types"

const shipAAData = (await import("@data/aa/shipAA.json").then(
  (module) => module.default,
)) as Record<string, ShipAAProps[]>

const VGFleetRankingData: Record<string, VanguardFleetRankingProps[]> =
  (await import("@data/rankings/vgFleetRankings.json").then(
    (module) => module.default,
  )) as Record<string, VanguardFleetRankingProps[]>

const MainFleetRankingData: Record<string, MainFleetRankingProps[]> =
  (await import("@data/rankings/vgFleetRankings.json").then(
    (module) => module.default,
  )) as Record<string, MainFleetRankingProps[]>

export const aaRole = (): Set<string> => {
  const aaSet = new Set<string>()

  for (const shipName of Object.keys(shipAAData)) {
    const shipAAStats = shipAAData[shipName]
    if (shipAAStats) {
      for (const stats of shipAAStats) {
        const percentSD = parseFloat(stats.percentSD.replace("%", ""))
        if (percentSD >= 69) {
          aaSet.add(shipName)
          break
        }
      }
    }

    const vgRankings = VGFleetRankingData[shipName]
    if (vgRankings) {
      for (const ranking of vgRankings) {
        if (ranking.aa && ranking.aa >= 3) {
          aaSet.add(shipName)
          break
        }
      }
    }

    const mainRankings = MainFleetRankingData[shipName]
    if (mainRankings) {
      for (const ranking of mainRankings) {
        if (ranking.aa && ranking.aa >= 2) {
          aaSet.add(shipName)
          break
        }
      }
    }
  }

  return aaSet
}
