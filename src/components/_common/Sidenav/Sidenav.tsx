import React, { useEffect, useState } from "react"

import { HR } from "@components/_common/HR"

import "./styles.css"

interface SidenavProps {
  page?: string
}

export const Sidenav: React.FC<SidenavProps> = ({ page = "" }) => {
  const [isToggle, setToggle] = useState(false)
  const [isSidenavCollapse, setSidenavCollapse] = useState(false)

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
      {/* <!-- Table of Contents (SideNav) --> */}
      <button
        id="sidenavButton"
        className={`btn custom-sidenav-button z-30 ${isToggle ? "toggle" : ""} ${isSidenavCollapse ? "custom-sidenav-collapse" : ""}`}
        onClick={toggleFunction}
      >
        <i id="sidenavToggleUp" className="fa fa-angle-double-up"></i>
        <i id="sidenavToggleDown" className="fa fa-angle-double-down"></i>
        <span className="btn-text hidden md:inline"> Table of Contents</span>
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
          <div className="toc">
            <p>Filler</p>
          </div>
        </div>
      </div>
    </>
  )
}
