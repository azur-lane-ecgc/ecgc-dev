import { ItemContainer } from "@components/_common/ItemCell"
import { ShipModal } from "@components/_common/ShipModal"
import { MultiSelectCombobox } from "@components/_common/ComboBox"
import { Input } from "@components/_common/Input"
import {
  TwoToggleButton,
  ThreeToggleButton,
} from "@components/_common/ToggleButton"

import {
  initialFilters,
  useShipFilter,
} from "@store/Samvaluation/useShipFilter"

import { formatLocation } from "@utils/formatLocation"
import {
  allHullTypes,
  allianceFactionsMap,
  allFactionOptions,
  allRarities,
  allRarityOptions,
  allRoles,
} from "@utils/ships"
import { SamvaluationModalFilters } from "./SamvaluationModalFilters"

export const SamvaluationModals: React.FC = () => {
  const { state, dispatch } = useShipFilter(initialFilters)

  return (
    <>
      <SamvaluationModalFilters state={state} dispatch={dispatch} />

      {/* Ship Modals */}
      {state.visibleShips.length > 0 ? (
        <ItemContainer>
          {state.visibleShips.map((ship) => (
            <ShipModal
              key={ship.id}
              shipData={ship}
              trigger={{
                iconNote: "Rank: SS",
                descriptionNote: `Events: ${formatLocation(ship.locations.events)}`,
                largeDescNote: false,
                hasBorder: true,
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
