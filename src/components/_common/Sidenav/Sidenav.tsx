import React, { useEffect, useState } from "react"

import { HR } from "@components/_common/HR"

import "./styles.css"

interface SidenavProps {
  page?: string
}

export const Sidenav: React.FC<SidenavProps> = ({ page = "" }) => {
  const toggleFunction = () => {
    var sidenav = document.getElementById("sidenav")
    var sidenavButton = document.getElementById("sidenavButton")
    var main = document.getElementById("main")

    if (window.innerWidth >= 1000) {
      sidenav?.classList.toggle("custom-sidenav-collapse")
      sidenavButton?.classList.toggle("custom-sidenav-collapse")
      main?.classList.toggle("custom-sidenav-collapse")

      if (
        sidenav?.classList.contains("toggle") &&
        sidenav?.classList.contains("custom-sidenav-collapse")
      ) {
        sidenav?.classList.remove("toggle")
        sidenavButton?.classList.remove("toggle")
      }
    } else {
      sidenav?.classList.toggle("toggle")
      sidenavButton?.classList.toggle("toggle")

      if (
        sidenav?.classList.contains("custom-sidenav-collapse") &&
        sidenav?.classList.contains("toggle")
      ) {
        sidenav?.classList.remove("custom-sidenav-collapse")
        sidenavButton?.classList.remove("custom-sidenav-collapse")
        main?.classList.remove("custom-sidenav-collapse")
      }
    }
  }

  const smToggleFunction = () => {
    if (window.innerWidth < 1000) {
      toggleFunction()
    }
  }

  return (
    <>
      {/* <!-- Table of Contents (SideNav) --> */}
      <button
        id="sidenavButton"
        className="btn custom-sidenav-button z-30"
        onClick={toggleFunction}
      >
        <i id="sidenavToggleUp" className="fa fa-angle-double-up"></i>
        <i id="sidenavToggleDown" className="fa fa-angle-double-down"></i>
        <span className="btn-text hidden md:inline"> Table of Contents</span>
      </button>

      <div id="sidenav" className="sidenav overflow-auto">
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
