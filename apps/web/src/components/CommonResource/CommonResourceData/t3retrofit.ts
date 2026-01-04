import type { ResourceProps } from "./types"

const T3RetrofitPrintData: ResourceProps = {
  name: "T3 Retrofit Blueprint",
  category: "Retrofit",
  rarity: 4,
  image: "materials/unknown_t3_bp.png",
  wikiLink: "Dockyard#Retrofit",
  drops: {
    missions: {
      found: true,
      locations: [
        {
          name: "Commander Handbook",
          wikiLink: "Commander Handbook#Rookie Missions",
          quantity: { amount: 10, timeFrame: "one-time" },
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
          quantity: { amount: 9, timeFrame: "cycle" },
          notes: "13000 Points; 1 Each + 5 Random",
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
          quantity: { amount: 4, timeFrame: "monthly" },
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
  notes: "<b>Cruiser Prints might be a concern, rest aren't.</b>",
}

export default T3RetrofitPrintData
