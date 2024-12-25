import { getTotalGuaranteed } from "./getTotal"
import type { ResourceProps } from "./types"

const CoinData: ResourceProps = {
  name: "Coin",
  rarity: 1,
  image: "images/materials/coin.png",
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
    },
    missions: {
      found: true,
      locations: [
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
          name: "Monthly Login",
          wikiLink: "",
          quantity: { amount: 4800, timeFrame: "monthly" },
        },
      ],
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
    },
    cruisePass: {
      found: true,
      locations: [
        {
          name: "Cruise Missions (Free)",
          wikiLink: "Cruise_Missions#Rewards",
          quantity: { amount: 24000, timeFrame: "monthly" },
        },
      ],
    },
    mapDrop: {
      found: true,
      locations: [
        {
          name: "Campaign Chapters 9+",
          wikiLink: "Campaign",
          quantity: { amount: "RNG", timeFrame: "one-time" },
        },
        {
          name: "Event Chapter D",
          wikiLink: "Events",
          quantity: { amount: "RNG", timeFrame: "one-time" },
        },
      ],
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
    },
    shops: {
      found: true,
      locations: [
        {
          name: "Limited Event Shop",
          wikiLink: "Shops#Event_Shop",
          quantity: { amount: "RNG", timeFrame: "monthly" },
        },
      ],
    },
  },
}

CoinData.total = getTotalGuaranteed(CoinData)

export default CoinData
