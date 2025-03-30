import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const CognitiveArrayData: ResourceProps = {
  name: "Cognitive Array",
  category: "Cognitive Awakening",
  rarity: 4,
  image: "materials/cognitive_array.png",
  wikiLink: "Dockyard#Cognitive_Awakening",
  drops: {
    missions: {
      found: true,
      locations: [
        {
          name: "Missions - Side",
          wikiLink: "Beginner_Rewards#Side_Quests",
          quantity: { amount: 1150, timeFrame: "one-time" },
          notes: "Total Rewards",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "x",
      },
    },
    dailyRaid: {
      found: true,
      locations: [
        {
          name: "Tactical Training",
          wikiLink: "Daily_Raid#Tactical_Training",
          quantity: { amount: 9, timeFrame: "daily" },
          notes: "Lv.100",
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    cruisePass: {
      found: true,
      locations: [
        {
          name: "Cruise Missions (Free)",
          wikiLink: "Cruise_Missions#Rewards",
          quantity: { amount: 150, timeFrame: "bimonthly" },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    coreDataShop: {
      found: true,
      locations: [
        {
          name: "Core Data (Mo.)",
          wikiLink: "Shops#Core_Shop_(Mo.)",
          quantity: { amount: 50, timeFrame: "monthly" },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    eventShop: {
      found: true,
      locations: [
        {
          name: "Limited Event Shop",
          wikiLink: "Shops#Event_Shop",
          quantity: { amount: 50, timeFrame: "cycle" },
        },
      ],
      checkMark: {
        color: "sand",
        mark: "check",
      },
    },
  },
  total: {
    daily: 0,
    weekly: 0,
    monthly: 0,
    bimonthly: 0,
  },
}

CognitiveArrayData.total = getTotalGuaranteed(CognitiveArrayData)

export default CognitiveArrayData
