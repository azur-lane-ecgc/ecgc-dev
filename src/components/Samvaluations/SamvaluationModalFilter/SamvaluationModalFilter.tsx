import { ItemContainer } from "@components/_common/ItemCell"
import { ShipModal } from "@components/_common/ShipModal"
import { MultiSelectCombobox } from "@components/_common/ComboBox"
import { Input } from "@components/_common/Input"
import { ToggleButton } from "@components/_common/ToggleButton"

import { formatLocation } from "@utils/formatLocation"

import { initialFilters, useShipFilter } from "./useShipFilter"
import {
  allHullTypes,
  allianceFactionsMap,
  allFactionOptions,
  allRarities,
  allRarityOptions,
  allRoles,
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

      <div className="mb-3 flex flex-row flex-wrap gap-3.5">
        <MultiSelectCombobox
          title="Fleet Roles"
          options={allRoles}
          initialOptions={initialFilters.roles.values}
          onSelect={(roles) =>
            dispatch({
              type: "SET_FILTER",
              payload: { roles: { ...state.filters.roles, values: roles } },
            })
          }
          reset={state.reset}
        />
      </div>

      {/* conditional filters */}
      {/* {state.filters.fleetType.includes("Main Fleet") && (
        <div className="mb-3 flex flex-row flex-wrap gap-3.5">
          <MultiSelectCombobox
            title="Fleet Type"
            options={["Main Fleet", "Vanguard Fleet", "Submarine Fleet"]}
            initialOptions={initialFilters.fleetType}
            onSelect={(fleetType) => {
              console.log("hi")
              return false
            }}
            reset={state.filters.fleetType.includes("Main Fleet")}
          />
          <ToggleButton
            title="Sort"
            options={[
              { title: "None", payload: "" },
              { title: "Ascending", payload: "asc" },
              { title: "Descending", payload: "desc" },
            ]}
            initialValue={0}
            onSelect={(fleetType) => {
              console.log("hi")
              return false
            }}
            reset={state.reset}
          />
        </div>
      )} */}

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
