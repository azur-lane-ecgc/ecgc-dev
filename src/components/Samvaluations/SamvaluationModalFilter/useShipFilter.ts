import { useEffect, useReducer, useState } from "react"
import { db } from "@db/dexie"
import type { ShipData, AllShipData } from "@db/types"

const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

import { normalizeString } from "@utils/string"

import {
  allianceFactionsMap,
  fleetTypeMapping,
  hasUniqueAugment,
} from "./utils"

interface ShipFilterProps {
  visibleShips: AllShipData[]
  filters: {
    hullType: string[]
    rarity: string[]
    searchTerm: string
    isKai: "true" | "false" | ""
    hasUniqueAugment: "true" | "false" | ""
    fleetType: string[]
    faction: string[]
  }
  reset: string
  loading: boolean
}

interface ShipAction {
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
      hullFilters.includes("DDG")
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

  /*
   *
   * insert other filters above here
   *
   */

  // rarity filters
  if (filters.rarity.length > 0) {
    query = query.and((ship) => filters.rarity.includes(String(ship.rarity)))
  }

  // sort by id within each rarity
  if (filters.rarity.length > 0) {
    return query
      .sortBy("id")
      .then((ships) =>
        filters.rarity.flatMap((rarity) =>
          ships.filter((ship) => String(ship.rarity) === rarity),
        ),
      )
  } else {
    // default (id sort)
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
