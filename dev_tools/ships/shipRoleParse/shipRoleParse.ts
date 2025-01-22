import { tankRole, superTankRole } from "./data"

const tanks = tankRole()
const superTanks = superTankRole()

export const shipRoleParse = (ship: string, hullType?: string): string[] => {
  let roles: Array<string> = []

  if (hullType === "vg") {
    if (tanks.has(ship)) {
      roles.push("Tank")
    }

    if (superTanks.has(ship)) {
      roles.push("SuperTank")
    }
  }

  if (roles.length === 0) {
    roles.push("Healer")
  }

  return roles
}
