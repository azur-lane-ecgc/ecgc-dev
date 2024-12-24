import type { FleetTechData } from "./types"

const NPTechPoints: FleetTechData = {
  faction: "NP",
  thresholds: [
    {
      ship: "Napoli",
      techPoints: 200,
      note: "+RN Points",
    },
    {
      ship: "Admiral Nakhimov",
      techPoints: 300,
      note: "+RN Points",
    },
  ],
  data: [
    {
      ship: "Tallinn",
      rarity: 4,
      location: [{ event: "Khorovod of Dawn's Rime", stages: ["B3", "D3*"] }],
      investment: "Max Limit Break",
      techPoints: 84,
      isShipyard: false,
    },
    {
      ship: "Gangut",
      rarity: 3,
      location: [
        {
          event: "Merit Shop",
          stages: [
            `8,000 <img
            loading="lazy"
            class="inline-block"
            src="images/materials/merit.png"
            width="20px"
            alt="Merit"
          />`,
          ],
        },
      ],
      investment: "Max Limit Break",
      techPoints: 84,
      isShipyard: false,
    },
    {
      ship: "Chapayev",
      rarity: 4,
      location: [{ event: "Northern Overture", stages: ["B3", "D3*"] }],
      investment: "Max Limit Break",
      techPoints: 72,
      isShipyard: false,
    },
    {
      ship: "Minsk",
      rarity: 3,
      location: [
        {
          event: "Merit Shop",
          stages: [
            `8,000 <img
            loading="lazy"
            class="inline-block"
            src="images/materials/merit.png"
            width="20px"
            alt="Merit"
          />`,
          ],
        },
      ],
      investment: "Max Limit Break",
      techPoints: 36,
      isShipyard: false,
    },
    {
      ship: "Gromky",
      rarity: 3,
      location: [
        {
          event: "Merit Shop",
          stages: [
            `8,000 <img
            loading="lazy"
            class="inline-block"
            src="images/materials/merit.png"
            width="20px"
            alt="Merit"
          />`,
          ],
        },
      ],
      investment: "Max Limit Break",
      techPoints: 32,
      isShipyard: false,
    },
    {
      ship: "Chkalov",
      rarity: 4,
      location: [{ event: "Shipyard", stages: ["PR5"] }],
      investment: "Collection",
      techPoints: 38,
      isShipyard: true,
    },
  ],
}

export default NPTechPoints
