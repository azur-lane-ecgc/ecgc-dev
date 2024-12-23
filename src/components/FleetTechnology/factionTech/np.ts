import type { FleetTechData } from "./types"

export const NPTechPoints: FleetTechData = {
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
      location: [{ event: "Khorovod of Dawn's Rime", stages: ["B3", "D3*"] }],
      investment: "Max Limit Break",
      techPoints: 84,
      isShipyard: false,
    },
    {
      ship: "Gangut",
      location: [{ event: "Merit Shop", stages: ["8,000 Merit"] }],
      investment: "Max Limit Break",
      techPoints: 84,
      isShipyard: false,
    },
    {
      ship: "Chapayev",
      location: [{ event: "Northern Overture", stages: ["B3", "D3*"] }],
      investment: "Max Limit Break",
      techPoints: 72,
      isShipyard: false,
    },
    {
      ship: "Minsk",
      location: [{ event: "Merit Shop", stages: ["8,000 Merit"] }],
      investment: "Max Limit Break",
      techPoints: 36,
      isShipyard: false,
    },
    {
      ship: "Gromky",
      location: [{ event: "Merit Shop", stages: ["8,000 Merit"] }],
      investment: "Max Limit Break",
      techPoints: 32,
      isShipyard: false,
    },
    {
      ship: "Chkalov",
      location: [{ event: "Shipyard", stages: ["PR5"] }],
      investment: "Collection",
      techPoints: 38,
      isShipyard: true,
    },
  ],
}
