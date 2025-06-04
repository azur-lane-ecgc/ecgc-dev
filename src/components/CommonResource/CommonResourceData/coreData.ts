import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const CoreData: ResourceProps = {
  name: "Core Data",
  plural: "Core Data",
  category: "Currency",
  rarity: 2,
  image: "materials/core_data.png",
  wikiLink: "Shops#Core_Exchange",
  drops: {
    missions: {
      found: true,
      locations: [
        {
          name: "Daily Missions",
          wikiLink: "Missions#Daily_Missions",
          quantity: { amount: 5, timeFrame: "daily" },
        },
        {
          name: "Weekly Missions",
          wikiLink: "Missions#Weekly_Missions",
          quantity: { amount: 15, timeFrame: "weekly" },
        },
        {
          name: "Commander Handbook",
          wikiLink: "Commander Handbook#Rookie Missions",
          quantity: { amount: 1600, timeFrame: "one-time" },
          notes: "Rookie",
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    hardModeDrop: {
      found: true,
      locations: [
        {
          name: "Campaign Hard Mode",
          wikiLink: "Combat#Hard_Mode",
          quantity: { amount: 90, timeFrame: "daily" },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
        optimal: true,
      },
    },
  },
  total: {
    bimonthly: 0,
    monthly: 0,
    weekly: 0,
    daily: 0,
  },
  notes: `
      Check 
      <a
        href="https://azurlane.koumakan.jp/wiki/Combat#Hard_Mode"
        rel="noopener noreferrer"
        target="_blank"
      >
        this Wiki page
      </a> 
      for lower Chapter drop information.
  `,
}

CoreData.total = getTotalGuaranteed(CoreData)

export default CoreData
