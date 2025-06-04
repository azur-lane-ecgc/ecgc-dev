import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const CoinData: ResourceProps = {
  name: "Coin",
  category: "Currency",
  rarity: 1,
  image: "materials/coin.png",
  wikiLink: "Shops",
  drops: {
    academy: {
      found: true,
      locations: [
        {
          name: "Merchant",
          wikiLink: "Living_Area#Canteen_and_Merchant",
          quantity: { amount: 7776, timeFrame: "daily" },
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
          quantity: { amount: 4800, timeFrame: "monthly" },
        },
        {
          name: "Daily Missions",
          wikiLink: "Missions#Daily_Missions",
          quantity: { amount: 2300, timeFrame: "daily" },
        },
        {
          name: "Weekly Missions",
          wikiLink: "Missions#Weekly_Missions",
          quantity: { amount: 14000, timeFrame: "weekly" },
        },
        {
          name: "Commander Handbook",
          wikiLink: "Commander Handbook#Rookie Missions",
          quantity: { amount: 14000, timeFrame: "one-time" },
          notes: "Rookie",
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    dailyRaid: {
      found: true,
      locations: [
        {
          name: "All Daily Raids",
          wikiLink: "Daily_Raid",
          quantity: { amount: "RNG", timeFrame: "daily" },
        },
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
          name: "Cruise Missions",
          wikiLink: "Cruise_Missions#Rewards",
          quantity: { amount: 24000, timeFrame: "bimonthly" },
          notes: "Free",
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
          name: "Campaign Chapters 9+",
          wikiLink: "Campaign",
          quantity: { amount: "RNG", timeFrame: null },
          notes: "Clearing Rewards",
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
        optimal: true,
      },
    },
    eventDrop: {
      found: true,
      locations: [
        {
          name: "Event Chapter D",
          wikiLink: "Events",
          quantity: { amount: "RNG", timeFrame: null },
          notes: "Clearing Rewards",
        },
        {
          name: "Event Point Milestone",
          wikiLink: "Events",
          quantity: { amount: 1e3, timeFrame: "cycle" },
          notes: "3000 Points",
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
          quantity: { amount: 10000, timeFrame: "monthly" },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    eventShop: {
      found: true,
      locations: [
        {
          name: "Limited Event Shop",
          wikiLink: "Shops#Event_Shop",
          quantity: { amount: 10000, timeFrame: "cycle" },
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

CoinData.total = getTotalGuaranteed(CoinData)

export default CoinData
