import type { ShipData } from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

export const allRoles = Array.from(
  new Set(
    [
      ...Object.values(shipData)
        .map((ship) => ship.roles)
        .flat(),
    ].filter((role) => role !== "Bad" && role !== "Meh"),
  ),
).sort()

export const trimRoles = (roles: string[]): string[] => {
  // Super Tank & Tank (trim Tank)
  if (roles.includes("SuperTank") && roles.includes("Tank")) {
    roles = roles.filter((role) => role !== "Tank")
  }

  // Fast Load & Preload (trim FastLoad)
  if (roles.includes("FastLoad") && roles.includes("Preload")) {
    roles = roles.filter((role) => role !== "FastLoad")
  }

  // FlagPref & FlagReq (trim FlagPref)
  if (roles.includes("FlagPref") && roles.includes("FlagReq")) {
    roles = roles.filter((role) => role !== "FlagPref")
  }

  // AA Carry & AA Average (trim AA)
  if (roles.includes("AA") && roles.includes("AACarry")) {
    roles = roles.filter((role) => role !== "AA")
  }

  // Strong Damage Dealer & Average Damage Dealer (trim DmgDealer)
  if (roles.includes("DmgDealer") && roles.includes("TopDmg")) {
    roles = roles.filter((role) => role !== "DmgDealer")
  }

  // Healer & DefSupport (trim DefSupport )
  if (roles.includes("Healer") && roles.includes("DefSupport")) {
    roles = roles.filter((role) => role !== "DefSupport")
  }

  return roles.slice(0, 5)
}
