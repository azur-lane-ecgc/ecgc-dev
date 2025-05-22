import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const SpecializedBulinData: ResourceProps = {
  name: "Specialized Bulin Custom MKIII",
  plural: "Specialized Bulin Custom MKIII",
  category: "Bulin",
  rarity: 5,
  image: "materials/rainbow_bulin.png",
  wikiLink: "Dockyard#Limit_Break",
  drops: {
    missions: {
      found: true,
      locations: [
        {
          name: "Bulin Support Plan",
          wikiLink: "Beginner_Rewards#Bulin_Support_Plan",
          quantity: { amount: 1.5, timeFrame: "one-time" },
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
          quantity: { amount: 1, timeFrame: "bimonthly" },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    medalShop: {
      found: true,
      locations: [
        {
          name: "Medal Shop",
          wikiLink: "Shops#Prototype_Shop",
          quantity: { amount: 0.75, timeFrame: "monthly" },
          notes: "Specialized Core",
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    prototypeShop: {
      found: true,
      locations: [
        {
          name: "Prototype Shop",
          wikiLink: "Shops#Prototype_Shop",
          quantity: { amount: 1.25, timeFrame: "monthly" },
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
    daily: 0,
    weekly: 0,
    monthly: 0,
    bimonthly: 0,
  },
  notes: `Assuming <b>6</b> new UR Ships per Year, you need <b>24</b> bulins to MLB all of them.<br><a
        href="https://azurlane.koumakan.jp/wiki/Prototype_Shop"
        rel="noopener noreferrer"
        target="_blank"
      >
        Prototype Shop
      </a> has no purchase limit.`,
}

SpecializedBulinData.total = getTotalGuaranteed(SpecializedBulinData)

export default SpecializedBulinData
