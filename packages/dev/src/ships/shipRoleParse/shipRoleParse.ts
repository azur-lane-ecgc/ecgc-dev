import {
  tankRole,
  superTankRole,
  fastLoadRole,
  preloadRole,
  aaRole,
  aswRole,
  aaCarryRole,
  damageDealer,
  strongDamageDealer,
  flagshipPref,
  flagshipReq,
  offensiveSupport,
  defensiveSupport,
  mainHealSupport,
} from "./roleDefs"
import {
  isDecentMainFleet,
  isDecentSSFleet,
  isDecentVG,
  isGoodMainFleet,
  isGoodVGFleet,
  isGoodSSFleet,
} from "./decentShips"
import type {
  ShipEHPProps,
  MainFleetRankingProps,
  VanguardFleetRankingProps,
  SSFleetRankingProps,
} from "@/db/types"
import type { ShipAAProps } from "@/tools/aa_parsing/types"

export const shipRoleParse = (
  ship: string,
  fleetType: string | undefined,
  hullType: string | undefined,
  shipEHPData: Record<string, ShipEHPProps[]>,
  shipAAData: Record<string, ShipAAProps[]>,
  mainFleetRankingData: Record<string, MainFleetRankingProps[]>,
  vgFleetRankingData: Record<string, VanguardFleetRankingProps[]>,
  ssFleetRankingData: Record<string, SSFleetRankingProps[]>,
): string[] => {
  const tanks = tankRole(shipEHPData, vgFleetRankingData)
  const superTanks = superTankRole(shipEHPData, vgFleetRankingData)
  const fastLoadShips = fastLoadRole()
  const preloadShips = preloadRole()
  const aaShips = aaRole(shipAAData, vgFleetRankingData, mainFleetRankingData)
  const aaCarryShips = aaCarryRole(
    shipAAData,
    vgFleetRankingData,
    mainFleetRankingData,
  )
  const aswShips = aswRole(vgFleetRankingData)
  const damageDealerShips = damageDealer(
    vgFleetRankingData,
    mainFleetRankingData,
    ssFleetRankingData,
  )
  const strongDamageDealers = strongDamageDealer(
    vgFleetRankingData,
    mainFleetRankingData,
    ssFleetRankingData,
  )
  const genOffSupport = offensiveSupport(
    vgFleetRankingData,
    mainFleetRankingData,
    ssFleetRankingData,
  )
  const genDefSupport = defensiveSupport(
    vgFleetRankingData,
    mainFleetRankingData,
  )
  const healer = mainHealSupport
  let roles: Array<string> = []

  // vanguard roles
  if (fleetType === "vg") {
    if (tanks.has(ship)) {
      roles.push("Tank")
    }

    if (superTanks.has(ship)) {
      roles.push("SuperTank")
    }

    if (aswShips.has(ship)) {
      roles.push("ASW")
    }
  }

  // main fleet roles
  if (fleetType === "main") {
    if (flagshipPref(ship, mainFleetRankingData)) {
      roles.push("FlagPref")
    }
    if (hullType && flagshipReq(ship, hullType, mainFleetRankingData)) {
      roles.push("FlagReq")
    }
  }
  // <add here>

  // global roles
  if (healer.has(ship)) {
    roles.push("Healer")
  }

  if (damageDealerShips.has(ship)) {
    roles.push("DmgDealer")
  }

  if (strongDamageDealers.has(ship)) {
    roles.push("TopDmg")
  }

  if (aaShips.has(ship)) {
    roles.push("AA")
  }

  if (aaCarryShips.has(ship)) {
    roles.push("AACarry")
  }

  if (fastLoadShips.has(ship)) {
    roles.push("FastLoad")
  }

  if (preloadShips.has(ship)) {
    roles.push("Preload")
  }

  if (genDefSupport.has(ship)) {
    roles.push("DefSupport")
  }

  if (genOffSupport.has(ship)) {
    roles.push("OffSupport")
  }

  const isGood =
    (fleetType === "vg" && isGoodVGFleet(ship, vgFleetRankingData)) ||
    (fleetType === "main" && isGoodMainFleet(ship, mainFleetRankingData)) ||
    (fleetType === "ss" && isGoodSSFleet(ship, ssFleetRankingData))

  // testing
  if (roles.length === 0 || (roles.length > 0 && !isGood)) {
    if (fleetType == "vg" && isDecentVG(ship, vgFleetRankingData)) {
      roles.push("Meh")
    } else if (
      fleetType == "main" &&
      isDecentMainFleet(ship, mainFleetRankingData)
    ) {
      roles.push("Meh")
    } else if (fleetType == "ss" && isDecentSSFleet(ship, ssFleetRankingData)) {
      roles.push("Meh")
    } else {
      roles.push("Bad")
    }
  }

  return roles
}
