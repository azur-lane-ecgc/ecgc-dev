import React, { useState } from "react"
import "./styles.css"

// Define all the pages and their structure in a constant array
const navbarPages = [
  { name: "Newbie Tips", href: "newbie_tips", icon: "fa-lightbulb" },
  {
    name: "Gameplay",
    icon: "fa-ship",
    isDropdown: true,
    dropdownItems: [
      {
        name: "Early Ship Recommendations",
        href: "early_ship_recommendations",
      },
      { name: "Equipment", href: "equipment" },
      { name: "Farming", href: "farming" },
      { name: "Fleetbuilding", href: "fleetbuilding" },
      { name: "Fleet Technology", href: "fleet_technology" },
      { name: "Research", href: "research" },
      { name: "Samvaluations", href: "samvaluation" },
    ],
  },
  {
    name: "Resource",
    icon: "fa-gem",
    isDropdown: true,
    dropdownItems: [
      { name: "Common Resources", href: "common_resource" },
      { name: "Shop Priority", href: "shop_priority" },
    ],
  },
  { name: "Tools", href: "tools", icon: "fa-wrench" },
  {
    name: "Changelog",
    href: "changelog",
    icon: "fa-clock-rotate-left",
    hiddenOnLarge: true,
  },
  {
    name: "Contributors",
    href: "contributors",
    icon: "fa-user-pen",
    hiddenOnLarge: true,
  },
  {
    name: "Discord",
    href: "https://discord.gg/wKJKxq5WQt",
    icon: "fa-brands fa-discord",
    external: true,
    hiddenOnLarge: true,
  },
]

interface NavbarProps {
  activePage?: string | null
}

export const Navbar: React.FC<NavbarProps> = ({ activePage }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)
  const [activeDropdown, setActiveDropdown] = useState("")

  const toggleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed)
  }

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? "" : dropdown)
  }

  return (
    <nav
      className="navbar sticky-top navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#222a42" }}
    >
      <div className="container col-12 col-sm-9">
        {/* Title */}
        <a
          className="navbar-brand nav-logo-custom py-0"
          href="./"
          target="_self"
          rel="noopener noreferrer"
        >
          <img src="images/misc/SiteIcon.png" width="40" alt="ECGC" />
        </a>

        {/* Expand Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavCollapse}
          aria-controls="navbarNavDropdown"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div
          className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`}
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ms-auto md-0 fs-6 nav-pills">
            {navbarPages.map((page, index) => {
              if (page.isDropdown) {
                // Render dropdown
                return (
                  <li className="nav-item dropdown" key={index}>
                    <a
                      className={`nav-link dropdown-toggle nav-logo-custom ${activePage === page.name.toLowerCase() ? "active" : ""}`}
                      role="button"
                      aria-expanded={activeDropdown === page.name.toLowerCase()}
                      onClick={() => toggleDropdown(page.name.toLowerCase())}
                    >
                      <i className={`fa ${page.icon} nav-logo-custom`}></i>{" "}
                      <span>{page.name + " "}</span>
                    </a>
                    <ul
                      className={`dropdown-menu dropdown-menu-dark ${activeDropdown === page.name.toLowerCase() ? "show" : ""}`}
                      style={{ backgroundColor: "#222a42", border: "none" }}
                    >
                      {page.dropdownItems?.map((dropdownItem, idx) => (
                        <li key={idx}>
                          <a
                            className={`dropdown-item custom-nav-hover ${activePage === dropdownItem.href ? "active" : ""}`}
                            href={dropdownItem.href}
                            target="_self"
                            rel="noopener noreferrer"
                          >
                            {dropdownItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              }

              // Render regular navbar item
              return (
                <li className="nav-item" key={index}>
                  <a
                    href={page.href}
                    className={`nav-link nav-logo-custom ${activePage === page.href ? "active" : ""}`}
                    rel="noopener noreferrer"
                    target={page.external ? "_blank" : "_self"}
                    title={page.name}
                  >
                    <i className={`fa ${page.icon} nav-logo-custom`}></i>{" "}
                    <span
                      className={`${page.hiddenOnLarge ? "d-lg-none" : ""}`}
                    >
                      {page.name}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
