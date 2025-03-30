import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const HEPData: ResourceProps = {
  name: "High-Efficiency Combat Logistics Plan",
  category: "Consumable",
  rarity: 3,
  image: "materials/high_efficiency_plan.png",
  wikiLink: "Combat#High-Efficiency_Combat_Logistics_Plan",
  drops: {
    missions: {
      found: true,
      locations: [
        {
          name: "Weekly Free Supplies Pack",
          wikiLink: "Akashi%27s_Shop#Packs",
          quantity: { amount: 10, timeFrame: "weekly" },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    opsi: {
      found: true,
      locations: [
        {
          name: "Exchange Shop",
          wikiLink: "Operation_Siren#Exchange_Shop",
          quantity: { amount: 30, timeFrame: "monthly" },
        },
      ],
      checkMark: {
        color: "green",
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
  notes: "Usually given via Mail after Server Maintenance.",
}

HEPData.total = getTotalGuaranteed(HEPData)

export default HEPData
