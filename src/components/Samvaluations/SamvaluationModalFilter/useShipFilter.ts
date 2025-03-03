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

export const useShipFilter = () => {
  const [state, dispatch] = useReducer(shipReducer, {
    visibleShips: Object.values(shipData) as AllShipData[],
    filters: { hullType: [], rarity: "" },
  })

  useEffect(() => {
    const fetchFilteredShips = async () => {
      let query = db.ships.toCollection()

      if (!isFilterEmpty(state.filters)) {
        if (state.filters.hullType.length > 0) {
          const specialFilters = state.filters.hullType.filter(
            (h) => h === "DD" || h === "IX",
          )
          const regularFilters = state.filters.hullType.filter(
            (h) => h !== "DD" && h !== "IX",
          )

          if (specialFilters.length > 0) {
            query = db.ships
              .where("hullType")
              .startsWithAnyOfIgnoreCase(specialFilters)
          }
          if (regularFilters.length > 0) {
            query = db.ships.where("hullType").anyOf(regularFilters)
          }
        }

        if (state.filters.rarity) {
          const rarityNumber = parseInt(state.filters.rarity, 10)
          if (!isNaN(rarityNumber)) {
            query = query.and((ship) => ship.rarity === rarityNumber)
          }
        }
      }

      const filteredShips = await query.sortBy("id")
      dispatch({ type: "SET_SHIPS", payload: filteredShips })
    }

    fetchFilteredShips()
  }, [state.filters])

  return { state, dispatch }
}
