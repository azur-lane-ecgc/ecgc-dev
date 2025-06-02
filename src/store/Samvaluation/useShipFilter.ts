import { useEffect, useReducer } from "react"

import type {
  ShipData,
  MainFleetRankingProps,
  VanguardFleetRankingProps,
  SSFleetRankingProps,
  // ShipEHPProps,
} from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>
const mainFleetRankings = (await import("@db/rankings/mainFleetRankings.json"))
  .default as Record<string, MainFleetRankingProps[]>
const vgFleetRankings = (await import("@db/rankings/vgFleetRankings.json"))
  .default as Record<string, VanguardFleetRankingProps[]>
const ssFleetRankings = (await import("@db/rankings/ssFleetRankings.json"))
  .default as Record<string, SSFleetRankingProps[]>
// const ehp = (await import("@db/ehp/shipEHP.json")).default as Record<
//   string,
//   ShipEHPProps[]
// >

import { normalizeString } from "@utils/string"
import {
  allianceFactionsMap,
  fleetTypeMapping,
  hasUniqueAugment,
  getHighestValue,
} from "@utils/ships"

export interface ShipFilterProps {
  visibleShips: ShipData[]
  filters: {
    hullType: string[]
    rarity: string[]
    searchTerm: string
    isKai: "true" | "false" | ""
    hasUniqueAugment: "true" | "false" | ""
    fleetType: string[]
    faction: string[]
    roles: {
      values: string[]
      logic: boolean
    }
    rankingSort: {
      value: string
      logic: boolean | null
    }
    event: string
  }
  reset: string
  loading: boolean
}

export interface ShipAction {
  type: string
  payload: any
}

const fetchFilteredShips = async (
  filters: ShipFilterProps["filters"],
): Promise<ShipData[]> => {
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
    const internalFleetTypes = filters.fleetType.map(
      (fleet) => fleetTypeMapping[fleet],
    )
    ships = ships.filter((ship) => internalFleetTypes.includes(ship.fleetType))
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
    ships = ships.filter((ship) => {
      const isInAlliance = filters.faction.some((selectedFaction) => {
        const alliance = allianceFactionsMap[selectedFaction]
        if (alliance) {
          return alliance.includes(ship.faction)
        }
        return false
      })
      const isInSelectedFactions = filters.faction.includes(ship.faction)
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
    ships = ships.filter((ship) => filters.rarity.includes(String(ship.rarity)))
  }

  // 10) Ranking sort filter (adjusted to supply an object with mfRankings/vgRankings/ssRankings)
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

  // 11) If no rankingSort but rarity filters were applied, maintain grouping by rarity sequence
  if (filters.rarity.length > 0) {
    // First sort by id so we can extract in id order
    ships = ships.sort((a, b) => a.id - b.id)
    const byRarity: ShipData[] = []
    for (const rarity of filters.rarity) {
      byRarity.push(...ships.filter((ship) => String(ship.rarity) === rarity))
    }
    return byRarity
  }

  // 12) Default: sort by id ascending
  return ships.sort((a, b) => a.id - b.id)
}

export const initialFilters: ShipFilterProps["filters"] = {
  hullType: [],
  rarity: [],
  searchTerm: "",
  isKai: "",
  hasUniqueAugment: "",
  fleetType: [],
  faction: [],
  roles: {
    values: [],
    logic: false,
  },
  rankingSort: {
    value: "",
    logic: null,
  },
  event: "",
}

// main filtering hook
const shipReducer = (
  state: ShipFilterProps,
  action: ShipAction,
): ShipFilterProps => {
  switch (action.type) {
    case "SET_SHIPS":
      return {
        ...state,
        visibleShips: action.payload,
        loading: false,
      }
    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...(action.payload as Partial<ShipFilterProps["filters"]>),
        },
        loading: true,
      }
    case "RESET_FILTER":
      return {
        ...state,
        filters: initialFilters,
        reset: state.reset === "t" ? "f" : "t",
        loading: true,
      }
    default:
      return state
  }
}

export const useShipFilter = (initFilters: ShipFilterProps["filters"]) => {
  const [state, dispatch] = useReducer(shipReducer, {
    visibleShips: Object.values(shipData),
    filters: initFilters,
    reset: "t",
    loading: true,
  })

  useEffect(() => {
    if (state.loading) {
      fetchFilteredShips(state.filters)
        .then((filteredShips) => {
          dispatch({ type: "SET_SHIPS", payload: filteredShips })
        })
        .catch(() => {
          console.error("Error fetching filtered ships.")
        })
    }
  }, [state.filters, state.loading])

  return { state, dispatch }
}
