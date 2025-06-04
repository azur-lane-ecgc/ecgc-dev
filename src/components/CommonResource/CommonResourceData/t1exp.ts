import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const T1EXPDataPackData: ResourceProps = {
  name: "T1 EXP Data Pack",
  category: "Consumable",
  rarity: 2,
  image: "materials/t1_exp_pack.png",
  wikiLink: "Experience#Ship_XP",
  drops: {
    academy: {
      found: true,
      locations: [
        {
          name: "Lecture Hall",
          wikiLink: "Living_Area#Lecture_Hall",
          quantity: { amount: 52, timeFrame: "daily" },
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
          name: "Weekly Free Supplies Pack",
          wikiLink: "Akashi's Shop#Packs",
          quantity: { amount: 20, timeFrame: "weekly" },
        },
        {
          name: "Missions - Side",
          wikiLink: "Beginner_Rewards#Side_Quests",
          quantity: { amount: 900, timeFrame: "one-time" },
          notes: "Total Rewards",
        },
        {
          name: "Commander Handbook",
          wikiLink: "Commander Handbook#Rookie Missions",
          quantity: { amount: 600, timeFrame: "one-time" },
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
          name: "Tactical Training",
          wikiLink: "Daily_Raid#Tactical_Training",
          quantity: { amount: 6, timeFrame: "daily" },
          notes: "Lv.100",
        },
        {
          name: "Supply Line Disruption",
          wikiLink: "Daily_Raid#Supply_Line_Disruption",
          quantity: { amount: 8, timeFrame: "weekly" },
          notes: "Lv.95",
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
          name: "Cruise Missions (Free)",
          wikiLink: "Cruise_Missions#Rewards",
          quantity: { amount: 120, timeFrame: "bimonthly" },
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

T1EXPDataPackData.total = getTotalGuaranteed(T1EXPDataPackData)

export default T1EXPDataPackData
