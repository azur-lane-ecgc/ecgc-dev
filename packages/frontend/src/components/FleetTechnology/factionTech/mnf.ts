import type { FleetTechData } from "./types"

const MNFTechPoints: FleetTechData = {
  faction: "MNF",

  thresholds: [
    {
      ship: "Flandre",
      techPoints: 180,
      note: "+KMS Points",
    },
  ],
  data: [
    {
      ship: "La Galissonnière",
      rarity: 3,
      location: [
        {
          event: "Merit Shop",
          stages: [
            `5,000 <img
        loading="lazy"
        class="inline-block"
        src="/images/materials/merit.png"
        width="20px"
        alt="Merit"
      />`,
          ],
        },
      ],
      investment: "Max Limit Break",
      techPoints: 48,
      isShipyard: false,
    },
    {
      ship: "Le Mars",
      rarity: 2,
      location: [
        {
          event: "Iris of Light and Dark",
          stages: ["A3", "B2", "C3", "D2", "D3"],
        },
        {
          event: "Core Data Shop",
          stages: [
            `1,000 <img
          loading="lazy"
          class="inline-block"
          src="/images/materials/core_data.png"
          width="20px"
          alt="Core Data"
        />`,
          ],
        },
      ],
      investment: "Max Limit Break",
      techPoints: 26,
      isShipyard: false,
    },
    {
      ship: "Gascogne",
      rarity: 4,
      location: [{ event: "Shipyard", stages: ["PR2"] }],
      investment: "Collection",
      techPoints: 44,
      isShipyard: true,
    },
    {
      ship: "Jean Bart",
      rarity: 4,
      location: [{ event: "Medal Shop", stages: ["BB"] }],
      investment: "Collection",
      techPoints: 40,
      isShipyard: false,
    },
    {
      ship: "Le Malin",
      rarity: 4,
      location: [{ event: "Medal Shop", stages: ["DD"] }],
      investment: "Collection",
      techPoints: 22,
      isShipyard: false,
    },
  ],
}

export default MNFTechPoints
