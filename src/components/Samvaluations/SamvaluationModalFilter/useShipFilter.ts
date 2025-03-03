import { useReducer, useEffect } from "react"
import { db } from "@db/dexie"
import type { ShipData, AllShipData } from "@db/types"

const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

interface ShipState {
  visibleShips: AllShipData[]
  filters: {
    hullType: string[]
    rarity?: string
  }
}

interface ShipAction {
  type: "SET_SHIPS" | "SET_FILTER"
  payload: any
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
    default:
      return state
  }
}

const isFilterEmpty = (filters: ShipState["filters"]): boolean => {
  return filters.hullType.length <= 0 && !!!filters.rarity
}

const applyHullTypeFilter = (query: any, hullTypes: string[]) => {
  if (hullTypes.length === 0) return query

  const specialFilters = hullTypes.filter(
    (h) => h === "DD" || h === "IX" || h === "DDGm",
  )
  const regularFilters = hullTypes.filter(
    (h) => h !== "DD" && h !== "IX" && h !== "DDGm",
  )

  if (specialFilters.length > 0) {
    const expandedSpecialFilters = specialFilters.flatMap((h) =>
      h === "DDGm" ? ["DDGv"] : h,
    )

    query = db.ships
      .where("hullType")
      .startsWithAnyOfIgnoreCase(expandedSpecialFilters)
  }

  if (regularFilters.length > 0) {
    query = db.ships.where("hullType").anyOf(regularFilters)
  }

  return query
}

const applyRarityFilter = (query: any, rarity?: string) => {
  if (!rarity) return query

  const rarityNumber = parseInt(rarity, 10)
  if (!isNaN(rarityNumber)) {
    query = query.and((ship: AllShipData) => ship.rarity === rarityNumber)
  }

  return query
}

const fetchFilteredShips = async (filters: ShipState["filters"]) => {
  let query = db.ships.toCollection()

  if (!isFilterEmpty(filters)) {
    query = applyHullTypeFilter(query, filters.hullType)
    query = applyRarityFilter(query, filters.rarity)
  }

  return query.sortBy("id")
}

export const useShipFilter = (loading: boolean = true) => {
  const [state, dispatch] = useReducer(shipReducer, {
    visibleShips: Object.values(shipData) as AllShipData[],
    filters: { hullType: [], rarity: "" },
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
