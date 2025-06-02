import type { ShipData, VanguardFleetRankingProps } from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>
const vgFleetRankings = (await import("@db/rankings/vgFleetRankings.json"))
  .default as Record<string, VanguardFleetRankingProps[]>

// damage dealer ships
const entryDamage = (r: VanguardFleetRankingProps): number =>
  (r.lightdmg ?? 0) +
  (r.mediumdmg ?? 0) +
  (r.heavydmg ?? 0) +
  0.5 * (r.aoedmg ?? 0)

const maxDamage = (name: string): number =>
  (vgFleetRankings[name] ?? []).reduce<number>(
    (best, r) => Math.max(best, entryDamage(r)),
    Number.NEGATIVE_INFINITY,
  )

export const VGdmgDealerShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "vg" &&
      s.roles.includes("DmgDealer") &&
      !(s.roles.includes("Bad") || s.roles.includes("Meh")),
  )
  .sort((a, b) => {
    const diff = maxDamage(b.ship) - maxDamage(a.ship)
    if (diff !== 0) return diff
    if (b.rarity !== a.rarity) return b.rarity - a.rarity
    return a.ship.localeCompare(b.ship)
  })

// off support ships
const maxOffensiveBuff = (name: string): number =>
  (vgFleetRankings[name] ?? []).reduce<number>(
    (best, { offensivebuff }) =>
      Math.max(best, offensivebuff ?? Number.NEGATIVE_INFINITY),
    Number.NEGATIVE_INFINITY,
  )

export const VGoffSupportShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "vg" &&
      s.roles.includes("OffSupport") &&
      !(s.roles.includes("Bad") || s.roles.includes("Meh")),
  )
  .sort((a, b) => {
    const diff = maxOffensiveBuff(b.ship) - maxOffensiveBuff(a.ship)
    if (diff !== 0) return diff
    if (b.rarity !== a.rarity) return b.rarity - a.rarity
    return a.ship.localeCompare(b.ship)
  })

// def support ships
const avgSupport = (r: VanguardFleetRankingProps): number => {
  const defBuff = r.defensivebuff ?? 0
  const aa = r.aa ?? 0
  const asw = r.asw ?? 0
  return defBuff + (aa + asw) / 2
}

const maxDefSupport = (name: string): number =>
  (vgFleetRankings[name] ?? []).reduce<number>(
    (best, r) => Math.max(best, avgSupport(r)),
    Number.NEGATIVE_INFINITY,
  )

export const VGdefSupportShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "vg" &&
      s.roles.includes("DefSupport") &&
      !(s.roles.includes("Bad") || s.roles.includes("Meh")),
  )
  .sort((a, b) => {
    const diff = maxDefSupport(b.ship) - maxDefSupport(a.ship)
    if (diff !== 0) return diff
    if (b.rarity !== a.rarity) return b.rarity - a.rarity
    return a.ship.localeCompare(b.ship)
  })

// tank ships
const maxSelfSurvival = (name: string): number =>
  (vgFleetRankings[name] ?? []).reduce<number>(
    (best, r) => Math.max(best, r.selfsurvival ?? 0),
    Number.NEGATIVE_INFINITY,
  )

export const VGsuperTankShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "vg" &&
      s.roles.includes("SuperTank") &&
      !(s.roles.includes("Bad") || s.roles.includes("Meh")),
  )
  .sort((a, b) => {
    const diff = maxSelfSurvival(b.ship) - maxSelfSurvival(a.ship)
    if (diff !== 0) return diff
    if (b.rarity !== a.rarity) return b.rarity - a.rarity
    return a.ship.localeCompare(b.ship)
  })

export const VGtankShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "vg" &&
      s.roles.includes("Tank") &&
      !s.roles.includes("SuperTank") &&
      !(s.roles.includes("Bad") || s.roles.includes("Meh")),
  )
  .sort((a, b) => {
    const diff = maxSelfSurvival(b.ship) - maxSelfSurvival(a.ship)
    if (diff !== 0) return diff
    if (b.rarity !== a.rarity) return b.rarity - a.rarity
    return a.ship.localeCompare(b.ship)
  })

// AA ships
const maxAAStat = (name: string): number =>
  (vgFleetRankings[name] ?? []).reduce<number>(
    (best, r) => Math.max(best, r.aa ?? 0),
    Number.NEGATIVE_INFINITY,
  )

export const VGaACarryShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "vg" &&
      s.roles.includes("AACarry") &&
      !(s.roles.includes("Bad") || s.roles.includes("Meh")),
  )
  .sort((a, b) => {
    const diff = maxAAStat(b.ship) - maxAAStat(a.ship)
    if (diff !== 0) return diff
    if (b.rarity !== a.rarity) return b.rarity - a.rarity
    return a.ship.localeCompare(b.ship)
  })

export const VGaaShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "vg" &&
      s.roles.includes("AA") &&
      !s.roles.includes("AACarry") &&
      !(s.roles.includes("Bad") || s.roles.includes("Meh")),
  )
  .sort((a, b) => {
    const diff = maxAAStat(b.ship) - maxAAStat(a.ship)
    if (diff !== 0) return diff
    if (b.rarity !== a.rarity) return b.rarity - a.rarity
    return a.ship.localeCompare(b.ship)
  })

// ASW ships
const maxASWStat = (name: string): number =>
  (vgFleetRankings[name] ?? []).reduce<number>(
    (best, r) => Math.max(best, r.asw ?? 0),
    Number.NEGATIVE_INFINITY,
  )

export const VGaswShips: ShipData[] = Object.values(shipData)
  .filter(
    (s) =>
      s.fleetType === "vg" &&
      s.roles.includes("ASW") &&
      !(s.roles.includes("Bad") || s.roles.includes("Meh")),
  )
  .sort((a, b) => {
    const diff = maxASWStat(b.ship) - maxASWStat(a.ship)
    if (diff !== 0) return diff
    if (b.rarity !== a.rarity) return b.rarity - a.rarity
    return a.ship.localeCompare(b.ship)
  })
