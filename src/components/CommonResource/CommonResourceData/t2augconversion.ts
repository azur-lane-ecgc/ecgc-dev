import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const T2AugmentConversionData: ResourceProps = {
  name: "T2 Augment Conversion",
  category: "Augmentation",
  rarity: 4,
  image: "materials/t2_augment_conversion.png",
  wikiLink: "Augmentation#Convertion",
  drops: {
    dailyRaid: {
      found: true,
      locations: [
        {
          name: "Module Development",
          wikiLink: "Daily_Raid#Module Development",
          quantity: { amount: 2, timeFrame: "weekly" },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    eventDrop: {
      found: true,
      locations: [
        {
          name: "Event Point Milestone",
          wikiLink: "Events",
          quantity: { amount: 5, timeFrame: "cycle" },
          notes: "17500 Points",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "check",
      },
    },
    eventShop: {
      found: true,
      locations: [
        {
          name: "Limited Event Shop",
          wikiLink: "Shops#Event_Shop",
          quantity: { amount: 2, timeFrame: "cycle" },
        },
      ],
      checkMark: {
        color: "sand",
        mark: "check",
      },
    },
  },
  total: {
    bimonthly: 0,
    monthly: 0,
    weekly: 0,
    daily: 0,
  },
}

T2AugmentConversionData.total = getTotalGuaranteed(T2AugmentConversionData)

export default T2AugmentConversionData
