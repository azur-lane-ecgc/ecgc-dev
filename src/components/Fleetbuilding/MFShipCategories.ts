import type { ShipData, MainFleetRankingProps } from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>
const mainFleetRankings = (await import("@db/rankings/mainFleetRankings.json"))
  .default as Record<string, MainFleetRankingProps[]>

import { shipSort } from "@utils/ships"

// fast load ships
const fastLoadShips: ShipData[] = shipSort(
  Object.values(shipData).filter((s) => !!s.fastLoad),
)

export const reduction25to49Ships: ShipData[] = fastLoadShips.filter((s) => {
  const r = s.fastLoad?.reduction ?? 0
  return r >= 25 && r <= 49
})

export const reduction50to74Ships: ShipData[] = fastLoadShips.filter((s) => {
  const r = s.fastLoad?.reduction ?? 0
  return r >= 50 && r <= 74
})

export const reduction75to99Ships: ShipData[] = fastLoadShips.filter((s) => {
  const r = s.fastLoad?.reduction ?? 0
  return r >= 75 && r <= 99
})

export const preloadShips: ShipData[] = fastLoadShips.filter((s) => {
  const r = s.fastLoad?.reduction ?? 0
  return r === 100
})

// healer ships
const maxVgSurvival = (name: string): number =>
  (mainFleetRankings[name] ?? []).reduce<number>(
    (best, { vgsurvival }) =>
      Math.max(best, vgsurvival ?? Number.NEGATIVE_INFINITY),
    Number.NEGATIVE_INFINITY,
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
    Number.NEGATIVE_INFINITY,
  )

const healerSet = new Set(healerShips.map((s) => s.ship))

// damage dealer ships

export const dmgDealerShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "main" &&
      s.roles.includes("DmgDealer") &&
      !(s.roles.includes("Bad") || s.roles.includes("Meh")),
  )
  .sort((a, b) => maxDamage(b.ship) - maxDamage(a.ship))

// off support ships
const maxOffensiveBuff = (name: string): number =>
  (mainFleetRankings[name] ?? []).reduce<number>(
    (best, { offensivebuff }) =>
      Math.max(best, offensivebuff ?? Number.NEGATIVE_INFINITY),
    Number.NEGATIVE_INFINITY,
  )

export const offSupportShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "main" &&
      s.roles.includes("OffSupport") &&
      !healerSet.has(s.ship) &&
      !(s.roles.includes("Bad") || s.roles.includes("Meh")),
  )
  .sort((a, b) => maxOffensiveBuff(b.ship) - maxOffensiveBuff(a.ship))

// def support ships
const avgSupport = (r: MainFleetRankingProps): number =>
  ((r.othermain ?? 0) + (r.vgsurvival ?? 0)) / 2

const maxDefSupport = (name: string): number =>
  (mainFleetRankings[name] ?? []).reduce<number>(
    (best, r) => Math.max(best, avgSupport(r)),
    Number.NEGATIVE_INFINITY,
  )

export const defSupportShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "main" &&
      s.roles.includes("DefSupport") &&
      !healerSet.has(s.ship) &&
      !(s.roles.includes("Bad") || s.roles.includes("Meh")),
  )
  .sort((a, b) => maxDefSupport(b.ship) - maxDefSupport(a.ship))
