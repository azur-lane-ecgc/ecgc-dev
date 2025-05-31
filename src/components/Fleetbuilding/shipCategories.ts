import type { ShipData, MainFleetRankingProps } from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>
const mainFleetRankings = (await import("@db/rankings/mainFleetRankings.json"))
  .default as Record<string, MainFleetRankingProps[]>

// fast load ships
export const fastLoadShips: ShipData[] = Object.values(shipData).filter((s) =>
  s.roles.includes("FastLoad"),
)

export const preloadShips: ShipData[] = fastLoadShips.filter((s) =>
  s.roles.includes("Preload"),
)

// healer ships
const maxVgSurvival = (name: string): number =>
  (mainFleetRankings[name] ?? []).reduce<number>(
    (best, { vgsurvival }) => Math.max(best, vgsurvival ?? -Infinity),
    -Infinity,
  )

export const healerShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "main" &&
      (s.roles.includes("Healer") || /Klaudia/i.test(s.ship)),
  )
  .sort((a, b) => maxVgSurvival(b.ship) - maxVgSurvival(a.ship))

// utils
const entryDamage = (r: MainFleetRankingProps): number =>
  (r.lightdmg ?? 0) +
  (r.mediumdmg ?? 0) +
  (r.heavydmg ?? 0) +
  0.5 * (r.aoedmg ?? 0)

const maxDamage = (name: string): number =>
  (mainFleetRankings[name] ?? []).reduce<number>(
    (best, r) => Math.max(best, entryDamage(r)),
    -Infinity,
  )

const healerSet = new Set(healerShips.map((s) => s.ship))

// flagship ships
export const flagReqShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "main" &&
      s.roles.includes("FlagReq") &&
      !(s.roles.includes("Meh") || s.roles.includes("Bad")),
  )
  .sort((a, b) => maxDamage(b.ship) - maxDamage(a.ship))

const flagReqSet = new Set(flagReqShips.map((s) => s.ship))

// damage dealer ships

export const dmgDealerShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "main" &&
      s.roles.includes("TopDmg") &&
      !flagReqSet.has(s.ship),
  )
  .sort((a, b) => maxDamage(b.ship) - maxDamage(a.ship))

const dmgDealerSet = new Set(dmgDealerShips.map((s) => s.ship))

// off support ships
const maxOffensiveBuff = (name: string): number =>
  (mainFleetRankings[name] ?? []).reduce<number>(
    (best, { offensivebuff }) => Math.max(best, offensivebuff ?? -Infinity),
    -Infinity,
  )

export const offSupportShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "main" &&
      s.roles.includes("OffSupport") &&
      !healerSet.has(s.ship) &&
      !dmgDealerSet.has(s.ship),
  )
  .sort((a, b) => maxOffensiveBuff(b.ship) - maxOffensiveBuff(a.ship))

// def support ships
const avgSupport = (r: MainFleetRankingProps): number =>
  ((r.othermain ?? 0) + (r.vgsurvival ?? 0)) / 2

const maxDefSupport = (name: string): number =>
  (mainFleetRankings[name] ?? []).reduce<number>(
    (best, r) => Math.max(best, avgSupport(r)),
    -Infinity,
  )

export const defSupportShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "main" &&
      s.roles.includes("DefSupport") &&
      !healerSet.has(s.ship) &&
      !dmgDealerSet.has(s.ship),
  )
  .sort((a, b) => maxDefSupport(b.ship) - maxDefSupport(a.ship))
