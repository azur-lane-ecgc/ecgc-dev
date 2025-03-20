import { useState } from "react"
import type { ReactNode } from "react"

import "./styles.css"

interface SidenavProps {
  children: ReactNode
}

export const Sidenav: React.FC<SidenavProps> = ({ children }) => {
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

  return (
    <>
      {/* <!-- Overlay --> */}
      {isToggle && window.innerWidth < 1016 && (
        <div className="overlay visible" onClick={toggleFunction}></div>
      )}

      {/* <!-- Table of Contents (SideNav) --> */}
      <button
        id="sidenavButton"
        className={`btn custom-sidenav-button ${isToggle ? "toggle" : ""} ${
          isSidenavCollapse ? "custom-sidenav-collapse" : ""
        }`}
        onClick={toggleFunction}
      >
        <i id="sidenavToggleUp" className="fa fa-angle-double-up" />
        <i id="sidenavToggleDown" className="fa fa-angle-double-down" />
        <span className="sidenav-btn-text hidden md:inline">
          Table of Contents
        </span>
      </button>

      {/* Internal Sidenav Content */}
      <div
        id="sidenav"
        className={`sidenav overflow-auto ${isToggle ? "toggle" : ""} ${
          isSidenavCollapse ? "custom-sidenav-collapse" : ""
        }`}
      >
        <div className="container m-auto">{children}</div>
      </div>
    </>
  )
}
