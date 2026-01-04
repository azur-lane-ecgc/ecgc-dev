import type { ResourceProps } from "./types"

const T2PlateData: ResourceProps = {
  name: "T2 Plate",
  category: "Gear Enhance",
  rarity: 2,
  image: "materials/unknown_t2_plate.png",
  wikiLink: "Equipment#Upgrade_(Enhance)",
  drops: {
    academy: {
      found: true,
      locations: [
        {
          name: "Commissions",
          wikiLink: "https://azurlane.koumakan.jp/wiki/Commissions",
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
          quantity: { amount: 5, timeFrame: "daily" },
        },
        {
          name: "Commander Handbook",
          wikiLink: "Commander Handbook#Rookie Missions",
          quantity: { amount: 50, timeFrame: "one-time" },
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
          name: "Escort Mission",
          wikiLink:
            "https://azurlane.koumakan.jp/wiki/Daily_Raid#Escort_Mission",
          quantity: { amount: "RNG", timeFrame: "daily" },
          notes: "Lv.25+",
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
          name: "Chapters 3+",
          wikiLink: "https://azurlane.koumakan.jp/wiki/Campaign",
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
          name: "All Event Chapters",
          wikiLink: "https://azurlane.koumakan.jp/wiki/Events",
          quantity: { amount: "RNG", timeFrame: null },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
        optimal: true,
      },
    },
    generalShop: {
      found: true,
      locations: [
        {
          name: "General Shop",
          wikiLink: "https://azurlane.koumakan.jp/wiki/Shops#General_Shop",
          quantity: { amount: 5, timeFrame: "cycle" },
          notes: "RNG",
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
          wikiLink: "https://azurlane.koumakan.jp/wiki/Shops#Guild_Shop",
          quantity: { amount: 5, timeFrame: "cycle" },
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
          wikiLink: "https://azurlane.koumakan.jp/wiki/Shops#Medal_Shop",
          quantity: { amount: 300, timeFrame: "monthly" },
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

export default T2PlateData
