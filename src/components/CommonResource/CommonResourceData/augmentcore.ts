import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const AugmentModuleCoreData: ResourceProps = {
  name: "Augment Module Core",
  category: "Augmentation",
  rarity: 4,
  image: "materials/augment_module_core.png",
  wikiLink: "Augmentation#Crafting_and_Enhancing",
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
    dailyRaid: {
      found: true,
      locations: [
        {
          name: "Module Development",
          wikiLink: "Daily_Raid#Module Development",
          quantity: { amount: 2, timeFrame: "weekly" },
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
          name: "Cruise Missions",
          wikiLink: "Cruise_Missions#Rewards",
          quantity: { amount: 5, timeFrame: "bimonthly" },
          notes: "Free",
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
          quantity: { amount: 5, timeFrame: "cycle" },
          notes: "25000 Points",
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
          name: "Arbiter",
          wikiLink: "Operation_Siren#Arbiter",
          quantity: { amount: 5, timeFrame: "monthly" },
          notes: "Normal",
        },
      ],
      checkMark: {
        color: "green",
        mark: "check",
      },
    },
    eventShop: {
      found: true,
      locations: [
        {
          name: "Limited Event Shop",
          wikiLink: "Shops#Event_Shop",
          quantity: { amount: 5, timeFrame: "cycle" },
        },
      ],
      checkMark: {
        color: "sand",
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

AugmentModuleCoreData.total = getTotalGuaranteed(AugmentModuleCoreData)

export default AugmentModuleCoreData
