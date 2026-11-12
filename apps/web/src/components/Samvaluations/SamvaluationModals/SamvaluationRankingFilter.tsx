import { ComboBox } from "@/components/_common/ComboBox"
import { CustomToggleButton } from "@/components/_common/ToggleButton/CustomToggleButton"
import {
  initialFilters,
  type ShipAction,
  type ShipFilterProps,
} from "@/store/Samvaluation/useShipFilter"
import { rankingTypes } from "@/utils/ships"

interface RankingFilterProps {
  state: ShipFilterProps
  dispatch: (action: ShipAction) => void
}

// Select ship ranking metrics and their sort direction for one fleet type.
export const SamvaluationRankingFilter = ({
  state,
  dispatch,
}: RankingFilterProps) => (
  <div className="relative">
    <ComboBox
      title="Ranking Sort"
      options={Object.keys(rankingTypes)}
      initialOption={initialFilters.rankingSort.value}
      onSelect={(role) => {
        const isFirstSelection = state.filters.rankingSort.value.length === 0

        dispatch({
          type: "SET_FILTER",
          payload: {
            rankingSort: {
              value: role ?? "",
              logic: isFirstSelection ? true : state.filters.rankingSort.logic,
            },
          },
        })
      }}
      disabled={state.filters.fleetType.length !== 1}
      disabledMessage="Need ONLY 1 Fleet Type Selected"
      reset={state.reset}
    />

    <CustomToggleButton
      className={`absolute top-[37.5px] left-0 m-1 flex justify-center rounded bg-fuchsia-200 px-1.5 py-1 text-xs ${
        !state.filters.rankingSort.value
          ? "pointer-events-none hidden select-none"
          : ""
      }`}
      options={[
        { title: "DESC", payload: "true", symbol: "\u2193" },
        { title: "ASC", payload: "false", symbol: "\u2191" },
      ]}
      initialValue={state.filters.rankingSort.logic === true ? 0 : 1}
      onSelect={(trigger) => {
        let newLogic: boolean | null

        if (trigger === "true") {
          newLogic = true
        } else if (trigger === "false") {
          newLogic = false
        } else {
          newLogic = null
        }

        dispatch({
          type: "SET_FILTER",
          payload: {
            rankingSort: {
              ...state.filters.rankingSort,
              logic: newLogic,
            },
          },
        })
      }}
      reset={state.reset}
    />
  </div>
)
