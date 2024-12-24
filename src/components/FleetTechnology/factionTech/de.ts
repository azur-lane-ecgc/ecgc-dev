import type { FleetTechData } from "./types"

const DETechPoints: FleetTechData = {
  faction: "DE",
  thresholds: [
    {
      ship: "Harbin",
      techPoints: 160,
    },
    {
      ship: "Ning Hai",
      techPoints: 36,
    },
    {
      ship: "Ping Hai",
      techPoints: 36,
    },
    {
      ship: "Chang Chun",
      techPoints: 32,
    },
    {
      ship: "Tai Yuan",
      techPoints: 32,
    },
    {
      ship: "An Shan",
      techPoints: 32,
    },
    {
      ship: "Fu Shun",
      techPoints: 10,
    },
  ],
  data: [
    {
      ship: "Ning Hai",
      rarity: 3,
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Max Limit Break",
      techPoints: 36,
      isShipyard: false,
    },
    {
      ship: "Ping Hai",
      rarity: 3,
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Max Limit Break",
      techPoints: 36,
      isShipyard: false,
    },
    {
      ship: "Chang Chun",
      rarity: 3,
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Max Limit Break",
      techPoints: 32,
      isShipyard: false,
    },
    {
      ship: "Tai Yuan",
      rarity: 3,
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Max Limit Break",
      techPoints: 32,
      isShipyard: false,
    },
    {
      ship: "An Shan",
      rarity: 3,
      location: [
        { event: "Lunar New Year", stages: ["An Shan's Drawing Book"] },
      ],
      investment: "Max Limit Break",
      techPoints: 32,
      isShipyard: false,
    },
    {
      ship: "Fu Shun",
      rarity: 3,
      location: [
        { event: "Lunar New Year", stages: ["Fu Shun's Great Adventure"] },
      ],
      investment: "Collection",
      techPoints: 10,
      isShipyard: false,
    },
  ],
}

export default DETechPoints
