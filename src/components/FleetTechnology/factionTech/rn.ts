import type { FleetTechData } from "./types"

const RNTechPoints: FleetTechData = {
  faction: "RN",
  thresholds: [
    {
      ship: "Admiral Nakhimov",
      techPoints: 200,
      note: "+SN Points",
    },
    {
      ship: "Chkalov",
      techPoints: 300,
      note: "+USS Points",
    },
    {
      ship: "Napoli",
      techPoints: 300,
      note: "+SN Points",
    },
  ],
  data: [
    {
      ship: "Giulio Cesare",
      rarity: 3,
      location: [
        {
          event: "Guild Shop",
          stages: ["Elite Ship"],
        },
      ],
      investment: "Max Limit Break",
      techPoints: 74,
      isShipyard: false,
    },
    {
      ship: "Conte di Cavour",
      rarity: 2,
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
        { event: "Empyreal Tragicomedy", stages: ["Chapters B", "D"] },
      ],
      investment: "Max Limit Break",
      techPoints: 66,
      isShipyard: false,
    },
    {
      ship: "Trento",
      rarity: 2,
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
      ship: "Carabiniere",
      rarity: 3,
      location: [
        {
          event: "Merit Shop",
          stages: [
            `8,000 <img
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
      techPoints: 42,
      isShipyard: false,
    },
    {
      ship: "Torricelli",
      rarity: 3,
      location: [
        {
          event: "Merit Shop",
          stages: [
            `8,000 <img
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
      techPoints: 30,
      isShipyard: false,
    },
    {
      ship: "Littorio",
      rarity: 4,
      location: [
        {
          event: "Merit Shop",
          stages: [
            `20,000 <img
          loading="lazy"
          class="inline-block"
          src="/images/materials/merit.png"
          width="20px"
          alt="Merit"
        />`,
          ],
        },
        { event: "Empyreal Tragicomedy", stages: ["B3", "D3*"] },
      ],
      investment: "Collection",
      techPoints: 40,
      isShipyard: false,
    },
    {
      ship: "Marco Polo",
      rarity: 4,
      location: [{ event: "Shipyard", stages: ["PR4"] }],
      investment: "Collection",
      techPoints: 48,
      isShipyard: true,
    },
    {
      ship: "Duca degli Abruzzi",
      rarity: 4,
      location: [{ event: "Daedalian Hymn", stages: ["B3", "D3*"] }],
      investment: "Collection",
      techPoints: 24,
      isShipyard: false,
    },
  ],
}

export default RNTechPoints
