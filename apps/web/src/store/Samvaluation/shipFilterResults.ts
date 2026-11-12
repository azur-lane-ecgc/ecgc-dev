import mainFleetRankingsJson from "@/db/rankings/mainFleetRankings.json"
import ssFleetRankingsJson from "@/db/rankings/ssFleetRankings.json"
import vgFleetRankingsJson from "@/db/rankings/vgFleetRankings.json"
import shipDataJson from "@/db/ship_data/ship_data.json"
import type {
  ShipData,
  MainFleetRankingProps,
  VanguardFleetRankingProps,
  SSFleetRankingProps,
} from "@/db/types"
const shipData = shipDataJson as Record<number, ShipData>
const mainFleetRankings = mainFleetRankingsJson as Record<
  string,
  MainFleetRankingProps[]
>
const vgFleetRankings = vgFleetRankingsJson as Record<
  string,
  VanguardFleetRankingProps[]
>
const ssFleetRankings = ssFleetRankingsJson as Record<
  string,
  SSFleetRankingProps[]
>

import {
  allianceFactionsMap,
  fleetTypeMapping,
  getShipIconName,
  hasUniqueAugment,
  getHighestValue,
  shipIcons,
} from "@/utils/ships"
import { normalizeString } from "@/utils/string"

import type { ShipFilterProps } from "./useShipFilter"

