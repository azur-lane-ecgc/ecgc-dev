import { useEffect, useReducer, useState } from "react"

import { db } from "@db/dexie"
import type {
  MainFleetRankingProps,
  VanguardFleetRankingProps,
  SSFleetRankingProps,
  ShipData,
  AllShipData,
} from "@db/types"
const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

import { normalizeString } from "@utils/string"
import {
  allianceFactionsMap,
  fleetTypeMapping,
  hasUniqueAugment,
  rankingTypes,
  letterRankToNumber,
} from "@utils/ships"

export interface ShipFilterProps {
  visibleShips: AllShipData[]
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
  }
  reset: string
  loading: boolean
}

export interface ShipAction {
  type: string
  payload: any
}

const fetchFilteredShips = async (filters: ShipFilterProps["filters"]) => {
  let query = db.ships.toCollection()

  // string filters (ignore all other filters)
  if (!!filters.searchTerm.trim()) {
    const search = normalizeString(filters.searchTerm)

    return query
      .filter((ship) => normalizeString(ship.ship).includes(search))
      .sortBy("id")
  }

  // hull type filters
  if (filters.hullType.length > 0) {
    let hullFilters = [...filters.hullType]

    if (
      hullFilters.includes("DD") ||
      hullFilters.includes("IX") ||
      hullFilters.includes("DDG") ||
      hullFilters.includes("SS")
    ) {
      query = db.ships
        .where("hullType")
        .anyOf(
          hullFilters.filter((h) => h !== "DD" && h !== "IX" && h !== "DDG"),
        )

      // include all DDG
      if (hullFilters.includes("DDG")) {
        query = query.or("hullType").startsWith("DDG")
      }

      // include all DD
      if (hullFilters.includes("DD")) {
        query = query.or("hullType").startsWith("DD")
      }

      // include all IX
      if (hullFilters.includes("IX")) {
        query = query.or("hullType").startsWith("IX")
      }

      // include all SS
      if (hullFilters.includes("SS")) {
        query = query.or("hullType").startsWith("SS")
      }
    } else {
      query = db.ships.where("hullType").anyOf(hullFilters)
    }

    if (hullFilters.includes("Main Fleet")) {
      query = query.or("fleetType").equals("main")
    }
    if (hullFilters.includes("Submarine Fleet")) {
      query = query.or("fleetType").equals("ss")
    }
    if (hullFilters.includes("Vanguard Fleet")) {
      query = query.or("fleetType").equals("vg")
    }
  }

  // fleet type filter
  if (filters.fleetType.length > 0) {
    const internalFleetTypes = filters.fleetType.map(
      (fleet) => fleetTypeMapping[fleet],
    )

    query = query.and((ship) => internalFleetTypes.includes(ship.fleetType))
  }

  // retrofit filter
  if (!!filters.isKai) {
    const isKaiBool = filters.isKai === "true"
    query = query.and((ship) => ship.isKai === isKaiBool)
  }

  // unique augment filter
  if (!!filters.hasUniqueAugment) {
    const hasUniqueAugmentBool = filters.hasUniqueAugment === "true"
    query = query.and(
      (ship) =>
        hasUniqueAugment(ship.augments, ship.hullType) === hasUniqueAugmentBool,
    )
  }

  // faction filter
  if (filters.faction.length > 0) {
    query = query.and((ship) => {
      const isInAlliance = filters.faction.some((selectedFaction) => {
        if (allianceFactionsMap[selectedFaction]) {
          return allianceFactionsMap[selectedFaction].includes(ship.faction)
        }
        return false
      })

      const isInSelectedFactions = filters.faction.includes(ship.faction)

      return isInAlliance || isInSelectedFactions
    })
  }

  // roles filter
  if (filters.roles.values.length > 0) {
    if (filters.roles.logic) {
      query = query.and((ship) =>
        filters.roles.values.every((role) => ship.roles.includes(role)),
      )
    } else {
      query = query.and((ship) =>
        filters.roles.values.some((role) => ship.roles.includes(role)),
      )
    }
  }

  /*
   *
   * insert other filters above here
   *
   */

  // rarity filters
  if (filters.rarity.length > 0) {
    query = query.and((ship) => filters.rarity.includes(String(ship.rarity)))
  }

  // ranking sort filter
  if (filters.rankingSort.value && filters.rankingSort.logic !== null) {
    const sortKey = rankingTypes[filters.rankingSort.value] as string

    return query.toArray().then((ships) => {
      const shipsWithRankings = ships.map((ship) => {
        const getHighestValue = (ship: AllShipData) => {
          if (!ship.rankings) {
            return 0
          }

          const rankingsToUse =
            ship.fleetType === "vg"
              ? ship.rankings.vgRankings
              : ship.fleetType === "main"
                ? ship.rankings.mfRankings
                : ship.fleetType === "ss"
                  ? ship.rankings.ssRankings
                  : null

          if (!rankingsToUse || !Array.isArray(rankingsToUse)) {
            return 0
          }

          return Math.max(
            0,
            ...rankingsToUse.map((r) => {
              const ranking = r as any

              let value = ranking[sortKey]

              if (
                ship.fleetType === "ss" &&
                (sortKey === "w14mob" ||
                  sortKey === "w14boss" ||
                  sortKey === "w15mob" ||
                  sortKey === "w15boss")
              ) {
                value = ranking.campaign
              }

              // numeric fields (lightdmg, mediumdmg, heavydmg, offensivebuff)
              if (typeof value === "number") {
                return value ?? 0
              }

              // string fields (meta, w14mob, etc.)
              if (typeof value === "string") {
                return letterRankToNumber(value)
              }

              return 0
            }),
          )
        }

        return {
          ship,
          rankingValue: getHighestValue(ship),
        }
      })

      const groupedByRanking: Record<number, AllShipData[]> = {}

      shipsWithRankings.forEach(({ ship, rankingValue }) => {
        if (!groupedByRanking[rankingValue]) {
          groupedByRanking[rankingValue] = []
        }
        groupedByRanking[rankingValue].push(ship)
      })

      const sortedRankingValues = Object.keys(groupedByRanking)
        .map(Number)
        .sort((a, b) => (filters.rankingSort.logic ? b - a : a - b))

      return sortedRankingValues.flatMap((rankingValue) => {
        const shipsInRanking = groupedByRanking[rankingValue]

        const rarities = Array.from(
          new Set(shipsInRanking.map((ship) => ship.rarity)),
        ).sort((a, b) => b - a)

        return rarities.flatMap((rarity) =>
          shipsInRanking
            .filter((ship) => ship.rarity === rarity)
            .sort((a, b) => a.id - b.id),
        )
      })
    })
  }

  // sort by id within each rarity
  else if (filters.rarity.length > 0) {
    return query
      .sortBy("id")
      .then((ships) =>
        filters.rarity.flatMap((rarity) =>
          ships.filter((ship) => String(ship.rarity) === rarity),
        ),
      )
  }

  // default (id sort)
  else {
    return query.sortBy("id")
  }
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
        visibleShips: action.payload as AllShipData[],
        loading: false,
      }
    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...(action.payload as Partial<ShipFilterProps["filters"]>),
        },
      }
    case "RESET_FILTER":
      return {
        ...state,
        filters: initialFilters,
        reset: state.reset === "t" ? "f" : "t",
      }
    default:
      return state
  }
}

export const useShipFilter = (initialFilters: ShipFilterProps["filters"]) => {
  const [loading, setLoading] = useState<boolean>(true)

  const [state, dispatch] = useReducer(shipReducer, {
    visibleShips: Object.values(shipData) as AllShipData[],
    filters: initialFilters,
    reset: "t",
    loading: true,
  })

  useEffect(() => {
    if (loading) {
      fetchFilteredShips(state.filters)
        .then((filteredShips) => {
          dispatch({ type: "SET_SHIPS", payload: filteredShips })
        })
        .catch(() => {
          console.log("error dm developer asap")
        })
      setLoading(false)
    } else {
      fetchFilteredShips(state.filters)
        .then((filteredShips) => {
          dispatch({ type: "SET_SHIPS", payload: filteredShips })
        })
        .catch(() => {
          console.log("error dm developer asap")
        })
    }
  }, [state.filters])

  return { state, dispatch }
}
