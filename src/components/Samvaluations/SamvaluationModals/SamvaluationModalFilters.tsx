import { ComboBox, MultiSelectCombobox } from "@components/_common/ComboBox"
import { Input } from "@components/_common/Input"
import { ThreeToggleButton } from "@components/_common/ToggleButton"
import { CustomToggleButton } from "@components/_common/ToggleButton/CustomToggleButton"

import {
  initialFilters,
  type ShipAction,
  type ShipFilterProps,
} from "@store/Samvaluation/useShipFilter"

import {
  allHullTypes,
  allianceFactionsMap,
  allFactionOptions,
  allRarities,
  allRarityOptions,
  allRoles,
  allEvents,
  rankingTypes,
} from "@utils/ships"

interface ModalFilterProps {
  state: ShipFilterProps
  dispatch: (action: ShipAction) => void
}

export const SamvaluationModalFilters: React.FC<ModalFilterProps> = ({
  state,
  dispatch,
}) => {
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
        <div className="relative">
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

          <CustomToggleButton
            className={`absolute left-0 top-[37.5px] m-1 flex justify-center rounded bg-fuchsia-200 px-1.5 py-1 text-xs ${
              state.filters.roles.values.length === 0
                ? "pointer-events-none hidden select-none"
                : ""
            }`}
            options={[
              { title: "OR", payload: "false", symbol: "\u00A0|\u00A0" },
              { title: "AND", payload: "true", symbol: "&" },
            ]}
            initialValue={0}
            onSelect={(trigger) =>
              dispatch({
                type: "SET_FILTER",
                payload: {
                  roles: {
                    ...state.filters.roles,
                    logic: trigger === "true" ? true : false,
                  },
                },
              })
            }
            reset={state.reset}
          />
        </div>
        <div className="relative">
          <ComboBox
            title="Ranking Sort"
            options={Object.keys(rankingTypes)}
            initialOption={initialFilters.rankingSort.value}
            onSelect={(role) => {
              const isFirstSelection =
                state.filters.rankingSort.value.length === 0

              dispatch({
                type: "SET_FILTER",
                payload: {
                  rankingSort: {
                    value: role ?? "",
                    logic: isFirstSelection
                      ? true
                      : state.filters.rankingSort.logic,
                  },
                },
              })
            }}
            disabled={state.filters.fleetType.length !== 1}
            disabledMessage="Need ONLY 1 Fleet Type Selected"
            reset={state.reset}
          />

          <CustomToggleButton
            className={`absolute left-0 top-[37.5px] m-1 flex justify-center rounded bg-fuchsia-200 px-1.5 py-1 text-xs ${
              !!!state.filters.rankingSort.value
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
        <div className="relative">
          <ComboBox
            title="Events"
            options={allEvents}
            initialOption={initialFilters.event}
            onSelect={(event) =>
              dispatch({
                type: "SET_FILTER",
                payload: { event: event || "" },
              })
            }
            reset={state.reset}
          />
        </div>
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
            <ThreeToggleButton
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

      {/* Scroll Marker */}
      <div
        className="pointer-events-none absolute h-0 overflow-hidden opacity-0"
        aria-hidden="true"
        id="samvaluationModalScroll"
      ></div>
      {/* Input + Button Container */}
      <div className="mb-3 flex flex-row-reverse flex-wrap justify-end gap-3.5">
        {/* Unique Augment Filter */}
        <ThreeToggleButton
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
        <ThreeToggleButton
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
    </>
  )
}
