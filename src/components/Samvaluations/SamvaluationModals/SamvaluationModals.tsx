import { HR } from "@components/_common/HR"
import { ItemContainer } from "@components/_common/ItemCell"
import { ShipModal } from "@components/_common/ShipModal"

import {
  initialFilters,
  useShipFilter,
} from "@store/Samvaluation/useShipFilter"

import { formatLocation } from "@utils/formatLocation"
import { getHighestValue, numberToLetterRank } from "@utils/ships"

import { SamvaluationModalFilters } from "./SamvaluationModalFilters"

export const SamvaluationModals: React.FC = () => {
  const { state, dispatch } = useShipFilter(initialFilters)

  return (
    <>
      <SamvaluationModalFilters state={state} dispatch={dispatch} />
      <HR />

      {/* Ship Modals */}
      {state.visibleShips.length > 0 ? (
        <ItemContainer>
          {state.visibleShips.map((ship) => (
            <ShipModal
              key={ship.id}
              shipData={ship}
              trigger={{
                iconNote: ship.isKai ? "Retrofit" : "",
                descriptionNote: state.filters.rankingSort.value
                  ? `Rank: ${numberToLetterRank(getHighestValue(ship.fleetType, ship.rankings, state.filters.rankingSort))}`
                  : null /* `Events: ${formatLocation(ship.locations.events)}` */,
                largeDescNote: false,
                hasBorder: false,
              }}
              loading={state.loading}
            />
          ))}
        </ItemContainer>
      ) : (
        <div className="container mx-auto mt-5 w-9/12 border-t !border-t-gray-400 pt-4 text-center">
          <span className="font-bold text-red-400">
            There are no ships that meet this criteria.
          </span>
        </div>
      )}
    </>
  )
}
