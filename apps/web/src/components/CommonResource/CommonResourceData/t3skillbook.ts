import type { ResourceProps } from "./types"

const T3SkillBookData: ResourceProps = {
  name: "T3 Skill Book",
  category: "Skill Book",
  rarity: 4,
  image: "materials/unknown_t3_book.png",
  wikiLink: "https://azurlane.koumakan.jp/wiki/Living_Area#Tactical_Class",
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
          name: "Weekly Missions",
          wikiLink: "Missions#Weekly_Missions",
          quantity: { amount: 1, timeFrame: "weekly" },
        },
        {
          name: "Commander Handbook",
          wikiLink: "Commander Handbook#Rookie Missions",
          quantity: { amount: 10, timeFrame: "one-time" },
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
          name: "Advance Mission",
          wikiLink:
            "https://azurlane.koumakan.jp/wiki/Daily_Raid#Advance_Mission",
          quantity: { amount: "RNG", timeFrame: "daily" },
          notes: "Lv.50+",
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
          name: "Cruise Missions (Free)",
          wikiLink: "Cruise_Missions#Rewards",
          quantity: { amount: 15, timeFrame: "bimonthly" },
          notes: "5 Each",
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    eventDrop: {
      found: true,
      locations: [
        {
          name: "Event Point Milestone",
          wikiLink: "Events",
          quantity: { amount: 8, timeFrame: "cycle" },
          notes: "1100 Points; 2 Each + 2 Random",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "check",
      },
    },
    generalShop: {
      found: true,
      locations: [
        {
          name: "General Shop",
          wikiLink: "https://azurlane.koumakan.jp/wiki/Shops#General_Shop",
          quantity: { amount: 1, timeFrame: "cycle" },
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
          quantity: { amount: 3, timeFrame: "cycle" },
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
          quantity: { amount: 6, timeFrame: "monthly" },
          notes: "2 Each",
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
    bimonthly: "N/A",
    monthly: "N/A",
    weekly: "N/A",
    daily: "N/A",
    oneTime: "N/A",
  },
  notes: "<b>Offensive Skill Books might be a concern, rest aren't.</b>",
}

export default T3SkillBookData
