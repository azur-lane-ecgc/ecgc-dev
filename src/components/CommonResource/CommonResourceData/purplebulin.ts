import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const UniversalBulinData: ResourceProps = {
  name: "Universal Bulin",
  plural: "Universal Bulin",
  category: "Bulin",
  rarity: 3,
  image: "materials/purple_bulin.png",
  wikiLink: "Dockyard#Limit_Break",
  drops: {
    missions: {
      found: true,
      locations: [
        {
          name: "Login Rewards",
          wikiLink: "Missions#Login Rewards",
          quantity: { amount: 3, timeFrame: "monthly" },
        },
        {
          name: "Weekly Missions",
          wikiLink: "Missions#Weekly_Missions",
          quantity: { amount: 3, timeFrame: "weekly" },
        },
        {
          name: "Level-Up Rewards",
          wikiLink: "Beginner_Rewards#Level-Up",
          quantity: { amount: 2, timeFrame: "one-time" },
          notes: "Lv.20, Lv.30",
        },
        {
          name: "Commander Handbook",
          wikiLink: "Commander Handbook#Rookie Missions",
          quantity: { amount: 4, timeFrame: "one-time" },
          notes: "Rookie",
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
        optimal: true,
      },
    },
    campaignDrop: {
      found: true,
      locations: [
        {
          name: "X-2 Stages",
          wikiLink: "Campaign",
          quantity: { amount: 1, timeFrame: "chapter" },
          notes: "3-Star Reward",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "x",
      },
    },
    opsi: {
      found: false,
      checkMark: {
        color: "red",
        mark: "x",
      },
    },
    eventShop: {
      found: false,
      checkMark: {
        color: "red",
        mark: "x",
      },
    },
    meritShop: {
      found: true,
      locations: [
        {
          name: "Merit Shop",
          wikiLink: "Shops#Merit_Shop",
          quantity: { amount: 1, timeFrame: "cycle" },
          notes: "Daily",
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
          wikiLink: "Shops#Medal_Shop",
          quantity: { amount: 10, timeFrame: "monthly" },
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
  notes: "Only buy as much as you need.",
}

UniversalBulinData.total = getTotalGuaranteed(UniversalBulinData)

export default UniversalBulinData
