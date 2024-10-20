import { useState, useEffect, useRef } from "react"

import { navbarPages, MobileNavItem, NavItem } from "../Navbar"

import "./styles.css"

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
            href={`/test_ecgc_2/`}
            className="flex items-center text-white hover:bg-white/15"
          >
            <img
              src="/test_ecgc_2/images/misc/SiteIcon.png"
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
