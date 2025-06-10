import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const PrototypeCoreData: ResourceProps = {
  name: "Prototype Core",
  plural: "Prototype Core",
  category: "Currency",
  rarity: 4,
  image: "materials/protocore.png",
  wikiLink: "Shops#Prototype_Shop",
  drops: {
    academy: {
      found: true,
      locations: [
        {
          name: "Guild Contributions",
          wikiLink: "Guild#Logistics",
          quantity: { amount: "RNG", timeFrame: null },
        },
      ],
      checkMark: {
        color: "red",
        mark: "check",
      },
    },
    missions: {
      found: true,
      locations: [
        {
          name: "Commander Handbook",
          wikiLink: "Commander Handbook#Development Missions",
          quantity: { amount: 5600, timeFrame: "one-time" },
          notes: "Dev.",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "x",
      },
    },
    cruisePass: {
      found: true,
      locations: [
        {
          name: "Cruise Missions (Free)",
          wikiLink: "Cruise_Missions#Rewards",
          quantity: { amount: 200, timeFrame: "bimonthly" },
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
  notes: `Read 
      <a
        href="/research#protocore_income"
        rel="noopener noreferrer"
        target="_blank"
      >
        Protocore Income
      </a> 
      for more information.`,
}

PrototypeCoreData.total = getTotalGuaranteed(PrototypeCoreData)

export default PrototypeCoreData
