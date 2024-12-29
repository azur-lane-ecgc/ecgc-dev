interface ToolProps {
  tool: string
  category: string[]
  toolLink: string
  authors: string[]
  description: React.ReactNode
}

export const ToolData: ToolProps[] = [
  {
    tool: "Azur Lane Data GitHub",
    category: ["data"],
    toolLink: "https://github.com/AzurLaneTools/AzurLaneData",
    authors: ["AzurLaneTools"],
    description: (
      <>
        Raw Data from Azur Lane in JSON format.{" "}
        <i>
          Author has made other technical tools as well; check their GitHub
          profile for more information.
        </i>
      </>
    ),
  },
  {
    tool: "Azur Lane Data GitHub",
    category: ["data"],
    toolLink: "https://github.com/MrLar/AzurLaneData",
    authors: ["MrLar"],
    description: (
      <>
        More structured Data from Azur Lane in JSON Format. ECGC draws from this
        data!
      </>
    ),
  },
  {
    tool: "MrLar's Azur Lane Tools",
    category: ["data"],
    toolLink: "https://azurlane.mrlar.dev/",
    authors: ["MrLar"],
    description: (
      <>
        Contains 2 very useful tools:
        <br />
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://azurlane.mrlar.dev/calculator/"
          title="Azur Lane Calculator"
        >
          Azur Lane Calculator
        </a>{" "}
        - Fleetbuilder and Reload Calculator for Azur Lane
        <br />
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://azurlane.mrlar.dev/db/"
          title="Azur Lane DB"
        >
          Azur Lane Database
        </a>{" "}
        - Contains a lot of data about various parts of Azur Lane.
      </>
    ),
  },
  {
    tool: "Nagami's Azur Lane Tools",
    category: ["data", "fun"],
    toolLink: "https://azurlane.nagami.moe/",
    authors: ["Nagamiii"],
    description: (
      <>
        Contains a variety of useful Azur Lane tools, including: Enemy Node
        Database, Interactive L2D Skin Viewer, Gacha Simulator, and many more
        cosmetic tools.
      </>
    ),
  },
  {
    tool: "Effective HP (eHP) Chart",
    category: ["data"],
    toolLink:
      "https://docs.google.com/spreadsheets/d/1HF6_hLEB8m_v0stp4DLGnIoDjgojvo7fjYz-cysjTMc",
    authors: ["Mebot"],
    description: (
      <>
        Quantitative measurements of ship survivability relative to one another
        in various game content.
      </>
    ),
  },
  {
    tool: "AA Sheet",
    category: ["data"],
    toolLink:
      "https://docs.google.com/spreadsheets/d/1rb_uXVmDnK2YKe-0YRTrf3VUcQi8mKwEMYKCBFmVXCc/edit#gid=0",
    authors: ["Mebot"],
    description: <>Quantitative measurements of a ship's AA Damage Output.</>,
  },
  {
    tool: "Barrage Datamine",
    category: ["data"],
    toolLink: "https://azurlane.koumakan.jp/wiki/User:Riceist/BarrageDatamine",
    authors: ["Riceist"],
    description: (
      <>Detailed Barrage information about every ship in Azur Lane.</>
    ),
  },
  {
    tool: "Bomb Spread Chart",
    category: ["data"],
    toolLink: "https://azurlane.koumakan.jp/wiki/User:Riceist/BombSpread",
    authors: ["Riceist"],
    description: <>Quantitative estimates for Bomb geometric hit rates.</>,
  },
  {
    tool: "Stat Hexagon Tabulations",
    category: ["data"],
    toolLink: "https://azurlane.koumakan.jp/wiki/User:Ymiros/Hexagons",
    authors: ["Thorin"],
    description: (
      <>
        Takes past stat hexagons (from Azur Lane EN Twitter), and lists the
        stats associated from them. <i>TLDR: Stat hexagons are NOT reliable.</i>
      </>
    ),
  },
  {
    tool: "Default Equipment List",
    category: ["data"],
    toolLink: "https://azurlane.koumakan.jp/wiki/User:ArdWar/DefaultEquips",
    authors: ["Ardwar"],
    description: <>Stats of all "ghost" guns and default equipment on ships.</>,
  },
  {
    tool: "Azur Lane Simulator",
    category: ["fun"],
    toolLink: "https://that1guywhosucks.github.io/",
    authors: ["that1nerd"],
    description: (
      <>
        Simluates Azur Lane combat and can record information such as damage
        dealt by each ship.
      </>
    ),
  },
  {
    tool: "Suchiguma's Azur Lane Guides",
    category: ["info"],
    toolLink: "https://suchiguma.github.io/home/home-page",
    authors: ["Suchiguma"],
    description: (
      <>
        Contains various guides about Azur Lane content, including Chapter 15,
        Challenge Mode, and End-Game Rankings (which are also displayed on
        ECGC!)
      </>
    ),
  },
  {
    tool: "Tier Lane",
    category: ["fun", "info"],
    toolLink: "https://tier-lane.vercel.app/",
    authors: ["niko_993"],
    description: (
      <>
        Azur Lane Tierlist Maker. You can also view{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.youtube.com/@JimmyAL"
          title="JimmyAL"
        >
          Jimmy's
        </a>{" "}
        Tierlists here.
      </>
    ),
  },
  {
    tool: "Azur Lane Research Stats",
    category: ["data"],
    toolLink:
      "https://azurlane.koumakan.jp/wiki/User:LmeSzinc/AzurLaneResearchStats",
    authors: ["LmeSzinc"],
    description: (
      <>Has large quantities of data regarding Research project drops.</>
    ),
  },
  {
    tool: "Meowfficer Guide",
    category: ["info"],
    toolLink: "https://azurlane.koumakan.jp/wiki/User:Riceist/CatGuide",
    authors: ["Riceist"],
    description: (
      <>
        Goes over{" "}
        <a
          href="https://azurlane.koumakan.jp/wiki/Meowfficer"
          target="_blank"
          rel="noopener noreferrer"
          title="Meowfficers"
        >
          Meowfficers
        </a>
        .
      </>
    ),
  },
  {
    tool: "Azur Lane Fleet Tool (Fleetmaker)",
    category: ["fun"],
    toolLink: "https://renhex.github.io/AzurLaneFleet/",
    authors: ["Renhex"],
    description: <>Easily build and share Azur Lane fleets.</>,
  },
  {
    tool: "Azur Lane Fleet Tech Tracker",
    category: ["data"],
    toolLink: "https://retropaint.github.io/azur-lane-fleet-tech-tracker/",
    authors: ["Retropaint"],
    description: (
      <>
        Helps keep track of{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://azurlane.koumakan.jp/wiki/Fleet_Technology"
          title="Fleet Technology"
        >
          Fleet Technology
        </a>{" "}
        progress.
      </>
    ),
  },
  {
    tool: "AzurLaneDle",
    category: ["fun"],
    toolLink: "https://azurlanedle.com/",
    authors: ["Azur Lanedle"],
    description: <>Wordle but its Azur Lane shipgirls!</>,
  },
  {
    tool: "Equipment Nickname Chart",
    category: ["info"],
    toolLink:
      "https://docs.google.com/spreadsheets/d/1WvzXeBYifdeHTY-Z_wsUKrIc3SgE3saPMV-r5yCBPZg",
    authors: ["Nerezzashimaya", "Samheart564"],
    description: (
      <>
        Community nicknames for commonly used Equipment / Ships in Azur Lane.{" "}
        <br />
        <i>Last Updated: Jan 2022</i>
      </>
    ),
  },
  {
    tool: "Submarine Reload Chart",
    category: ["info", "data"],
    toolLink: "https://azurlane.koumakan.jp/wiki/User:Riceist/SubReload",
    authors: ["Riceist"],
    description: <>Chart containing Reload breakpoints for Submarines.</>,
  },
]
