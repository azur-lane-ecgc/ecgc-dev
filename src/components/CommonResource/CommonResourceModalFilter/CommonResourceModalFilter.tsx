import { useState } from "react"

import { ComboBox } from "@components/_common/ComboBox"
import { ItemContainer } from "@components/_common/ItemCell"

import { FiniteResourceData, InfiniteResourceData } from "../CommonResourceData"
import { ResourceModal } from "../ResourceModal"
import type { ResourceProps } from "../CommonResourceData/types"

const combinedData: ResourceProps[] =
  InfiniteResourceData.concat(FiniteResourceData)

interface CommonResourceModalFilterProps {
  className?: string
}

export const CommonResourceModalFilter: React.FC<
  CommonResourceModalFilterProps
> = ({ className }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState<string | null>(
    "Monthly",
  )
  const [availability, setAvailability] = useState<
    "Both" | "Infinite" | "Finite"
  >("Both")

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

  // Filtering Data
  let filteredData = [] as ResourceProps[]

  if (availability === "Infinite") {
    filteredData = InfiniteResourceData
  } else if (availability === "Finite") {
    filteredData = FiniteResourceData
  } else {
    filteredData = combinedData
  }

  filteredData = filteredData.filter((item) => {
    const categoryMatches =
      !selectedCategory || item.category === selectedCategory

    const timeframeKey = propMapping[selectedTimeframe as string]
    const timeframeValue = item.total[timeframeKey]

    const timeframeMatches =
      typeof timeframeValue === "number" || timeframeValue === "N/A"

    return categoryMatches && timeframeMatches
  })

  return (
    <div className={className}>
      <div className="flex flex-row flex-wrap gap-4">
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
          onSelect={setSelectedCategory}
        />

        <ComboBox
          title="Timeframe"
          options={["Daily", "Weekly", "Monthly", "Bimonthly", "One-Time"]}
          initialOption="Monthly"
          forceSelect={true}
          onSelect={setSelectedTimeframe}
        />

        {/* Availability Toggle */}
        <div>
          <p className="mb-1 font-bold text-fuchsia-400">Availability</p>
          <button
            id={`availability_input`}
            className={`px-1 py-2 w-32 max-w-32 bg-gray-950 hover:bg-gray-800 border border-green-800 rounded-xl shadow-lg`}
            onClick={() => {
              if (availability === "Both") setAvailability("Infinite")
              else if (availability === "Infinite") setAvailability("Finite")
              else setAvailability("Both")
            }}
          >
            <div className="flex justify-evenly">
              <div className="flex-1 text-center align-middle justify-center pl-[8.75px] pr-2 w-full mb-0 font-bold text-orange-400">
                {availability}
              </div>
              <div className="flex flex-col justify-center m-0 space-y-0 space-x-0 *:!leading-[0.35]">
                {availability === "Both" ? (
                  <span className="text-cyan-400 text-base">
                    {"\u2713"} {"\u2717"}
                  </span>
                ) : availability === "Finite" ? (
                  <span className="text-cyan-400">{"\u2717"}</span>
                ) : (
                  <span className="text-cyan-400">{"\u2713"}</span>
                )}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Filtered Content */}
      <div className="min-h-[16.5rem]">
        <ItemContainer>
          {filteredData.map((item) => {
            const timeframeKey = propMapping[selectedTimeframe as string]
            const timeframeValue = item.total[timeframeKey]

            const descriptionNote = `${timeframeValue}${typeof timeframeValue === "number" ? timeframeMapping[selectedTimeframe!] : ""}`

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
