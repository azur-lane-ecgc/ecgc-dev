import { useState } from "react"

import { HR } from "@components/_common/HR"
import { TocLink } from "./TocLink"
import globalTOC from "./TocContent.json"

import "./styles.css"

interface SidenavProps {
  page?: string
}

interface TocContentType {
  id: string
  content: string
  subheadings: {
    id: string
    content: string
  }[]
}

export const Sidenav: React.FC<SidenavProps> = ({ page = "" }) => {
  const [isToggle, setToggle] = useState(false)
  const [isSidenavCollapse, setSidenavCollapse] = useState(false)

  const TocContent: TocContentType[] =
    globalTOC.find((file) => file.fileName === page)?.toc || []

  const toggleFunction = () => {
    var main = document.getElementById("main")

    if (window.innerWidth >= 1016) {
      main?.classList.toggle("custom-sidenav-collapse")
      setSidenavCollapse((isSidenavCollapse) => !isSidenavCollapse)

      if (isToggle && isSidenavCollapse) {
        setToggle((isToggle) => !isToggle)
      }
    } else {
      setToggle((isToggle) => !isToggle)

      if (isToggle && isSidenavCollapse) {
        main?.classList.remove("custom-sidenav-collapse")
        setSidenavCollapse((isSidenavCollapse) => !isSidenavCollapse)
      }
    }
  }

  const smToggleFunction = () => {
    if (window.innerWidth < 1016) {
      toggleFunction()
    }
  }

  return (
    <>
      {/* <!-- Overlay --> */}
      {isToggle && window.innerWidth < 1016 && (
        <div className="overlay visible" onClick={toggleFunction}></div>
      )}

      {/* <!-- Table of Contents (SideNav) --> */}
      <button
        id="sidenavButton"
        className={`btn custom-sidenav-button ${isToggle ? "toggle" : ""} ${isSidenavCollapse ? "custom-sidenav-collapse" : ""}`}
        onClick={toggleFunction}
      >
        <i id="sidenavToggleUp" className="fa fa-angle-double-up" />
        <i id="sidenavToggleDown" className="fa fa-angle-double-down" />
        <span className="sidenav-btn-text hidden md:inline">
          {" "}
          Table of Contents
        </span>
      </button>

      <div
        id="sidenav"
        className={`sidenav overflow-auto ${isToggle ? "toggle" : ""} ${isSidenavCollapse ? "custom-sidenav-collapse" : ""}`}
      >
        <div className="container m-auto">
          <span className="block md:hidden sidenav-header">
            <h2 className="text-center">Table of Contents</h2>
            <HR />
          </span>
          {TocContent.length > 0 && (
            <div className="toc">
              <ol>
                {TocContent.map((tocLink) => (
                  <li key={tocLink.id}>
                    <TocLink
                      id={tocLink.id}
                      level={1}
                      onClick={smToggleFunction}
                    >
                      {tocLink.content}
                    </TocLink>
                    {tocLink.subheadings.length > 0 && (
                      <ol>
                        {tocLink.subheadings.map((tocLinkSubheading) => (
                          <li key={tocLinkSubheading.id}>
                            <TocLink
                              id={tocLinkSubheading.id}
                              level={2}
                              onClick={smToggleFunction}
                            >
                              {tocLinkSubheading.content}
                            </TocLink>
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
