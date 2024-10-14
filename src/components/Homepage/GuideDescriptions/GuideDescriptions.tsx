import React from "react"

import "./styles.css"

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
    title: "Early Ship Recommendations",
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
    <>
      {/* Images w/ Description */}
      <div id="images" className="hidden md:block">
        <div className="flex flex-wrap -mx-3">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="w-full px-3 mt-3 sm:mt-0 text-left gridcell-list-style"
            >
              <div className="flex mt-1">
                <div className="flex-shrink-0 w-[80px]">
                  <a href={guide.link} target="_self" rel="noopener noreferrer">
                    <img
                      className="h-[100px] rounded shadow-lg object-cover"
                      src={guide.image}
                      alt={`${guide.title} cover`}
                    />
                  </a>
                </div>
                <div className="ml-4 flex-grow mt-1">
                  <a href={guide.link} target="_self" rel="noopener noreferrer">
                    <div className="text-sm font-bold uppercase mb-4 guide-title">
                      {guide.title}
                    </div>
                  </a>
                  <div className="text-xs mb-4 text-gray-600 mod-gridcell-details-style">
                    <div>
                      <i className="fas fa-pencil-alt mr-1" />
                      &#8201;{guide.author}
                    </div>
                    <div>
                      <i className="fas fa-sync mr-1" />
                      &#8201;{guide.date}
                    </div>
                    <div>Revision {guide.revision}</div>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="guide-text">
                  <br />
                  <p>{guide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Images Only */}
      <div className="block md:hidden" id="images">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {guides.map((guide, index) => (
            <div key={index} className="mt-5 text-center">
              <a
                href={guide.link}
                target="_self"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  className="w-[150px] h-[200px] mx-auto rounded shadow-lg object-cover"
                  src={guide.image}
                  alt={guide.title}
                />
                <div className="gridcell-title guide-title text-[95%] uppercase font-bold mt-2 mb-4">
                  {guide.title}
                </div>
              </a>
              <div className="gridcell-details-style-2 text-[80%] mb-4">
                <div>
                  <i className="fas fa-pencil-alt mr-1" />
                  {guide.author}
                </div>
                <div>
                  <i className="fas fa-sync mr-1" />
                  {guide.date}
                </div>
                <div>Revision {guide.revision}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
