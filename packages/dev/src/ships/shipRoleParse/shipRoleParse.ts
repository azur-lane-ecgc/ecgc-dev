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

const tanks = tankRole()
const superTanks = superTankRole()
const fastLoadShips = fastLoadRole()
const preloadShips = preloadRole()
const aaShips = aaRole()
const aaCarryShips = aaCarryRole()
const aswShips = aswRole()
const damageDealerShips = damageDealer()
const strongDamageDealers = strongDamageDealer()
const genOffSupport = offensiveSupport()
const genDefSupport = defensiveSupport()
const healer = mainHealSupport

export const shipRoleParse = (
  ship: string,
  fleetType?: string,
  hullType?: string,
): string[] => {
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
    if (flagshipPref(ship)) {
      roles.push("FlagPref")
    }
    if (hullType && flagshipReq(ship, hullType)) {
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
    (fleetType === "vg" && isGoodVGFleet(ship)) ||
    (fleetType === "main" && isGoodMainFleet(ship)) ||
    (fleetType === "ss" && isGoodSSFleet(ship))

  // testing
  if (roles.length === 0 || (roles.length > 0 && !isGood)) {
    if (fleetType == "vg" && isDecentVG(ship)) {
      roles.push("Meh")
    } else if (fleetType == "main" && isDecentMainFleet(ship)) {
      roles.push("Meh")
    } else if (fleetType == "ss" && isDecentSSFleet(ship)) {
      roles.push("Meh")
    } else {
      roles.push("Bad")
    }
  }

  return roles
}
