import { useReducer, useEffect } from "react"
import { db } from "@db/dexie"
import type { ShipData, AllShipData } from "@db/types"

const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

import { normalizeString } from "@utils/string"

interface ShipState {
  visibleShips: AllShipData[]
  filters: {
    hullType: string[]
    rarity: number[]
    searchTerm: string
    isKai: "true" | "false" | ""
    hasUniqueAugment: "true" | "false" | ""
    fleetType: string[]
  }
  reset: string
}

interface ShipAction {
  type: string
  payload: any
}

const initialState = {
  visibleShips: Object.values(shipData) as AllShipData[],
  filters: {
    hullType: [],
    rarity: [],
    searchTerm: "",
    isKai: "",
    hasUniqueAugment: "",
    fleetType: [],
  },
}

const shipReducer = (state: ShipState, action: ShipAction): ShipState => {
  switch (action.type) {
    case "SET_SHIPS":
      return { ...state, visibleShips: action.payload as AllShipData[] }
    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...(action.payload as Partial<ShipState["filters"]>),
        },
      }
    case "RESET_FILTER":
      return {
        ...state,
        filters: initialState.filters as ShipState["filters"],
        reset: state.reset === "t" ? "f" : "t",
      }
    default:
      return state
  }
}

export const rarityOptions = [
  { label: "Ultra Rare (5)", value: 5 },
  { label: "Super Rare (4)", value: 4 },
  { label: "Elite (3)", value: 3 },
  { label: "Rare (2)", value: 2 },
  { label: "Common (1)", value: 1 },
]
const fleetTypeMapping: Record<string, string> = {
  "Main Fleet": "main",
  "Vanguard Fleet": "vg",
  "Submarine Fleet": "ss",
}

const hasUniqueAugment = (
  augments: AllShipData["augments"] | null,
  hullType: string,
): boolean => {
  if (!!!augments) return false

  if (hullType.startsWith("AE") || hullType.startsWith("BM")) {
    return augments.length > 1
  }

  if (hullType.startsWith("IX")) {
    return augments.length > 0
  }

  return augments.length > 2
}

const fetchFilteredShips = async (filters: ShipState["filters"]) => {
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

  /*
   *
   * insert other filters above here
   *
   */

  // rarity filters
  if (filters.rarity.length > 0) {
    query = query.and((ship) => filters.rarity.includes(ship.rarity))
  }

  // sort by id within each rarity
  if (filters.rarity.length > 0) {
    return query
      .sortBy("id")
      .then((ships) =>
        filters.rarity.flatMap((rarity) =>
          ships.filter((ship) => ship.rarity === rarity),
        ),
      )
  } else {
    // default (id sort)
    return query.sortBy("id")
  }
}

// main filtering hook
export const useShipFilter = (loading: boolean = true) => {
  const [state, dispatch] = useReducer(shipReducer, {
    visibleShips: Object.values(shipData) as AllShipData[],
    filters: {
      hullType: [],
      rarity: [],
      searchTerm: "",
      isKai: "",
      hasUniqueAugment: "",
      fleetType: [],
    },
    reset: "t",
  })

  useEffect(() => {
    if (!loading) {
      fetchFilteredShips(state.filters).then((filteredShips) => {
        dispatch({ type: "SET_SHIPS", payload: filteredShips })
      })
    }
  }, [state.filters, loading])

  return { state, dispatch }
}
