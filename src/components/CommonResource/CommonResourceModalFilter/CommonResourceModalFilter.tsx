import { useEffect, useReducer, useState } from "react"

import { ComboBox } from "@components/_common/ComboBox"
import { ItemContainer } from "@components/_common/ItemCell"
import { ItemCellSkeleton } from "@components/_common/Skeleton"
import { ThreeToggleButton } from "@components/_common/ToggleButton"

import { CommonResourceFilterReducer } from "@store/CommonResource"

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

export const CommonResourceModalFilter: React.FC<
  CommonResourceModalFilterProps
> = ({ className }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [filteredData, setFilteredData] = useState<ResourceProps[]>([])
  const [filterState, dispatch] = useReducer(CommonResourceFilterReducer, {
    selectedCategory: null,
    selectedTimeframe: "Monthly",
    availability: "Both",
  })

  useEffect(() => {
    setLoading(true)

    const filterData = () => {
      let data: ResourceProps[] = []

      if (filterState.availability === "Infinite") {
        data = InfiniteResourceData
      } else if (filterState.availability === "Finite") {
        data = FiniteResourceData
      } else {
        data = combinedData
      }

      return data.filter((item) => {
        const categoryMatches =
          !filterState.selectedCategory ||
          item.category === filterState.selectedCategory

        const timeframeKey =
          propMapping[filterState.selectedTimeframe as string]
        const timeframeValue = item.total[timeframeKey]

        const timeframeMatches =
          typeof timeframeValue === "number" || timeframeValue === "N/A"

        return categoryMatches && timeframeMatches
      })
    }

    const filtered = filterData()
    setFilteredData(filtered)

    setLoading(false)
  }, [filterState])

  // runs if component is loaded
  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <>
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
          {loading && (
            <ItemContainer>
              {Array.from({ length: 20 }).map((_, index) => (
                <ItemCellSkeleton key={index} />
              ))}
            </ItemContainer>
          )}
          {!loading && (
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
          )}
        </div>
      </div>
    </>
  )
}
