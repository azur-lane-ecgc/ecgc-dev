import type { ResourceProps } from "./types"

const T1SkillBookData: ResourceProps = {
  name: "T1 Skill Book",
  category: "Skill Book",
  rarity: 2,
  image: "materials/unknown_t1_book.png",
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
          name: "Daily Missions",
          wikiLink: "Missions#Daily_Missions",
          quantity: { amount: 2, timeFrame: "daily" },
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
          notes: "all but Lv.95",
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
          quantity: { amount: 1, timeFrame: "cycle" },
          notes: "RNG",
        },
      ],
      checkMark: {
        color: "sand",
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

export default T1SkillBookData
