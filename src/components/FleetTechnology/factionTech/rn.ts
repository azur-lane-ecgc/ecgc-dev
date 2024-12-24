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
      ship: "Littorio",
      location: [
        { event: "Merit Shop", stages: ["20,000 Merit"] },
        { event: "Empyreal Tragicomedy", stages: ["B3", "D3*"] },
      ],
      investment: "Max Limit Break",
      techPoints: 120,
      isShipyard: false,
    },
    {
      ship: "Conte di Cavour",
      location: [
        { event: "Merit Shop", stages: ["5,000 Merit"] },
        { event: "Empyreal Tragicomedy", stages: ["Chapters B", "D"] },
      ],
      investment: "Max Limit Break",
      techPoints: 66,
      isShipyard: false,
    },
    {
      ship: "Trento",
      location: [{ event: "Merit Shop", stages: ["5,000 Merit"] }],
      investment: "Max Limit Break",
      techPoints: 48,
      isShipyard: false,
    },
    {
      ship: "Carabiniere",
      location: [{ event: "Merit Shop", stages: ["8,000 Merit"] }],
      investment: "Max Limit Break",
      techPoints: 42,
      isShipyard: false,
    },
    {
      ship: "Torricelli",
      location: [{ event: "Merit Shop", stages: ["8,000 Merit"] }],
      investment: "Max Limit Break",
      techPoints: 30,
      isShipyard: false,
    },
    {
      ship: "Marco Polo",
      location: [{ event: "Shipyard", stages: ["PR4"] }],
      investment: "Collection",
      techPoints: 48,
      isShipyard: true,
    },
    {
      ship: "Duca degli Abruzzi",
      location: [{ event: "Daedalian Hymn", stages: ["B3", "D3*"] }],
      investment: "Collection",
      techPoints: 24,
      isShipyard: false,
    },
  ],
}

export default RNTechPoints
