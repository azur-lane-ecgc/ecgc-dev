import React from "react"

import { pageInfo } from "@components/_common/PageInfo"

import "./styles.css"

export const GuideDescriptions: React.FC = () => {
  const guides = pageInfo.filter((guide) => guide.title)

  return (
    <>
      {/* Images w/ Description */}
      <div id="images" className="hidden md:block">
        <div className="-mx-3 flex flex-wrap">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="gridcell-list-style mt-3 w-full px-3 text-left sm:mt-0"
            >
              <div className="mt-1 flex">
                <div className="w-[80px] shrink-0">
                  <a href={guide.link} target="_self" rel="noopener noreferrer">
                    <img
                      loading="lazy"
                      className="h-[100px] rounded object-cover shadow-lg"
                      src={guide.image}
                      alt={`${guide.title} cover`}
                    />
                  </a>
                </div>
                <div className="ml-4 mt-1 grow">
                  <a href={guide.link} target="_self" rel="noopener noreferrer">
                    <div className="guide-title mb-4 text-sm font-bold uppercase">
                      {guide.title}
                    </div>
                  </a>
                  <div className="mod-gridcell-details-style mb-4 text-xs text-gray-600">
                    <div>
                      <i className="fas fa-pencil-alt mr-1" />
                      &#8201;
                      {guide.authors.length > 0
                        ? guide.authors.map((author, index) => (
                            <span key={index}>
                              {author}
                              {index < guide.authors.length - 1 ? ", " : ""}
                            </span>
                          ))
                        : false}
                    </div>

                    <div>
                      <i className="fas fa-sync mr-1" />
                      &#8201;{guide.lastUpdated}
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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {guides.map((guide, index) => (
            <div key={index} className="mt-5 text-center">
              <a
                href={guide.link}
                target="_self"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  loading="lazy"
                  className="mx-auto h-[200px] w-[150px] rounded object-cover shadow-lg"
                  src={guide.image}
                  alt={guide.title}
                />
                <div className="gridcell-title guide-title mb-4 mt-2 text-[95%] font-bold uppercase">
                  {guide.title}
                </div>
              </a>
              <div className="gridcell-details-style-2 mb-4 text-[80%]">
                <div>
                  <i className="fas fa-pencil-alt mr-1" />
                  {guide.authors.length > 0
                    ? guide.authors.map((author, index) => (
                        <span key={index}>
                          {author}
                          {index < guide.authors.length - 1 ? ", " : ""}
                        </span>
                      ))
                    : false}
                </div>
                <div>
                  <i className="fas fa-sync mr-1" />
                  {guide.lastUpdated}
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