// Derive filtered ship results from the generated ship database.
export const filterShips = (
  filters: ShipFilterProps["filters"],
): ShipData[] => {
  let ships = Object.values(shipData)

  // search term
  if (filters.searchTerm.trim() !== "") {
    const search = normalizeString(filters.searchTerm)
    return ships
      .filter((ship) => normalizeString(ship.ship).includes(search))
      .sort((a, b) => a.id - b.id)
  }

  // 2) Hull type filters
  if (filters.hullType.length > 0) {
    const hullFilters = [...filters.hullType]
    ships = ships.filter((ship) => {
      let matches = false

      for (const hull of hullFilters) {
        // Prefix-based hull types
        if (hull === "DD" && ship.hullType.startsWith("DD")) {
          matches = true
          break
        }
        if (hull === "IX" && ship.hullType.startsWith("IX")) {
          matches = true
          break
        }
        if (hull === "DDG" && ship.hullType.startsWith("DDG")) {
          matches = true
          break
        }
        if (hull === "SS" && ship.hullType.startsWith("SS")) {
          matches = true
          break
        }
        // Exact hullType match (e.g., "BB", "CV", etc.)
        if (
          hull !== "DD" &&
          hull !== "IX" &&
          hull !== "DDG" &&
          hull !== "SS" &&
          ship.hullType === hull
        ) {
          matches = true
          break
        }
        // "Main Fleet", "Vanguard Fleet", "Submarine Fleet" treated as special
        if (hull === "Main Fleet" && ship.fleetType === "main") {
          matches = true
          break
        }
        if (hull === "Vanguard Fleet" && ship.fleetType === "vg") {
          matches = true
          break
        }
        if (hull === "Submarine Fleet" && ship.fleetType === "ss") {
          matches = true
          break
        }
      }

      return matches
    })
  }

  // 3) Fleet type filter
  if (filters.fleetType.length > 0) {
    const internalFleetTypes = new Set(
      filters.fleetType.map((fleet) => fleetTypeMapping[fleet]),
    )
    ships = ships.filter((ship) => internalFleetTypes.has(ship.fleetType))
  }

  // 4) Retrofit (isKai) filter
  if (filters.isKai !== "") {
    const isKaiBool = filters.isKai === "true"
    ships = ships.filter((ship) => ship.isKai === isKaiBool)
  }

  // 5) Unique augment filter
  if (filters.hasUniqueAugment !== "") {
    const hasUniqueAugmentBool = filters.hasUniqueAugment === "true"
    ships = ships.filter(
      (ship) =>
        hasUniqueAugment(ship.augments, ship.hullType) === hasUniqueAugmentBool,
    )
  }

  // 6) Faction filter
  if (filters.faction.length > 0) {
    const selectedFactions = new Set(filters.faction)
    ships = ships.filter((ship) => {
      const isInAlliance = filters.faction.some((selectedFaction) => {
        const alliance = allianceFactionsMap[selectedFaction]
        if (alliance) {
          return alliance.includes(ship.faction)
        }
        return false
      })
      const isInSelectedFactions = selectedFactions.has(ship.faction)
      return isInAlliance || isInSelectedFactions
    })
  }

  // 7) Roles filter
  if (filters.roles.values.length > 0) {
    if (filters.roles.logic) {
      // AND logic: ship must include every selected role
      ships = ships.filter((ship) =>
        filters.roles.values.every((role) => ship.roles.includes(role)),
      )
    } else {
      // OR logic: ship must include at least one selected role
      ships = ships.filter((ship) =>
        filters.roles.values.some((role) => ship.roles.includes(role)),
      )
    }
  }

  // 8) Event filter
  if (filters.event) {
    ships = ships.filter((ship) =>
      ship.locations.events.some((loc) => loc.name === filters.event),
    )
  }

  // 9) Rarity filters
  if (filters.rarity.length > 0) {
    const selectedRarities = new Set(filters.rarity)
    ships = ships.filter((ship) => selectedRarities.has(String(ship.rarity)))
  }

  // 10) Missing icon only filter
  if (filters.missingIconOnly) {
    ships = ships.filter(
      (ship) => !shipIcons[getShipIconName(ship.ship, ship.isKai)],
    )
  }

  // 11) Ranking sort filter (adjusted to supply an object with mfRankings/vgRankings/ssRankings)
  if (filters.rankingSort.value && filters.rankingSort.logic !== null) {
    const shipsWithRankings = ships.map((ship) => {
      let mfRankings: MainFleetRankingProps[] | null = null
      let vgRankings: VanguardFleetRankingProps[] | null = null
      let ssRankings: SSFleetRankingProps[] | null = null

      if (ship.fleetType === "main") {
        mfRankings = mainFleetRankings[ship.ship] || null
      } else if (ship.fleetType === "vg") {
        vgRankings = vgFleetRankings[ship.ship] || null
      } else if (ship.fleetType === "ss") {
        ssRankings = ssFleetRankings[ship.ship] || null
      }

      // Now call getHighestValue with the object
      const rankingValue = getHighestValue(
        ship.fleetType,
        { mfRankings, vgRankings, ssRankings },
        filters.rankingSort,
      )

      return { ship, rankingValue }
    })

    // Group ships by their rankingValue
    const groupedByRanking: Record<number, ShipData[]> = {}
    shipsWithRankings.forEach(({ ship, rankingValue }) => {
      if (!groupedByRanking[rankingValue]) {
        groupedByRanking[rankingValue] = []
      }
      groupedByRanking[rankingValue].push(ship)
    })

    // Sort ranking values (descending if logic=true, ascending if false)
    const sortedRankingValues = Object.keys(groupedByRanking)
      .map(Number)
      .sort((a, b) => (filters.rankingSort.logic ? b - a : a - b))

    // For each rankingValue group, further sort by rarity descending, then by id ascending
    const result: ShipData[] = []
    for (const val of sortedRankingValues) {
      const shipsInRanking = groupedByRanking[val]
      // Group by rarity
      const rarityGroups: Record<number, ShipData[]> = {}
      shipsInRanking.forEach((ship) => {
        const r = ship.rarity
        if (!rarityGroups[r]) {
          rarityGroups[r] = []
        }
        rarityGroups[r].push(ship)
      })

      // Sort rarities descending
      const sortedRarities = Object.keys(rarityGroups)
        .map(Number)
        .sort((a, b) => b - a)

      for (const r of sortedRarities) {
        // For ships with this rarity, sort by id ascending
        const group = rarityGroups[r].sort((a, b) => a.id - b.id)
        result.push(...group)
      }
    }

    return result
  }

  // 12) If no rankingSort but rarity filters were applied, maintain grouping by rarity sequence
  if (filters.rarity.length > 0) {
    // First sort by id so we can extract in id order
    ships = ships.sort((a, b) => a.id - b.id)
    const byRarity: ShipData[] = []
    for (const rarity of filters.rarity) {
      byRarity.push(...ships.filter((ship) => String(ship.rarity) === rarity))
    }
    return byRarity
  }

  // 13) Default: sort by id ascending
  return ships.sort((a, b) => a.id - b.id)
}
