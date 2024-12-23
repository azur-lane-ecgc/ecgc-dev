import type { FleetTechData } from "./types"

export const DETechPoints: FleetTechData = {
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
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Max Limit Break",
      techPoints: 36,
      isShipyard: false,
    },
    {
      ship: "Ping Hai",
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Max Limit Break",
      techPoints: 36,
      isShipyard: false,
    },
    {
      ship: "Chang Chun",
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Max Limit Break",
      techPoints: 32,
      isShipyard: false,
    },
    {
      ship: "Tai Yuan",
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Max Limit Break",
      techPoints: 32,
      isShipyard: false,
    },
    {
      ship: "An Shan",
      location: [
        { event: "Lunar New Year", stages: ["An Shan's Drawing Book"] },
      ],
      investment: "Max Limit Break",
      techPoints: 32,
      isShipyard: false,
    },
    {
      ship: "Fu Shun",
      location: [
        { event: "Lunar New Year", stages: ["Fu Shun's Great Adventure"] },
      ],
      investment: "Collection",
      techPoints: 10,
      isShipyard: false,
    },
  ],
}
