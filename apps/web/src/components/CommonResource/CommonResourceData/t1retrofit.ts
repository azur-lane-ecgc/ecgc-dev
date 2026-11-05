import type { ResourceProps } from "./types"

const T1RetrofitPrintData: ResourceProps = {
  name: "T1 Retrofit Blueprint",
  category: "Retrofit",
  rarity: 2,
  image: "materials/unknown_t1_bp.png",
  wikiLink: "Dockyard#Retrofit",
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
      },
    },
    missions: {
      found: true,
      locations: [
        {
          name: "Daily Missions",
          wikiLink: "Missions#Daily_Missions",
          quantity: { amount: 2, timeFrame: "daily" },
        },
        {
          name: "Commander Handbook",
          wikiLink: "Commander Handbook#Rookie Missions",
          quantity: { amount: 20, timeFrame: "one-time" },
          notes: "Rookie",
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    hardModeDrop: {
      found: true,
      locations: [
        {
          name: "Campaign Hard Mode",
          wikiLink: "Combat#Hard_Mode",
          quantity: { amount: "RNG", timeFrame: null },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
        optimal: true,
      },
    },
    medalShop: {
      found: true,
      locations: [
        {
          name: "Medal Shop",
          wikiLink: "Shops#Medal_Shop",
          quantity: { amount: 24, timeFrame: "monthly" },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
  },
  total: {
    bimonthly: "N/A",
    monthly: "N/A",
    weekly: "N/A",
    daily: "N/A",
    oneTime: "N/A",
  },
  notes: "<b>Not a concern.</b>",
}

export default T1RetrofitPrintData
