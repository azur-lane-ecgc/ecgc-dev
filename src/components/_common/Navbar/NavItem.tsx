import { useState, useEffect, useRef } from "react"

import type { NavbarPage } from "./navbarPages"

interface NavItemProps {
  page: NavbarPage
  activePage?: string | null
}
export const NavItem: React.FC<NavItemProps> = ({ page, activePage }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const dropdownActive =
    page.isDropdown &&
    page.dropdownItems?.find((item) => item.href === activePage)

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
      <div className="group relative" ref={dropdownRef}>
        <button
          className={`navbar-link flex items-center rounded-md px-3 py-2 text-base font-medium text-white ${
            dropdownActive ? "navbar-active" : ""
          } transition-colors duration-200`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className={`fas ${page.icon} mr-1`} />
          <span>
            {page.name}{" "}
            <i
              className={`fas ${
                isOpen ? `fa-chevron-up` : `fa-chevron-down`
              } ml-1 text-xs`}
            />
          </span>
        </button>
        {isOpen && (
          <div className="absolute left-0 z-[70] mt-2 min-w-fit rounded-md bg-[#222a42] shadow-lg ring-1 ring-black/5">
            <div
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
              className="whitespace-nowrap py-1"
            >
              {page.dropdownItems?.map((item, idx) => (
                <a
                  aria-label={item.href}
                  key={idx}
                  href={item?.external ? `${item.href}` : `/${item.href}`}
                  className={`block px-3 py-1 text-[1rem] ${
                    activePage === item.href ? "navbar-active !text-white" : ""
                  } transition-colors duration-200 hover:!bg-white/15 hover:text-cyan-400`}
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
      aria-label={page.href}
      href={page?.external ? `${page.href}` : `/${page.href}`}
      className={`navbar-link flex min-h-[40px] items-center rounded-md px-2 py-2 text-base font-medium ${
        activePage === page.href ? "navbar-active" : ""
      } transition-colors duration-200`}
      target={page.external ? "_blank" : "_self"}
      rel="noopener noreferrer"
    >
      <i className={`fas ${page.icon} ${page.hiddenOnLarge ? "" : "mr-2"}`} />
      <span className={`${page.hiddenOnLarge ? "hidden" : ""}`}>
        {page.name}
      </span>
    </a>
  )
}
