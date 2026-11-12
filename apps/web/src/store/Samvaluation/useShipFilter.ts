import { useReducer } from "react"

import type { ShipData } from "@/db/types"

import { filterShips } from "./shipFilterResults"

// Describe ship filter selections and their visible results.
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
    missingIconOnly: boolean
  }
  reset: string
}

// Define the initial ship filter selections.
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
  missingIconOnly: false,
}

// Describe updates to ship filter selections and reset state.
export type ShipAction =
  | { type: "SET_FILTER"; payload: Partial<ShipFilterProps["filters"]> }
  | { type: "RESET_FILTER"; payload: null }

type ShipFilterState = Omit<ShipFilterProps, "visibleShips">

const shipReducer = (
  state: ShipFilterState,
  action: ShipAction,
): ShipFilterState => {
  switch (action.type) {
    case "SET_FILTER": {
      const filters = { ...state.filters, ...action.payload }
      if (filters.fleetType.length !== 1) {
        filters.rankingSort = initialFilters.rankingSort
      }
      return { ...state, filters }
    }
    case "RESET_FILTER":
      return {
        filters: initialFilters,
        reset: state.reset === "t" ? "f" : "t",
      }
  }
}

// Manage ship filter selections and derive visible ships without effect-driven copies.
export const useShipFilter = (initFilters: ShipFilterProps["filters"]) => {
  const [state, dispatch] = useReducer(shipReducer, {
    filters: initFilters,
    reset: "t",
  })
  return {
    state: { ...state, visibleShips: filterShips(state.filters) },
    dispatch,
  }
}
