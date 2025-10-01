interface PageInfoItem {
  authors: string[]
  lastUpdated: string
  title: string
  revision: string
  description: string
  link: string
  image: string
  homepageDisplay: boolean
}

export const pageInfo: PageInfoItem[] = [
  {
    title: "Common Resource Guide",
    authors: ["Samheart564"],
    lastUpdated: "9/16/2025",
    revision: "2.1.0",
    description: `Goes over Common Resources in Azur Lane, how to acquire them, and how much you can acquire in a reasonable time frame.`,
    link: "common_resource",
    image: "/images/misc/common_resource_cover.jpg",
    homepageDisplay: true,
  },
  {
    title: "Early Ship Recommendations",
    authors: ["Samheart564"],
    lastUpdated: "6/10/2025",
    revision: "1.1.5",
    description: `Goes over easily accessible good ships in Azur Lane and where to acquire them.`,
    link: "early_ship_recommendations",
    image: "/images/misc/early_ship_recs_cover.png",
    homepageDisplay: true,
  },
  {
    title: "Equipment Guide",
    authors: ["Samheart564"],
    lastUpdated: "9/30/2025",
    revision: "1.18.1",
    description: `Goes over the optimal equipment to use in Azur Lane, in an easy-to-read image format!`,
    link: "equipment",
    image: "/images/misc/equipment_guide_cover.jpg",
    homepageDisplay: true,
  },
  {
    title: "Farming Guide",
    authors: ["Samheart564"],
    lastUpdated: "9/16/2025",
    revision: "1.1.4",
    description: `Goes over the optimal ways to farm in Azur Lane.`,
    link: "farming",
    image: "/images/misc/farming_guide_cover.jpg",
    homepageDisplay: true,
  },
  {
    title: "Fleetbuilding Guide",
    authors: ["Samheart564"],
    lastUpdated: "9/16/2025",
    revision: "1.14.0",
    description: `Goes over how to make fleets for both Campaign and <a href="https://azurlane.koumakan.jp/wiki/Operation Siren" target="_blank" rel="noopener noreferrer">Operation Siren</a> in Azur Lane.`,
    link: "fleetbuilding",
    image: "/images/misc/fleetbuilding_guide_cover.png",
    homepageDisplay: true,
  },
  {
    title: "Fleet Technology Guide",
    authors: ["Samheart564"],
    lastUpdated: "9/16/2025",
    revision: "1.3.0",
    description: `Goes over the <a href="https://azurlane.koumakan.jp/wiki/Fleet_Technology" target="_blank" rel="noopener noreferrer">Fleet Technology</a> mechanics and how to get Tech Points in Azur Lane.`,
    link: "fleet_technology",
    image: "/images/misc/no_cover.jpg",
    homepageDisplay: true,
  },
  {
    title: "Newbie Tips",
    authors: ["Samheart564"],
    lastUpdated: "9/16/2025",
    revision: "2.0.2",
    description: `Goes over basic advice and mistakes to avoid for new players!`,
    link: "newbie_tips",
    image: "/images/misc/newbie_tips_cover.jpg",
    homepageDisplay: true,
  },
  {
    title: "Research Guide",
    authors: ["Samheart564"],
    lastUpdated: "9/16/2025",
    revision: "1.7.0",
    description:
      'Goes over the <a href="https://azurlane.koumakan.jp/wiki/Research" target="_blank" rel="noopener noreferrer">Research</a> mechanics in Azur Lane, including optimal Research Projects to take, and how Catchup / Coin-up work.',
    link: "research",
    image: "/images/misc/research_guide_cover.jpg",
    homepageDisplay: true,
  },
  {
    title: "Samvaluations",
    authors: ["Samheart564"],
    lastUpdated: "9/16/2025",
    revision: "2.0.1",
    description: `Compiled list of all my ship reviews!`,
    link: "samvaluation",
    image: "/images/misc/no_cover.jpg",
    homepageDisplay: true,
  },
  {
    title: "Shop Priority Guide",
    authors: ["Samheart564"],
    lastUpdated: "9/16/2025",
    revision: "1.9.0",
    description: `Goes over all the permanent shops in Azur Lane, and what to obtain from them.`,
    link: "shop_priority",
    image: "/images/misc/no_cover.jpg",
    homepageDisplay: true,
  },
  {
    title: "Azur Lane Tools",
    authors: ["The Azur Lane English Community"],
    lastUpdated: "9/16/2025",
    revision: "2.1.0",
    description: `Aggregate list of useful resources related to Azur Lane.`,
    link: "tools",
    image: "/images/misc/no_cover.jpg",
    homepageDisplay: false,
  },
]
