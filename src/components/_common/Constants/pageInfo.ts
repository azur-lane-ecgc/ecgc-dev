interface PageInfoItem {
  authors: string[]
  lastUpdated: string
  title: string
  revision: string
  description: string
  link: string
  image: string
}

export const pageInfo: PageInfoItem[] = [
  {
    title: "Common Resource Guide",
    authors: ["Samheart564"],
    lastUpdated: "6/8/2025",
    revision: "2.0.0",
    description: `Goes over Common Resources in Azur Lane, how to acquire them, and how much you can acquire in a reasonable time frame.`,
    link: "common_resource",
    image: "/images/misc/common_resource_cover.jpg",
  },
  {
    title: "Early Ship Recommendations",
    authors: ["Samheart564"],
    lastUpdated: "11/24/2023",
    revision: "1.1.4",
    description: `Goes over easily accessible good ships in Azur Lane and where to acquire them.`,
    link: "early_ship_recommendations",
    image: "/images/misc/early_ship_recs_cover.png",
  },
  {
    title: "Equipment Guide",
    authors: ["Samheart564"],
    lastUpdated: "6/8/2025",
    revision: "1.17.0",
    description: `Goes over the optimal equipment to use in Azur Lane, in an easy-to-read image format!`,
    link: "equipment",
    image: "/images/misc/equipment_guide_cover.png",
  },
  {
    title: "Farming Guide",
    authors: ["Samheart564"],
    lastUpdated: "9/5/2024",
    revision: "1.1.1",
    description: `Goes over the optimal ways to farm in Azur Lane.`,
    link: "farming",
    image: "/images/misc/farming_guide_cover.jpg",
  },
  {
    title: "Fleetbuilding Guide",
    authors: ["Samheart564"],
    lastUpdated: "6/8/2025",
    revision: "1.13.0",
    description: `Goes over how to make fleets for both Campaign and <a href="https://azurlane.koumakan.jp/wiki/Operation Siren" target="_blank" rel="noopener noreferrer">Operation Siren</a> in Azur Lane.`,
    link: "fleetbuilding",
    image: "/images/misc/fleetbuilding_guide_cover.png",
  },
  {
    title: "Fleet Technology Guide",
    authors: ["Samheart564"],
    lastUpdated: "6/8/2025",
    revision: "1.2.0",
    description: `Goes over the <a href="https://azurlane.koumakan.jp/wiki/Fleet_Technology" target="_blank" rel="noopener noreferrer">Fleet Technology</a> mechanics and how to get Tech Points in Azur Lane.`,
    link: "fleet_technology",
    image: "/images/misc/no_cover.jpg",
  },
  {
    title: "Newbie Tips",
    authors: ["Samheart564"],
    lastUpdated: "6/8/2025",
    revision: "2.0.0",
    description: `Goes over basic advice and mistakes to avoid for new players!`,
    link: "newbie_tips",
    image: "/images/misc/no_cover.jpg",
  },
  {
    title: "Research Guide",
    authors: ["Samheart564"],
    lastUpdated: "6/8/2025",
    revision: "1.6.0",
    description:
      'Goes over the <a href="https://azurlane.koumakan.jp/wiki/Research" target="_blank" rel="noopener noreferrer">Research</a> mechanics in Azur Lane, including optimal Research Projects to take, and how Catchup / Coin-up work.',
    link: "research",
    image: "/images/misc/research_guide_cover.jpg",
  },
  {
    title: "Samvaluations",
    authors: ["Samheart564"],
    lastUpdated: "9/5/2024",
    revision: "1.12.0",
    description: `Compiled list of all my ship reviews!`,
    link: "samvaluation",
    image: "/images/misc/no_cover.jpg",
  },
  {
    title: "Shop Priority Guide",
    authors: ["Riceist", "Samheart564"],
    lastUpdated: "9/5/2024",
    revision: "1.7.1",
    description: `Goes over all the permanent shops in Azur Lane, and what to obtain from them.`,
    link: "shop_priority",
    image: "/images/misc/no_cover.jpg",
  },
]
