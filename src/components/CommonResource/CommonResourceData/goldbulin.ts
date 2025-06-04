import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const PrototypeBulinData: ResourceProps = {
  name: "Prototype Bulin MKII",
  plural: "Prototype Bulin MKII",
  category: "Bulin",
  rarity: 4,
  image: "materials/gold_bulin.png",
  wikiLink: "Dockyard#Limit_Break",
  drops: {
    missions: {
      found: true,
      locations: [
        {
          name: "Login Rewards",
          wikiLink: "Missions#Login Rewards",
          quantity: { amount: 1, timeFrame: "monthly" },
        },
        {
          name: "Weekly Missions",
          wikiLink: "Missions#Weekly_Missions",
          quantity: { amount: 1, timeFrame: "weekly" },
        },
        {
          name: "Level-Up Rewards",
          wikiLink: "Beginner_Rewards#Level-Up",
          quantity: { amount: 2, timeFrame: "one-time" },
          notes: "Lv.40, Lv.50",
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
      },
    },
    campaignDrop: {
      found: true,
      locations: [
        {
          name: "X-4 Stages",
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
    meritShop: {
      found: true,
      locations: [
        {
          name: "Merit Shop",
          wikiLink: "Shops#Merit_Shop",
          quantity: { amount: 2, timeFrame: "monthly" },
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
          quantity: { amount: 2, timeFrame: "monthly" },
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
  notes: `You can get up to 4 from <a
        href="https://azurlane.koumakan.jp/wiki/Merit Shop"
        rel="noopener noreferrer"
        target="_blank"
      >
        Merit Shop
      </a> depending on your performance.`,
}

PrototypeBulinData.total = getTotalGuaranteed(PrototypeBulinData)

export default PrototypeBulinData
