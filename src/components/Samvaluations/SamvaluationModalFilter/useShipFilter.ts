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
  }
}

interface ShipAction {
  type: "SET_SHIPS" | "SET_FILTER"
  payload: any
}

export const rarityOptions = [
  { label: "Ultra Rare (5)", value: 5 },
  { label: "Super Rare (4)", value: 4 },
  { label: "Elite (3)", value: 3 },
  { label: "Rare (2)", value: 2 },
  { label: "Common (1)", value: 1 },
]

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
    default:
      return state
  }
}

const fetchFilteredShips = async (filters: ShipState["filters"]) => {
  let query = db.ships.toCollection()

  // string filters (ignore all other filters)
  if (!!filters.searchTerm.trim()) {
    const search = normalizeString(filters.searchTerm)

    return query
      .filter((ship) => normalizeString(ship.ship).includes(search))
      .sortBy("ship")
  }

  // hull type filters
  if (filters.hullType.length > 0) {
    let hullFilters = [...filters.hullType]

    if (hullFilters.includes("DD") || hullFilters.includes("IX")) {
      query = db.ships
        .where("hullType")
        .anyOf(hullFilters.filter((h) => h !== "DD" && h !== "IX"))

      // include all DDG
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
  }

  /*
   *
   * insert other filters here
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
    filters: { hullType: [], rarity: [], searchTerm: "" },
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
