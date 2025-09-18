import type {
  VanguardFleetRankingProps,
  MainFleetRankingProps,
  SSFleetRankingProps,
} from "@/db/types"

import { isDecentVG, isDecentMainFleet, isDecentSSFleet } from "../decentShips"

const isDamageDealer = (
  rankings: { lightdmg: number; mediumdmg: number; heavydmg: number }[],
) => {
  return rankings.some(({ lightdmg, mediumdmg, heavydmg }) => {
    const dmgValues = [lightdmg, mediumdmg, heavydmg]
    const highDmgCount = dmgValues.filter((dmg) => dmg >= 3).length
    const midDmgCount = dmgValues.filter((dmg) => dmg >= 2).length

    return highDmgCount >= 1 || midDmgCount >= 2
  })
}

export const damageDealer = (
  VGFleetRankingData: Record<string, VanguardFleetRankingProps[]>,
  MainFleetRankingData: Record<string, MainFleetRankingProps[]>,
  SSFleetRankingData: Record<string, SSFleetRankingProps[]>,
): Set<string> => {
  const dmgDealerSet = new Set<string>()

  for (const shipName of new Set([
    ...Object.keys(VGFleetRankingData),
    ...Object.keys(MainFleetRankingData),
    ...Object.keys(SSFleetRankingData),
  ])) {
    // vg fleet dmg dealer
    if (
      VGFleetRankingData[shipName] &&
      isDecentVG(shipName, VGFleetRankingData) &&
      isDamageDealer(VGFleetRankingData[shipName])
    ) {
      dmgDealerSet.add(shipName)
    }

    // main fleet dmg dealer
    else if (
      MainFleetRankingData[shipName] &&
      isDecentMainFleet(shipName, MainFleetRankingData) &&
      isDamageDealer(MainFleetRankingData[shipName])
    ) {
      dmgDealerSet.add(shipName)
    }

    // ss fleet dmg dealer
    else if (
      SSFleetRankingData[shipName] &&
      isDecentSSFleet(shipName, SSFleetRankingData) &&
      isDamageDealer(SSFleetRankingData[shipName])
    ) {
      dmgDealerSet.add(shipName)
    }
  }

  return dmgDealerSet
}
