import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const GemData: ResourceProps = {
  name: "Gem",
  category: "Currency",
  rarity: 3,
  image: "materials/gem.png",
  wikiLink: "Akashi's_Shop#Gems",
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
        color: "red",
        mark: "check",
      },
    },
    missions: {
      found: true,
      locations: [
        {
          name: "Beginner Rewards",
          wikiLink: "Beginner_Rewards#8-Day_Login_Rewards",
          quantity: { amount: 150, timeFrame: "one-time" },
          notes: "8-Day Login",
        },
        {
          name: "Memento",
          wikiLink: "List_of_Collections",
          quantity: { amount: 800, timeFrame: "one-time" },
          notes: "Collections",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "x",
      },
    },
    campaignDrop: {
      found: true,
      locations: [
        {
          name: "Campaign Stages (X-1, X-2, X-3)",
          wikiLink: "Campaign",
          quantity: { amount: 150, timeFrame: "chapter" },
          notes: "3-Star Reward",
        },
        {
          name: "Campaign Stages (X-4)",
          wikiLink: "Campaign",
          quantity: { amount: 100, timeFrame: "chapter" },
          notes: "3-Star Reward",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "x",
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

GemData.total = getTotalGuaranteed(GemData)

export default GemData
