import { useReducer, useEffect } from "react"
import { db } from "@db/dexie"
import type { ShipData, AllShipData } from "@db/types"

const shipData = (await import("@db/ship_data/ship_data.json"))
  .default as Record<number, ShipData>

interface ShipState {
  visibleShips: AllShipData[]
  filters: {
    hullType: string[]
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

export const useShipFilter = () => {
  const [state, dispatch] = useReducer(shipReducer, {
    visibleShips: Object.values(shipData) as AllShipData[],
    filters: { hullType: [] },
  })

  useEffect(() => {
    const applyFilters = async () => {
      // Check if all filters are empty
      const areAllFiltersEmpty = Object.values(state.filters).every(
        (filterValue) =>
          (Array.isArray(filterValue) && filterValue.length === 0) ||
          !filterValue,
      )

      let query = db.ships.toCollection()

      if (!!!areAllFiltersEmpty) {
        const hullFilter = state.filters.hullType
        if (hullFilter.length > 0) {
          query = db.ships.where("hullType").anyOf(hullFilter)
        }

        // You can add more filter conditions here as you develop them
        // Example:
        // if (state.filters.someOtherFilter) {
        //   query = query.filter(ship => someOtherFilterCondition);
        // }
      }

      const filteredShips = (await query.toArray()).sort((a, b) => a.id - b.id)
      dispatch({ type: "SET_SHIPS", payload: filteredShips })
    }

    applyFilters()
  }, [state.filters])

  return { state, dispatch }
}
