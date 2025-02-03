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
} from "./data"

const tanks = tankRole()
const superTanks = superTankRole()
const fastLoadShips = fastLoadRole()
const preloadShips = preloadRole()
const aaShips = aaRole()
const aaCarryShips = aaCarryRole()
const aswShips = aswRole()
const damageDealerShips = damageDealer()
const strongDamageDealers = strongDamageDealer()

export const shipRoleParse = (ship: string, fleetType?: string): string[] => {
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
  // <add here>

  // global roles
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

  // testing
  if (roles.length === 0) {
    roles.push("Healer")
  }

  return roles
}
