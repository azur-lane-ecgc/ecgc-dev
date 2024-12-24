import type { FleetTechData } from "./types"

const FFNFTechPoints: FleetTechData = {
  faction: "FFNF",
  thresholds: [
    {
      ship: "Bayard",
      techPoints: 230,
    },
    {
      ship: "Brest",
      techPoints: 250,
    },
  ],
  data: [
    {
      ship: "Béarn",
      location: [{ event: "Merit Shop", stages: ["8,000 Merit"] }],
      investment: "Max Limit Break",
      techPoints: 56,
      isShipyard: false,
    },
    {
      ship: "Le Téméraire",
      location: [{ event: "Merit Shop", stages: ["8,000 Merit"] }],
      investment: "Max Limit Break",
      techPoints: 42,
      isShipyard: false,
    },
    {
      ship: "L'Opiniâtre",
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Max Limit Break",
      techPoints: 42,
      isShipyard: false,
    },
    {
      ship: "Champagne",
      location: [{ event: "Shipyard", stages: ["PR3"] }],
      investment: "Collection",
      techPoints: 48,
      isShipyard: true,
    },
    {
      ship: "Saint Louis",
      location: [{ event: "Shipyard", stages: ["PR1"] }],
      investment: "Collection",
      techPoints: 34,
      isShipyard: true,
    },
    {
      ship: "Le Triomphant",
      location: [
        { event: "Medal Shop", stages: ["DD"] },
        { event: "Iris of Light and Dark", stages: ["B3", "D3*"] },
      ],
      investment: "Collection",
      techPoints: 22,
      isShipyard: false,
    },
    {
      ship: "Jeanne d'Arc",
      location: [{ event: "Skybound Oratorio", stages: ["B3", "D3*"] }],
      investment: "Collection",
      techPoints: 14,
      isShipyard: false,
    },
  ],
}

export default FFNFTechPoints