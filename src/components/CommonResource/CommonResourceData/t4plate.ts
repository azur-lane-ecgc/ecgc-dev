import { getTotalGuaranteed } from "@utils/commonResource"
import type { ResourceProps } from "./types"

const T4PlateData: ResourceProps = {
  name: "T4 Plate",
  category: "Gear Enhance",
  rarity: 4,
  image: "materials/unknown_t4_plate.png",
  wikiLink: "Equipment#Upgrade_(Enhance)",
  drops: {
    academy: {
      found: true,
      locations: [
        {
          name: "Guild Operations",
          wikiLink: "Guild#Operations",
          quantity: { amount: 36, timeFrame: "monthly" },
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
          name: "Weekly Missions",
          wikiLink: "Missions#Weekly_Missions",
          quantity: { amount: 4, timeFrame: "weekly" },
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
          wikiLink: "Daily_Raid#Escort_Mission",
          quantity: { amount: 9, timeFrame: "weekly" },
          notes: "Lv.95",
        },
        {
          name: "Supply Line Disruption",
          wikiLink: "Daily_Raid#Supply_Line_Disruption",
          quantity: { amount: 9, timeFrame: "weekly" },
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
          quantity: { amount: 30, timeFrame: "bimonthly" },
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
          quantity: { amount: 20, timeFrame: "cycle" },
          notes: "55000 Points",
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
          name: "Blue Port Shops",
          wikiLink: "Operation_Siren#Ports",
          quantity: { amount: 30, timeFrame: "monthly" },
        },
        {
          name: "Arbiter",
          wikiLink: "Operation_Siren#Arbiter",
          quantity: { amount: 60, timeFrame: "monthly" },
          notes: "Normal + Hard",
        },
        {
          name: "Strongholds",
          wikiLink: "Operation_Siren#Siren_Stronghold",
          quantity: { amount: "RNG", timeFrame: "monthly" },
        },
        {
          name: "Coordinate Zones",
          wikiLink: "Operation_Siren#Abyssal",
          quantity: { amount: "RNG", timeFrame: "monthly" },
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
          quantity: { amount: 20, timeFrame: "weekly" },
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
    daily: 0,
    weekly: 0,
    monthly: 0,
    bimonthly: 0,
  },
  notes: "Total income is likely way higher due to OpSi RNG.",
}

T4PlateData.total = getTotalGuaranteed(T4PlateData)

export default T4PlateData
