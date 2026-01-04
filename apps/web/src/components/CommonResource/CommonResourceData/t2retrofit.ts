import type { ResourceProps } from "./types"

const T2RetrofitPrintData: ResourceProps = {
  name: "T2 Retrofit Blueprint",
  category: "Retrofit",
  rarity: 3,
  image: "materials/unknown_t2_bp.png",
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
        color: "red",
        mark: "check",
      },
    },
    missions: {
      found: true,
      locations: [
        {
          name: "Commander Handbook",
          wikiLink: "Commander Handbook#Rookie Missions",
          quantity: { amount: 20, timeFrame: "one-time" },
          notes: "Rookie",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "x",
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
    eventDrop: {
      found: true,
      locations: [
        {
          name: "Event Point Milestone",
          wikiLink: "Events",
          quantity: { amount: 4, timeFrame: "cycle" },
          notes: "2500 Points; 1 Each",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "check",
      },
    },
    guildShop: {
      found: true,
      locations: [
        {
          name: "Guild Shop",
          wikiLink: "Shops#Guild_Shop",
          quantity: { amount: 2, timeFrame: "cycle" },
          notes: "RNG",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "check",
      },
    },
    medalShop: {
      found: true,
      locations: [
        {
          name: "Medal Shop",
          wikiLink: "Shops#Medal_Shop",
          quantity: { amount: 12, timeFrame: "monthly" },
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

export default T2RetrofitPrintData
