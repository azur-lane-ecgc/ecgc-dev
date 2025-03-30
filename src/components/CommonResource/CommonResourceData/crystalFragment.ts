import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const CrystalFragmentData: ResourceProps = {
  name: "Crystal Fragment",
  category: "Currency",
  rarity: 4,
  image: "materials/crystal_fragment.png",
  wikiLink: "Shops#META_Shop",
  drops: {
    missions: {
      found: true,
      locations: [
        {
          name: "Weekly Missions",
          wikiLink: "Missions#Weekly_Missions",
          quantity: { amount: 8, timeFrame: "weekly" },
        },
        {
          name: "One-Time Missions",
          wikiLink: "Shops#Crystal_Fragment_Missions",
          quantity: { amount: 240, timeFrame: "one-time" },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
        optimal: true,
      },
    },
    opsi: {
      found: true,
      locations: [
        {
          name: "Exchange Shop",
          wikiLink: "Operation_Siren#Exchange_Shop",
          quantity: { amount: 10, timeFrame: "monthly" },
        },
        {
          name: "Arbiter",
          wikiLink: "Operation_Siren#Arbiter",
          quantity: { amount: 20, timeFrame: "monthly" },
          notes: "Normal & Hard",
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
}

CrystalFragmentData.total = getTotalGuaranteed(CrystalFragmentData)

export default CrystalFragmentData
