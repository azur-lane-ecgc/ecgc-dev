import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const OilData: ResourceProps = {
  name: "Oil",
  plural: "Oil",
  category: "Currency",
  rarity: 1,
  image: "materials/oil.png",
  wikiLink: "Oil_Cost",
  drops: {
    academy: {
      found: true,
      locations: [
        {
          name: "Canteen",
          wikiLink: "Living_Area#Canteen_and_Merchant",
          quantity: { amount: 2304, timeFrame: "daily" },
        },
        {
          name: "Commissions",
          wikiLink: "Commissions",
          quantity: { amount: "RNG", timeFrame: null },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    missions: {
      found: true,
      locations: [
        {
          name: "Login Rewards",
          wikiLink: "Missions#Login Rewards",
          quantity: { amount: 1500, timeFrame: "monthly" },
        },
        {
          name: "Daily Missions",
          wikiLink: "Missions#Daily_Missions",
          quantity: { amount: 520, timeFrame: "daily" },
        },
        {
          name: "Weekly Missions",
          wikiLink: "Missions#Weekly_Missions",
          quantity: { amount: 2900, timeFrame: "weekly" },
        },
        {
          name: "Weekly Free Supplies Pack",
          wikiLink: "Akashi's Shop#Packs",
          quantity: { amount: 4000, timeFrame: "weekly" },
        },
        {
          name: "Commander Handbook",
          wikiLink: "Commander Handbook#Rookie Missions",
          quantity: { amount: 9300, timeFrame: "one-time" },
          notes: "Rookie",
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
        optimal: true,
      },
    },
    eventShop: {
      found: true,
      locations: [
        {
          name: "Limited Event Shop",
          wikiLink: "Shops#Event_Shop",
          quantity: { amount: 5000, timeFrame: "cycle" },
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

OilData.total = getTotalGuaranteed(OilData)

export default OilData
