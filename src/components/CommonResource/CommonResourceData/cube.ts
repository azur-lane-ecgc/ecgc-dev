import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const WisdomCubeData: ResourceProps = {
  name: "Wisdom Cube",
  category: "Currency",
  rarity: 4,
  image: "materials/wisdom_cube.png",
  wikiLink: "Construction",
  drops: {
    academy: {
      found: true,
      locations: [
        {
          name: "Commissions",
          wikiLink: "Commissions",
          quantity: { amount: "RNG", timeFrame: null },
        },
      ],
      checkMark: {
        color: "sand",
        mark: "check",
        optimal: true,
      },
    },
    missions: {
      found: true,
      locations: [
        {
          name: "Login Rewards",
          wikiLink: "Missions#Login Rewards",
          quantity: { amount: 30, timeFrame: "monthly" },
        },
        {
          name: "Daily Missions",
          wikiLink: "Missions#Daily_Missions",
          quantity: { amount: 3, timeFrame: "daily" },
        },
        {
          name: "Weekly Missions",
          wikiLink: "Missions#Weekly_Missions",
          quantity: { amount: 12, timeFrame: "weekly" },
        },
        {
          name: "Commander Handbook",
          wikiLink: "Commander Handbook",
          quantity: { amount: 148, timeFrame: "one-time" },
          notes: "80 Rookie | 68 Mechanic",
        },
        // {
        //   name: "Commander Handbook",
        //   wikiLink: "Commander Handbook#Rookie Missions",
        //   quantity: { amount: 80, timeFrame: "one-time" },
        //   notes: "Rookie",
        // },
        // {
        //   name: "Commander Handbook",
        //   wikiLink: "Commander Handbook#Mechanic Tutorials",
        //   quantity: { amount: 68, timeFrame: "one-time" },
        //   notes: "Mechanic",
        // },
      ],
      checkMark: {
        color: "green",
        mark: "check",
        optimal: true,
      },
    },
    cruisePass: {
      found: true,
      locations: [
        {
          name: "Cruise Missions (Free)",
          wikiLink: "Cruise_Missions#Rewards",
          quantity: { amount: 20, timeFrame: "bimonthly" },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    generalShop: {
      found: true,
      locations: [
        {
          name: "General Shop",
          wikiLink: "Shops#General Shop",
          quantity: { amount: 1, timeFrame: "cycle" },
          notes: "RNG",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "check",
      },
    },
    meritShop: {
      found: true,
      locations: [
        {
          name: "Merit Shop",
          wikiLink: "Shops#Merit Shop",
          quantity: { amount: 1, timeFrame: "cycle" },
          notes: "RNG",
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
  notes: "Total income is likely way higher due to OpSi RNG.",
}

WisdomCubeData.total = getTotalGuaranteed(WisdomCubeData)

export default WisdomCubeData
