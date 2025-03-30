import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const T4SkillBookData: ResourceProps = {
  name: "T4 Skill Book",
  category: "Skill Book",
  rarity: 5,
  image: "materials/unknown_t4_book.png",
  wikiLink: "https://azurlane.koumakan.jp/wiki/Living_Area#Tactical_Class",
  drops: {
    dailyRaid: {
      found: true,
      locations: [
        {
          name: "Advance Mission",
          wikiLink:
            "https://azurlane.koumakan.jp/wiki/Daily_Raid#Advance_Mission",
          quantity: { amount: "RNG", timeFrame: "daily" },
          notes: "Lv.95",
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
          quantity: { amount: 4, timeFrame: "bimonthly" },
          notes: "Random",
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
          quantity: { amount: 2, timeFrame: "cycle" },
          notes: "70000 Points; Random",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "check",
      },
    },
    opsi: {
      found: true,
      locations: [
        {
          name: "Exchange Shop",
          wikiLink: "Operation_Siren#Exchange_Shop",
          quantity: { amount: 6, timeFrame: "monthly" },
          notes: "2 Each",
        },
      ],
      checkMark: {
        color: "green",
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

T4SkillBookData.total = getTotalGuaranteed(T4SkillBookData)

export default T4SkillBookData
