import { ItemContainer } from "@components/_common/ItemCell"
import { ShipModal } from "@components/Samvaluations/ShipModal"
import { ComboBox, MultiSelectCombobox } from "@components/_common/ComboBox"
import { Input } from "@components/_common/Input"
import { ToggleButton } from "@components/_common/ToggleButton"

import { checkAndUpdateDatabase } from "@db/populateDb"

import { formatLocation } from "@utils/formatLocation"

import { initialFilters, useShipFilter } from "./useShipFilter"
import {
  allHullTypes,
  allianceFactionsMap,
  allFactionOptions,
  allRarities,
  allRarityOptions,
} from "./utils"

export const SamvaluationModalFilter: React.FC = () => {
  const { state, dispatch } = useShipFilter(initialFilters)

  return (
    <>
      <div className="mb-3">
        <button
          className="rounded-xl border border-pink-800 bg-purple-400 px-4 py-2 shadow-lg hover:bg-purple-300"
          onClick={() => dispatch({ type: "RESET_FILTER", payload: null })}
        >
          <div className="text-center font-bold text-black">Clear Filters</div>
        </button>
      </div>

      {/* ComboBoxes */}
      <div className="mb-3 flex flex-row flex-wrap gap-3.5">
        <MultiSelectCombobox
          title="Fleet Type"
          options={["Main Fleet", "Vanguard Fleet", "Submarine Fleet"]}
          initialOptions={initialFilters.fleetType}
          onSelect={(fleetType) =>
            dispatch({
              type: "SET_FILTER",
              payload: { fleetType: fleetType },
            })
          }
          reset={state.reset}
        />
        <MultiSelectCombobox
          title="Hull Type"
          options={allHullTypes}
          initialOptions={initialFilters.hullType}
          onSelect={(hullType) =>
            dispatch({
              type: "SET_FILTER",
              payload: { hullType: hullType || [] },
            })
          }
          reset={state.reset}
        />
        <MultiSelectCombobox
          title="Faction"
          options={[...allFactionOptions.map((option) => option.label)]}
          initialOptions={initialFilters.faction}
          onSelect={(selectedLabels) =>
            dispatch({
              type: "SET_FILTER",
              payload: {
                faction:
                  selectedLabels
                    ?.map((label) => {
                      if (allianceFactionsMap[label]) {
                        return label
                      }
                      return allFactionOptions.find(
                        (option) => option.label === label,
                      )?.value
                    })
                    .filter(Boolean) || [],
              },
            })
          }
          reset={state.reset}
        />
        <MultiSelectCombobox
          title="Rarity"
          options={allRarityOptions}
          initialOptions={initialFilters.rarity}
          onSelect={(selectedLabels) =>
            dispatch({
              type: "SET_FILTER",
              payload: {
                rarity:
                  selectedLabels
                    ?.map((label) => allRarities[label])
                    .filter((value) => value !== undefined)
                    .sort((a, b) => Number(b) - Number(a)) || [],
              },
            })
          }
          reset={state.reset}
        />
      </div>

      {/* Input + Button Container */}
      <div className="mb-3 flex flex-row-reverse flex-wrap justify-end gap-3.5">
        {/* Unique Augment Filter */}
        <ToggleButton
          title="Augments"
          options={[
            { title: "All", payload: "" },
            { title: "Unique", payload: "true" },
            { title: "Standard", payload: "false" },
          ]}
          initialValue={0}
          onSelect={(nextOption) =>
            dispatch({
              type: "SET_FILTER",
              payload: { hasUniqueAugment: nextOption },
            })
          }
          reset={state.reset}
        />

        {/* Retrofit Filter */}
        <ToggleButton
          title="Retrofit"
          options={[
            { title: "All", payload: "" },
            { title: "Has-Retrofit", payload: "true" },
            { title: "No Retrofit", payload: "false" },
          ]}
          initialValue={0}
          onSelect={(nextOption) =>
            dispatch({
              type: "SET_FILTER",
              payload: { isKai: nextOption },
            })
          }
          reset={state.reset}
        />

        {/* Search Bar */}
        <Input
          className="w-full sm:w-56 md:w-72"
          title="Ship Name"
          onSelect={(searchTerm) =>
            dispatch({
              type: "SET_FILTER",
              payload: { searchTerm: searchTerm.trim() },
            })
          }
          placeholder="Base Name ONLY"
          debounceTimer={275}
          reset={state.reset}
        />
      </div>

      {/* Ship Modals */}
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
    </>
  )
}
