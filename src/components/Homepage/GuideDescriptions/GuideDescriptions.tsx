import React from "react"

import { pageInfo } from "@components/_common/PageInfo"

import "./styles.css"

export const GuideDescriptions: React.FC = () => {
  const guides = pageInfo.filter((guide) => guide.title)

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
