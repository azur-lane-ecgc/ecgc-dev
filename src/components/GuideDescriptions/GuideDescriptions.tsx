import React from "react"

interface Guide {
  title: string
  author: string
  date: string
  revision: string
  description: React.ReactNode
  link: string
  image: string
}

const guides: Guide[] = [
  {
    title: "Common Resource Guide",
    author: "Samheart564",
    date: "6/9/2024",
    revision: "1.1.5",
    description: (
      <>
        Goes over Common Resources in Azur Lane, how to acquire them, and how
        much you can acquire in a reasonable time frame.
      </>
    ),
    link: "common_resource",
    image: "images/misc/common_resource_cover.jpg",
  },
  {
    title: "Early Ship Recommendations Guide",
    author: "Samheart564",
    date: "11/24/2023",
    revision: "1.1.4",
    description: (
      <>
        Goes over easily accessible good ships in Azur Lane and where to acquire
        them.
      </>
    ),
    link: "early_ship_recommendations",
    image: "images/misc/early_ship_recs_cover.png",
  },
  {
    title: "Equipment Guide",
    author: "Samheart564",
    date: "9/5/2024",
    revision: "1.15.0",
    description: (
      <>
        Goes over the optimal equipment to use in Azur Lane, in an easy-to-read
        image format!
      </>
    ),
    link: "equipment",
    image: "images/misc/equipment_guide_cover.png",
  },
  {
    title: "Farming Guide",
    author: "Samheart564",
    date: "9/5/2024",
    revision: "1.1.1",
    description: <>Goes over the optimal ways to farm in Azur Lane.</>,
    link: "farming",
    image: "images/misc/farming_guide_cover.jpg",
  },
  {
    title: "Fleetbuilding Guide",
    author: "Samheart564",
    date: "9/5/2024",
    revision: "1.12.0",
    description: (
      <>
        Goes over how to make fleets for both Campaign and{" "}
        <a
          href="https://azurlane.koumakan.jp/wiki/Operation Siren"
          target="_blank"
          rel="noopener noreferrer"
        >
          Operation Siren
        </a>{" "}
        in Azur Lane.
      </>
    ),
    link: "fleetbuilding",
    image: "images/misc/fleetbuilding_guide_cover.png",
  },
  {
    title: "Fleet Technology Guide",
    author: "Samheart564",
    date: "9/5/2024",
    revision: "1.1.1",
    description: (
      <>
        Goes over the{" "}
        <a
          href="https://azurlane.koumakan.jp/wiki/Fleet_Technology"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fleet Technology
        </a>{" "}
        mechanics and how to get Tech Points in Azur Lane.
      </>
    ),
    link: "fleet_technology",
    image: "images/misc/no_cover.jpg",
  },
  {
    title: "Newbie Tips",
    author: "Riceist, Samheart564",
    date: "9/5/2024",
    revision: "1.1.4",
    description: (
      <>Goes over basic advice and mistakes to avoid for new players!</>
    ),
    link: "newbie_tips",
    image: "images/misc/no_cover.jpg",
  },
  {
    title: "Research Guide",
    author: "Samheart564",
    date: "9/5/2024",
    revision: "1.5.1",
    description: (
      <>
        Goes over the{" "}
        <a
          href="https://azurlane.koumakan.jp/wiki/Research"
          target="_blank"
          rel="noopener noreferrer"
        >
          Research
        </a>{" "}
        mechanics in Azur Lane, including optimal Research Projects to take, and
        how Catchup / Coin-up work.
      </>
    ),
    link: "research",
    image: "images/misc/research_guide_cover.jpg",
  },
  {
    title: "Samvaluations",
    author: "Samheart564",
    date: "9/5/2024",
    revision: "1.12.0",
    description: <>Compiled list of all my ship reviews!</>,
    link: "samvaluation",
    image: "images/misc/no_cover.jpg",
  },
  {
    title: "Shop Priority Guide",
    author: "Riceist, Samheart564",
    date: "9/5/2024",
    revision: "1.7.1",
    description: (
      <>
        Goes over all the permanent shops in Azur Lane, and what to obtain from
        them.
      </>
    ),
    link: "shop_priority",
    image: "images/misc/no_cover.jpg",
  },
]

export const GuideDescriptions: React.FC = () => {
  return (
    <div id="images" className="d-none d-sm-block">
      <div className="row">
        {guides.map((guide, index) => (
          <div
            key={index}
            className="mt-3 mt-sm-0 text-align-left gridcell-list-style col-12 col-sm-12"
          >
            <div className="row mt-1">
              <div className="col-auto">
                <a href={guide.link} target="_self" rel="noopener noreferrer">
                  <img
                    className="img-fluid rounded shadow-lg height-100px d-inline-block align-bottom"
                    src={guide.image}
                    alt={`${guide.title} cover`}
                  />
                </a>
              </div>
              <div className="col text-wrap">
                <a href={guide.link} target="_self" rel="noopener noreferrer">
                  <div className="d-block text-uppercase font-weight-bold mb-4 guide-title gridcell-title">
                    {guide.title}
                  </div>
                </a>
                <small className="d-block mb-4 mod-gridcell-details-style text-align-left margin-0;">
                  <i className="fa fa-pencil-alt" /> {guide.author} <br />
                  <i className="fa fa-sync" /> {guide.date} <br />
                  Revision {guide.revision}
                </small>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="guide-text">
                  <br />
                  <p>{guide.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
