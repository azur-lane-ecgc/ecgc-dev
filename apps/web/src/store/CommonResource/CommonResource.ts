interface CommonResourceFilterState {
  selectedCategory: string | null
  selectedTimeframe: string | null
  availability: "Both" | "Infinite" | "Finite"
}

type CommonResourceFilterAction =
  | { type: "SET_CATEGORY"; payload: string | null }
  | { type: "SET_TIMEFRAME"; payload: string | null }
  | { type: "SET_AVAILABILITY"; payload: "Both" | "Infinite" | "Finite" }

export const CommonResourceFilterReducer = (
  state: CommonResourceFilterState,
  action: CommonResourceFilterAction,
): CommonResourceFilterState => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload }
    case "SET_TIMEFRAME":
      return { ...state, selectedTimeframe: action.payload }
    case "SET_AVAILABILITY":
      return { ...state, availability: action.payload }
    default:
      throw new Error(`Unhandled action type: ${action}`)
  }
}
