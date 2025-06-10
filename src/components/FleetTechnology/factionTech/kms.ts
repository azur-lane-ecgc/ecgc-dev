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
      rarity: 3,
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
      rarity: 3,
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
      rarity: 3,
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
      rarity: 3,
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Max Limit Break",
      techPoints: 56,
      isShipyard: false,
    },
    {
      ship: "Deutschland",
      rarity: 3,
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
      rarity: 3,
      location: [{ event: "Divergent Chessboard", stages: ["B4", "D4"] }],
      investment: "Max Limit Break",
      techPoints: 48,
      isShipyard: false,
    },
    {
      ship: "Z23",
      rarity: 3,
      location: [
        { event: "Map Drop", stages: ["all stages except Chapter 1"] },
      ],
      investment: "Max Limit Break",
      techPoints: 42,
      isShipyard: false,
    },
    {
      ship: "Z24",
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
      ship: "Z25",
      rarity: 3,
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Max Limit Break",
      techPoints: 42,
      isShipyard: false,
    },
    {
      ship: "Z1",
      rarity: 3,
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
      rarity: 2,
      location: [
        { event: "Memento (Collections)", stages: ["Königsberg Class"] },
      ],
      investment: "Max Limit Break",
      techPoints: 32,
      isShipyard: false,
    },
    {
      ship: "Königsberg",
      rarity: 1,
      location: [{ event: "Map Drop", stages: ["check ship page"] }],
      investment: "Max Limit Break",
      techPoints: 20,
      isShipyard: false,
    },
    {
      ship: "Köln",
      rarity: 1,
      location: [{ event: "Map Drop", stages: ["check ship page"] }],
      investment: "Max Limit Break",
      techPoints: 20,
      isShipyard: false,
    },
    {
      ship: "Karlsruhe",
      rarity: 1,
      location: [{ event: "Map Drop", stages: ["check ship page"] }],
      investment: "Max Limit Break",
      techPoints: 20,
      isShipyard: false,
    },
    {
      ship: "Odin",
      rarity: 4,
      location: [{ event: "Shipyard", stages: ["PR3"] }],
      investment: "Collection",
      techPoints: 48,
      isShipyard: true,
    },
    {
      ship: "Bismarck",
      rarity: 4,
      location: [{ event: "Medal Shop", stages: ["BB"] }],
      investment: "Collection",
      techPoints: 40,
      isShipyard: false,
    },
    {
      ship: "Tirpitz",
      rarity: 4,
      location: [{ event: "Medal Shop", stages: ["BB"] }],
      investment: "Collection",
      techPoints: 40,
      isShipyard: false,
    },
    {
      ship: "Roon",
      rarity: 4,
      location: [{ event: "Shipyard", stages: ["PR1"] }],
      investment: "Collection",
      techPoints: 38,
      isShipyard: true,
    },
    {
      ship: "Mainz",
      rarity: 4,
      location: [{ event: "Shipyard", stages: ["PR3"] }],
      investment: "Collection",
      techPoints: 30,
      isShipyard: true,
    },
    {
      ship: "Prinz Eugen",
      rarity: 4,
      location: [
        { event: "Medal Shop", stages: ["CA"] },
        { event: "Beginner Rewards", stages: ["8-Day Login Reward"] },
      ],
      investment: "Collection",
      techPoints: 28,
      isShipyard: false,
    },
    {
      ship: "Z46",
      rarity: 4,
      location: [
        { event: "Medal Shop", stages: ["DD"] },
        { event: "Divergent Chessboard", stages: ["B4", "D4*"] },
      ],
      investment: "Collection",
      techPoints: 22,
      isShipyard: false,
    },
    {
      ship: "Magdeburg",
      rarity: 4,
      location: [{ event: "Tower of Transcendence", stages: ["B3", "D3*"] }],
      investment: "Collection",
      techPoints: 20,
      isShipyard: false,
    },
    {
      ship: "U-96",
      rarity: 4,
      location: [{ event: "Medal Shop", stages: ["SS"] }],
      investment: "Collection",
      techPoints: 12,
      isShipyard: false,
    },
    {
      ship: "U-37",
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
        { event: "Inverted Orthant", stages: ["B3", "D3*"] },
      ],
      investment: "Collection",
      techPoints: 12,
      isShipyard: false,
    },
    {
      ship: "U-110",
      rarity: 3,
      location: [
        { event: "Guild Shop", stages: ["Elite Ship"] },
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
      investment: "Collection",
      techPoints: 8,
      isShipyard: false,
    },
    {
      ship: "U-556",
      rarity: 3,
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Collection",
      techPoints: 8,
      isShipyard: false,
    },
    {
      ship: "U-557",
      rarity: 3,
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Collection",
      techPoints: 8,
      isShipyard: false,
    },
    {
      ship: "U-1206",
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
      investment: "Collection",
      techPoints: 8,
      isShipyard: false,
    },
    {
      ship: "Z19",
      rarity: 2,
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
      rarity: 3,
      location: [{ event: "Guild Shop", stages: ["Elite Ship"] }],
      investment: "Collection",
      techPoints: 6,
      isShipyard: false,
    },
    {
      ship: "Z20",
      rarity: 1,
      location: [
        { event: "Divergent Chessboard", stages: ["all maps except A1"] },
      ],
      investment: "Collection",
      techPoints: 6,
      isShipyard: false,
    },
    {
      ship: "Z21",
      rarity: 1,
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
