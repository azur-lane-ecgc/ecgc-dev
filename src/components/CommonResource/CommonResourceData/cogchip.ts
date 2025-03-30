import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const CognitiveChipData: ResourceProps = {
  name: "Cognitive Chip",
  category: "Cognitive Awakening",
  rarity: 4,
  image: "materials/cognitive_chip.png",
  wikiLink: "Dockyard#Cognitive_Awakening",
  drops: {
    academy: {
      found: true,
      locations: [
        {
          name: "Commissions",
          wikiLink: "Commissions",
          quantity: { amount: "RNG", timeFrame: "daily" },
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
          name: "Missions - Side",
          wikiLink: "Beginner_Rewards#Side_Quests",
          quantity: { amount: 4200, timeFrame: "one-time" },
          notes: "Total Rewards",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "x",
      },
    },
    dailyRaid: {
      found: true,
      locations: [
        {
          name: "Tactical Training",
          wikiLink: "Daily_Raid#Tactical_Training",
          quantity: { amount: 210, timeFrame: "daily" },
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
          quantity: { amount: 400, timeFrame: "bimonthly" },
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
          name: "Chapter 12+",
          wikiLink: "Campaign",
          quantity: { amount: "RNG", timeFrame: null },
          notes: "Clearing Rewards",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "check",
      },
    },
    eventDrop: {
      found: true,
      locations: [
        {
          name: "Event Point Milestone",
          wikiLink: "Events",
          quantity: { amount: 1900, timeFrame: "cycle" },
          notes: "12000 Points",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "check",
      },
    },
    coreDataShop: {
      found: true,
      locations: [
        {
          name: "Core Data (Mo.)",
          wikiLink: "Shops#Core_Shop_(Mo.)",
          quantity: { amount: 1000, timeFrame: "monthly" },
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
        optimal: true,
      },
    },
    guildShop: {
      found: true,
      locations: [
        {
          name: "Guild Shop",
          wikiLink: "Shops#Guild_Shop",
          quantity: { amount: 200, timeFrame: "cycle" },
          notes: "RNG",
        },
      ],
      checkMark: {
        color: "sand",
        mark: "check",
      },
    },
    eventShop: {
      found: true,
      locations: [
        {
          name: "Limited Event Shop",
          wikiLink: "Shops#Event_Shop",
          quantity: { amount: 1000, timeFrame: "cycle" },
        },
      ],
      checkMark: {
        color: "sand",
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
  notes: "Cognitive Chip commissions unlock once any ship reaches Lv.100.",
}

CognitiveChipData.total = getTotalGuaranteed(CognitiveChipData)

export default CognitiveChipData
