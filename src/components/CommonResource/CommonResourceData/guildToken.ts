import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const GuildTokenData: ResourceProps = {
  name: "Guild Token",
  category: "Currency",
  rarity: 2,
  image: "materials/guild_token.png",
  wikiLink: "Guild",
  drops: {
    academy: {
      found: true,
      locations: [
        {
          name: "Guild Missions",
          wikiLink: "Guild#Logistics",
          quantity: { amount: 400, timeFrame: "weekly" },
        },
        {
          name: "Guild Operations",
          wikiLink: "Guild#Operations",
          quantity: { amount: 1000, timeFrame: "weekly" },
        },
        {
          name: "Guild Contributions",
          wikiLink: "Guild#Logistics",
          quantity: { amount: 255, timeFrame: "daily" },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
        optimal: true,
      },
    },
    missions: {
      found: true,
      locations: [
        {
          name: "Daily Missions",
          wikiLink: "Missions#Daily_Missions",
          quantity: { amount: 50, timeFrame: "daily" },
        },
        {
          name: "Weekly Missions",
          wikiLink: "Missions#Weekly_Missions",
          quantity: { amount: 200, timeFrame: "weekly" },
        },
        {
          name: "Commander Handbook",
          wikiLink: "Commander Handbook#Rookie Missions",
          quantity: { amount: 500, timeFrame: "one-time" },
          notes: "Rookie",
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    cruisePass: {
      found: true,
      locations: [
        {
          name: "Cruise Missions",
          wikiLink: "Cruise_Missions#Rewards",
          quantity: { amount: 400, timeFrame: "bimonthly" },
          notes: "Free",
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
}

GuildTokenData.total = getTotalGuaranteed(GuildTokenData)

export default GuildTokenData
