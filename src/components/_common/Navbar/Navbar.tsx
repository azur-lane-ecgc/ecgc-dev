import React, { useState, useEffect, useRef } from "react"

import "./styles.css"

interface DropdownItem {
  name: string
  href: string
}

interface NavbarPage {
  name: string
  href?: string
  icon: string
  isDropdown?: boolean
  dropdownItems?: DropdownItem[]
  external?: boolean
  hiddenOnLarge?: boolean
}
const navbarPages: NavbarPage[] = [
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

interface NavItemProps {
  page: NavbarPage
  activePage?: string | null
}
const NavItem: React.FC<NavItemProps> = ({ page, activePage }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  if (page.isDropdown) {
    return (
      <div className="relative group" ref={dropdownRef}>
        <button
          className={`navbar-link flex items-center px-3 py-2 rounded-md text-base font-medium text-white
            ${
              activePage === page.href ? "navbar-active" : ""
            } transition-colors duration-200`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className={`fas ${page.icon} mr-1`}></i>
          <span>
            {page.name}{" "}
            <i
              className={`fas ${isOpen ? `fa-chevron-up` : `fa-chevron-down`} ml-1 text-xs`}
            ></i>
          </span>
        </button>
        {isOpen && (
          <div className="absolute left-0 mt-2 min-w-fit rounded-md shadow-lg bg-[#222a42] ring-1 ring-black ring-opacity-5 z-50">
            <div
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
              className="whitespace-nowrap py-1"
            >
              {page.dropdownItems?.map((item, idx) => (
                <a
                  key={idx}
                  href={`./${item.href}`}
                  className={`block px-3 py-1 text-[1rem]
                    ${
                      activePage === item.href
                        ? "bg-white/15"
                        : "hover:bg-white/15 hover:text-cyan-400"
                    } transition-colors duration-200`}
                  role="menuitem"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <a
      href={`./${page.href}`}
      className={`navbar-link flex items-center px-2 py-2 rounded-md text-base font-medium min-h-[40px]
        ${
          activePage === page.href ? "navbar-active" : ""
        } transition-colors duration-200`}
      target={page.external ? "_blank" : "_self"}
      rel="noopener noreferrer"
    >
      <i className={`fas ${page.icon} ${page.hiddenOnLarge ? "" : "mr-2"}`}></i>
      <span className={`${page.hiddenOnLarge ? "hidden" : ""}`}>
        {page.name}
      </span>
    </a>
  )
}

interface MobileNavItemProps {
  page: NavbarPage
  activePage?: string | null
  activeDropdown?: string | null
  toggleDropdown: (dropdown: string) => void
}
const MobileNavItem: React.FC<MobileNavItemProps> = ({
  page,
  activePage,
  activeDropdown,
  toggleDropdown,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (page.isDropdown) {
    return (
      <div>
        <button
          className={`navbar-link w-full text-left px-3 py-2 rounded-md text-base font-medium text-white
            ${
              activePage === page.href ? "navbar-active" : ""
            } transition-max-height duration-300 ease-in-out`}
          onClick={() => {
            toggleDropdown(page.name.toLowerCase())
            setIsOpen(!isOpen)
          }}
        >
          <i className={`fas ${page.icon} mr-1`}></i>
          <span>
            {page.name}{" "}
            <i
              className={`fas ${isOpen ? `fa-chevron-up` : `fa-chevron-down`} ml-1 text-xs`}
            ></i>
          </span>
        </button>
        {activeDropdown === page.name.toLowerCase() && (
          <div className="pl-4">
            {page.dropdownItems?.map((item, idx) => (
              <a
                key={idx}
                href={`./${item.href}`}
                className={`block px-3 py-2 rounded-md text-base font-normal
                  ${
                    activePage === item.href
                      ? "bg-white/15"
                      : "hover:bg-white/15 hover:text-cyan-400"
                  } transition-max-height duration-300 ease-in-out`}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <a
      href={`./${page.href}`}
      className={`navbar-link flex items-center px-3 py-2 rounded-md text-base font-medium no-underline
        ${
          activePage === page.href ? "navbar-active" : ""
        } transition-max-height duration-300 ease-in-out`}
      target={page.external ? "_blank" : "_self"}
      rel="noopener noreferrer"
    >
      <i className={`fas ${page.icon} mr-1`}></i>
      {page.name}
    </a>
  )
}

interface NavbarProps {
  activePage?: string | null
}
export const Navbar: React.FC<NavbarProps> = ({ activePage = "" }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const toggleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed)
  }

  const toggleDropdown = (index: string) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  useEffect(() => {
    if (dropdownRef.current) {
      dropdownRef.current.style.maxHeight = isNavCollapsed
        ? "0px"
        : `${dropdownRef.current.scrollHeight}px`
    }
  }, [isNavCollapsed, activeDropdown])

  return (
    <nav className="z-[999] sticky top-0 bg-[#222a42] text-white">
      <div className="container mx-auto py-2">
        <div className="flex items-center justify-between h-[40px]">
          <a
            href="./"
            className="flex items-center text-white hover:bg-white/15"
          >
            <img
              src="./images/misc/SiteIcon.png"
              width="40"
              alt="ECGC"
              className="mr-2"
            />
          </a>
          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center">
            {navbarPages.map((page, index) => (
              <NavItem key={index} page={page} activePage={activePage} />
            ))}
          </div>
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white focus:outline-none hover:bg-white/15 p-2 rounded hover:shadow-lg flex items-center justify-center"
            onClick={toggleNavCollapse}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        ref={dropdownRef}
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isNavCollapsed ? "max-h-0" : "max-h-screen"
        }`}
      >
        <div className="container mx-auto pt-2 pb-3 space-y-1">
          {navbarPages.map((page, index) => (
            <MobileNavItem
              key={index}
              page={page}
              activePage={activePage}
              activeDropdown={activeDropdown}
              toggleDropdown={toggleDropdown}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
