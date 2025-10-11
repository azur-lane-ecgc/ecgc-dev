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

  const collapseAll = () => {
    setIsNavCollapsed(true)
    setActiveDropdown(null)
  }

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

  // testing automatically closing on window size
  // RESULT: performance hit is real. will come back later

  // const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  // useEffect(() => {
  //   const handleResize = () => {
  //     const currentWidth = window.innerWidth
  //     const prevWidth = windowWidth

  //     if (
  //       (prevWidth < 768 && currentWidth >= 768) ||
  //       (prevWidth >= 768 && currentWidth < 768)
  //     ) {
  //       collapseAll()
  //     }

  //     setWindowWidth(currentWidth)
  //   }

  //   window.addEventListener("resize", handleResize)

  //   handleResize()

  //   return () => {
  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [windowWidth])

  return (
    <>
      <nav className="sticky top-0 z-[70] bg-[#222a42] text-white">
        <div className="container mx-auto py-2">
          <div className="flex h-[40px] items-center justify-between">
            <a
              aria-label="site-icon"
              href={`/`}
              className="flex items-center text-white hover:bg-white/15"
            >
              <img
                src="/images/misc/SiteIcon.png"
                width="40"
                alt="ECGC"
                className="mr-2"
              />
            </a>
            {/* Desktop Nav Items */}
            <div className="hidden items-center md:flex">
              {navbarPages.map((page, index) => (
                <NavItem key={index} page={page} activePage={activePage} />
              ))}
            </div>
            {/* Mobile Menu Button */}
            <button
              className="flex items-center justify-center rounded p-2 text-white hover:bg-white/15 hover:shadow-lg focus:outline-none md:hidden"
              onClick={toggleNavCollapse}
            >
              <i className="fas fa-bars text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          ref={dropdownRef}
          className={`absolute left-0 top-[47px] z-[71] w-full overflow-hidden bg-[#222a42] transition-[max-height] duration-300 ease-in-out md:hidden ${
            isNavCollapsed ? "max-h-0" : "max-h-screen"
          }`}
        >
          <div className="container mx-auto space-y-1 pb-3 pt-2">
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
      {!isNavCollapsed && (
        <div
          className={`fixed left-0 top-0 z-[69] h-full w-full bg-black/40 md:hidden`}
          aria-hidden="true"
          onClick={collapseAll}
        />
      )}
    </>
  )
}
