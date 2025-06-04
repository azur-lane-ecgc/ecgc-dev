import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const AugmentModuleEXPData: ResourceProps = {
  name: "Augment Module EXP",
  plural: "Augment Module EXP",
  category: "Augmentation",
  rarity: [2, 3, 4],
  image: [
    "materials/t1_augment_enhance.png",
    "materials/t2_augment_enhance.png",
    "materials/t3_augment_enhance.png",
  ],
  wikiLink: "Augmentation#Crafting_and_Enhancing",
  drops: {
    missions: {
      found: true,
      locations: [
        {
          name: "Commander Handbook",
          wikiLink: "Commander Handbook#Rookie Missions",
          quantity: { amount: 1e3, timeFrame: "one-time" },
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
          quantity: { amount: 4e3, timeFrame: "weekly" },
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
          name: "Cruise Missions",
          wikiLink: "Cruise_Missions#Rewards",
          quantity: { amount: 1e3, timeFrame: "bimonthly" },
          notes: "Free",
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
          name: "Campaign Chapters 12+",
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
          quantity: { amount: 11e3, timeFrame: "cycle" },
          notes: "45000 Points",
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
          quantity: { amount: 5e3, timeFrame: "cycle" },
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
  notes: `Purple & Gold Rarity only drop on Chapters 13/14+ respectively.<br/>You can use extra Augment Modules for enhancement. See <a
        href="https://azurlane.koumakan.jp/wiki/Augmentation"
        rel="noopener noreferrer"
        target="_blank"
      >
        Augmentation
      </a> for more details.`,
}

AugmentModuleEXPData.total = getTotalGuaranteed(AugmentModuleEXPData)

export default AugmentModuleEXPData
