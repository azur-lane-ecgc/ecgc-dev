import { useMemo, useReducer } from "react"

import { ComboBox } from "@/components/_common/ComboBox"
import { ItemContainer } from "@/components/_common/ItemCell"
import { ThreeToggleButton } from "@/components/_common/ToggleButton"

import {
  CommonResourceFilterReducer,
  type CommonResourceFilterState,
} from "@/store/CommonResource"

import { FiniteResourceData, InfiniteResourceData } from "../CommonResourceData"
import { ResourceModal } from "../ResourceModal"
import type { ResourceProps } from "../CommonResourceData/types"

const combinedData: ResourceProps[] =
  InfiniteResourceData.concat(FiniteResourceData)

interface CommonResourceModalFilterProps {
  className?: string
}

const timeframeMapping: { [key: string]: string } = {
  Daily: " / Day",
  Weekly: " / Week",
  Monthly: " / Month",
  Bimonthly: " / 2 Months",
  "One-Time": " / Total",
}

const propMapping: { [key: string]: keyof ResourceProps["total"] } = {
  Daily: "daily",
  Weekly: "weekly",
  Monthly: "monthly",
  Bimonthly: "bimonthly",
  "One-Time": "oneTime",
}

const filterCommonResources = (
  filterState: CommonResourceFilterState,
): ResourceProps[] => {
  const dataByAvailability =
    filterState.availability === "Infinite"
      ? InfiniteResourceData
      : filterState.availability === "Finite"
        ? FiniteResourceData
        : combinedData

  return dataByAvailability.filter((item) => {
    const categoryMatches =
      !filterState.selectedCategory ||
      item.category === filterState.selectedCategory

    const timeframeKey = propMapping[filterState.selectedTimeframe as string]
    const timeframeValue = item.total[timeframeKey]
    const timeframeMatches =
      typeof timeframeValue === "number" || timeframeValue === "N/A"

    return categoryMatches && timeframeMatches
  })
}

export const CommonResourceModalFilter: React.FC<
  CommonResourceModalFilterProps
> = ({ className }) => {
  const [filterState, dispatch] = useReducer(CommonResourceFilterReducer, {
    selectedCategory: null,
    selectedTimeframe: "Monthly",
    availability: "Both",
  })

  const filteredData = useMemo(
    () => filterCommonResources(filterState),
    [filterState],
  )

  return (
    <div className={className}>
      {/* ComboBoxes / Filters */}
      <div className="mb-3 flex flex-row flex-wrap gap-3.5">
        <ComboBox
          title="Category"
          options={[
            "Currency",
            "Consumable",
            "Cognitive Awakening",
            "Bulin",
            "Gear Enhance",
            "Augmentation",
            "Skill Book",
            "Retrofit",
          ]}
          onSelect={(value) =>
            dispatch({ type: "SET_CATEGORY", payload: value || null })
          }
        />

        <ComboBox
          title="Timeframe"
          options={["Daily", "Weekly", "Monthly", "Bimonthly", "One-Time"]}
          initialOption="Monthly"
          forceSelect={true}
          onSelect={(value) =>
            dispatch({ type: "SET_TIMEFRAME", payload: value || null })
          }
        />

        {/* Availability Toggle */}
        <ThreeToggleButton
          title="Availability"
          options={[
            { title: "Both", payload: "Both" },
            { title: "Infinite", payload: "Infinite" },
            { title: "Finite", payload: "Finite" },
          ]}
          initialValue={0}
          onSelect={(nextAvailability) =>
            dispatch({
              type: "SET_AVAILABILITY",
              payload: nextAvailability as "Both" | "Infinite" | "Finite",
            })
          }
        />
      </div>

      {/* Filtered Content */}
      <div className="min-h-[16.5rem]">
        <ItemContainer>
          {filteredData.map((item) => {
            const timeframeKey =
              propMapping[filterState.selectedTimeframe as string]
            const timeframeValue = item.total[timeframeKey]

            const descriptionNote = `${timeframeValue}${
              typeof timeframeValue === "number"
                ? timeframeMapping[filterState.selectedTimeframe!]
                : ""
            }`

            return (
              <ResourceModal
                key={item.name}
                item={item}
                trigger={{
                  descriptionNote,
                  largeDescNote: true,
                  hasBorder: true,
                }}
              />
            )
          })}
        </ItemContainer>
      </div>
    </div>
  )
}
