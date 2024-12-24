import type { FleetTechData } from "./types"

const MNFTechPoints: FleetTechData = {
  faction: "MNF",

  thresholds: [
    {
      ship: "Flandre",
      techPoints: 180,
      note: "(+KMS)",
    },
  ],
  data: [
    {
      ship: "La Galissonnière",
      location: [{ event: "Merit Shop", stages: ["5,000 Merit"] }],
      investment: "Max Limit Break",
      techPoints: 48,
      isShipyard: false,
    },
    {
      ship: "Le Mars",
      location: [
        {
          event: "Iris of Light and Dark",
          stages: ["A3", "B2", "C3", "D2", "D3"],
        },
        { event: "Core Data Shop", stages: ["1,000 Core Data"] },
      ],
      investment: "Max Limit Break",
      techPoints: 26,
      isShipyard: false,
    },
    {
      ship: "Gascogne",
      location: [{ event: "Shipyard", stages: ["PR2"] }],
      investment: "Collection",
      techPoints: 44,
      isShipyard: true,
    },
    {
      ship: "Jean Bart",
      location: [{ event: "Medal Shop", stages: ["BB"] }],
      investment: "Collection",
      techPoints: 40,
      isShipyard: false,
    },
    {
      ship: "Le Malin",
      location: [{ event: "Medal Shop", stages: ["DD"] }],
      investment: "Collection",
      techPoints: 22,
      isShipyard: false,
    },
  ],
}

export default MNFTechPoints