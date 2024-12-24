import type { FleetTechData } from "./types"

const KMSTechPoints: FleetTechData = {
  faction: "KMS",
  thresholds: [
    { ship: "Gascogne", techPoints: 420, note: "+USS Points" },
    { ship: "Mainz", techPoints: 550 },
    { ship: "Odin", techPoints: 600 },
    { ship: "Marco Polo", techPoints: 600, note: "+HMS Points" },
    { ship: "Friedrich der Große", techPoints: 630 },
    { ship: "Ägir", techPoints: 700 },
    { ship: "Prinz Rupprecht", techPoints: 700 },
    { ship: "Flandre", techPoints: 800, note: "+MNF Points" },
    { ship: "Felix Schultz", techPoints: 850 },
    { ship: "Hindenburg", techPoints: 950 },
  ],
  data: [
    {
      ship: "Gneisenau",
      location: [
        { event: "Divergent Chessboard", stages: ["B2", "D2", "D3", "D4"] },
        {
          event: "Scherzo of Iron and Blood",
          stages: ["B2", "B3", "D2", "D3"],
        },
      ],
      investment: "Max Limit Break",
      techPoints: 84,
      isShipyard: false,
    },
    {
      ship: "Scharnhorst",
      location: [
        { event: "Divergent Chessboard", stages: ["B3", "D2", "D3", "D4"] },
        {
          event: "Scherzo of Iron and Blood",
          stages: ["B1", "B3", "D1", "D3"],
        },
      ],
      investment: "Max Limit Break",
      techPoints: 84,
      isShipyard: false,
    },
    {
      ship: "Admiral Hipper",
      location: [
        { event: "Guild Shop", stages: ["Elite Ship"] },
        { event: "Divergent Chessboard", stages: ["A4", "C4", "D1"] },
      ],
      investment: "Max Limit Break",
      techPoints: 72,
      isShipyard: false,
    },
    {
      ship: "Admiral Graf Spee",
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Max Limit Break",
      techPoints: 56,
      isShipyard: false,
    },
    {
      ship: "Deutschland",
      location: [
        {
          event: "Divergent Chessboard",
          stages: ["B1", "B4", "C4", "D1", "D4"],
        },
      ],
      investment: "Max Limit Break",
      techPoints: 56,
      isShipyard: false,
    },
    {
      ship: "Z35",
      location: [{ event: "Divergent Chessboard", stages: ["B4", "D4"] }],
      investment: "Max Limit Break",
      techPoints: 48,
      isShipyard: false,
    },
    {
      ship: "Z23",
      location: [
        { event: "Map Drop", stages: ["all stages except Chapter 1"] },
      ],
      investment: "Max Limit Break",
      techPoints: 42,
      isShipyard: false,
    },
    {
      ship: "Z24",
      location: [{ event: "Merit Shop", stages: ["8,000 Merit"] }],
      investment: "Max Limit Break",
      techPoints: 42,
      isShipyard: false,
    },
    {
      ship: "Z25",
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Max Limit Break",
      techPoints: 42,
      isShipyard: false,
    },
    {
      ship: "Z1",
      location: [
        { event: "Map Drop", stages: ["5-1", "8-2", "9-4"] },
        {
          event: "Divergent Chessboard",
          stages: ["B2", "B3", "B4", "D2", "D3", "D4"],
        },
        {
          event: "Scherzo of Iron and Blood",
          stages: ["B1", "B2", "D1", "D2"],
        },
      ],
      investment: "Max Limit Break",
      techPoints: 32,
      isShipyard: false,
    },
    {
      ship: "Leipzig",
      location: [
        { event: "Memento (Collections)", stages: ["Königsberg Class"] },
      ],
      investment: "Max Limit Break",
      techPoints: 32,
      isShipyard: false,
    },
    {
      ship: "Odin",
      location: [{ event: "Shipyard", stages: ["PR3"] }],
      investment: "Collection",
      techPoints: 48,
      isShipyard: true,
    },
    {
      ship: "Bismarck",
      location: [{ event: "Medal Shop", stages: ["BB"] }],
      investment: "Collection",
      techPoints: 40,
      isShipyard: false,
    },
    {
      ship: "Tirpitz",
      location: [{ event: "Medal Shop", stages: ["BB"] }],
      investment: "Collection",
      techPoints: 40,
      isShipyard: false,
    },
    {
      ship: "Roon",
      location: [{ event: "Shipyard", stages: ["PR1"] }],
      investment: "Collection",
      techPoints: 38,
      isShipyard: true,
    },
    {
      ship: "Mainz",
      location: [{ event: "Shipyard", stages: ["PR3"] }],
      investment: "Collection",
      techPoints: 30,
      isShipyard: true,
    },
    {
      ship: "Prinz Eugen",
      location: [
        { event: "Medal Shop", stages: ["CA"] },
        { event: "New Player 7-day Login Campaign", stages: [] },
      ],
      investment: "Collection",
      techPoints: 28,
      isShipyard: false,
    },
    {
      ship: "Z46",
      location: [
        { event: "Medal Shop", stages: ["DD"] },
        { event: "Divergent Chessboard", stages: ["B4", "D4*"] },
      ],
      investment: "Collection",
      techPoints: 22,
      isShipyard: false,
    },
    {
      ship: "U-96",
      location: [{ event: "Medal Shop", stages: ["SS"] }],
      investment: "Collection",
      techPoints: 12,
      isShipyard: false,
    },
    {
      ship: "U-37",
      location: [
        { event: "Merit Shop", stages: ["20,000 Merit"] },
        { event: "Inverted Orthant", stages: ["B3", "D3*"] },
      ],
      investment: "Collection",
      techPoints: 12,
      isShipyard: false,
    },
    {
      ship: "U-556",
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Collection",
      techPoints: 8,
      isShipyard: false,
    },
    {
      ship: "U-557",
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Collection",
      techPoints: 8,
      isShipyard: false,
    },
    {
      ship: "Z19",
      location: [
        {
          event: "Divergent Chessboard",
          stages: ["all maps except A1", "A2"],
        },
      ],
      investment: "Collection",
      techPoints: 8,
      isShipyard: false,
    },
    {
      ship: "U-73",
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Collection",
      techPoints: 6,
      isShipyard: false,
    },
    {
      ship: "Königsberg",
      location: [{ event: "Map Drop", stages: ["check ship page"] }],
      investment: "Collection",
      techPoints: 6,
      isShipyard: false,
    },
    {
      ship: "Köln",
      location: [{ event: "Map Drop", stages: ["check ship page"] }],
      investment: "Collection",
      techPoints: 6,
      isShipyard: false,
    },
    {
      ship: "Karlsruhe",
      location: [{ event: "Map Drop", stages: ["check ship page"] }],
      investment: "Collection",
      techPoints: 6,
      isShipyard: false,
    },
    {
      ship: "Z20",
      location: [
        { event: "Divergent Chessboard", stages: ["all maps except A1"] },
      ],
      investment: "Collection",
      techPoints: 6,
      isShipyard: false,
    },
    {
      ship: "Z21",
      location: [
        { event: "Divergent Chessboard", stages: ["all maps except A1"] },
      ],
      investment: "Collection",
      techPoints: 6,
      isShipyard: false,
    },
  ],
}

export default KMSTechPoints