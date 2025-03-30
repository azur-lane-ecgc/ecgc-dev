import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const T1AugmentConversionData: ResourceProps = {
  name: "T1 Augment Conversion",
  category: "Augmentation",
  rarity: 3,
  image: "materials/t1_augment_conversion.png",
  wikiLink: "Augmentation#Convertion",
  drops: {
    dailyRaid: {
      found: true,
      locations: [
        {
          name: "Module Development",
          wikiLink: "Daily_Raid#Module Development",
          quantity: { amount: 4, timeFrame: "weekly" },
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
          quantity: { amount: 10, timeFrame: "cycle" },
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

T1AugmentConversionData.total = getTotalGuaranteed(T1AugmentConversionData)

export default T1AugmentConversionData
