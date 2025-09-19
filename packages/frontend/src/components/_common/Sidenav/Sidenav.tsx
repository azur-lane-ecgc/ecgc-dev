import { useState } from "react"
import type { ReactNode } from "react"

import "./styles.css"

interface SidenavProps {
  btnText?: string
  children: ReactNode
}

export const Sidenav: React.FC<SidenavProps> = ({
  btnText = null,
  children,
}) => {
  const [isToggle, setToggle] = useState(false)
  const [isSidenavCollapse, setSidenavCollapse] = useState(false)

  const toggleFunction = () => {
    const main = document.getElementById("main")

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

      {/* <!-- Sidenav Button --> */}
      <button
        id="sidenavButton"
        className={`btn custom-sidenav-button ${isToggle ? "toggle" : ""} ${
          isSidenavCollapse ? "custom-sidenav-collapse" : ""
        }`}
        onClick={toggleFunction}
      >
        <i id="sidenavToggleUp" className="fa fa-angle-double-up" />
        <i id="sidenavToggleDown" className="fa fa-angle-double-down" />
        {btnText && (
          <span className="sidenav-btn-text hidden md:inline">{btnText}</span>
        )}
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
