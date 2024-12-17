import { useEffect, useState } from "react"

import type { NavbarPage } from "./navbarPages"

interface MobileNavItemProps {
  page: NavbarPage
  activePage?: string | null
  activeDropdown?: string | null
  toggleDropdown: (dropdown: string) => void
}
export const MobileNavItem: React.FC<MobileNavItemProps> = ({
  page,
  activePage,
  activeDropdown,
  toggleDropdown,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (activeDropdown != page.name.toLowerCase()) {
      setIsOpen(false)
    }
  }, [activeDropdown])

  if (page.isDropdown) {
    return (
      <>
        <button
          className={`navbar-link w-full text-left px-3 py-2 rounded-md text-base font-medium text-white
              ${activePage === page.href ? "navbar-active" : ""} `}
          onClick={() => {
            toggleDropdown(page.name.toLowerCase())
            setIsOpen(!isOpen)
          }}
        >
          <i className={`fas ${page.icon} mr-1`} />
          <span>
            {page.name}{" "}
            <i
              className={`fas ${isOpen ? `fa-chevron-up` : `fa-chevron-down`} ml-1 text-xs`}
            />
          </span>
        </button>
        {activeDropdown === page.name.toLowerCase() && (
          <div className="pl-4">
            {page.dropdownItems?.map((item, idx) => (
              <a
                aria-label={item.href}
                key={idx}
                href={`/test_ecgc_2/${item.href}`}
                className={`block px-3 py-2 rounded-md text-base font-normal
                    ${
                      activePage === item.href
                        ? "bg-white/15"
                        : "hover:bg-white/15 hover:text-cyan-400"
                    }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </>
    )
  }

  return (
    <a
      aria-label={page.href}
      href={`/test_ecgc_2/${page.href}`}
      className={`navbar-link flex items-center px-3 py-2 rounded-md text-base font-medium no-underline
          ${activePage === page.href ? "navbar-active" : ""} `}
      target={page.external ? "_blank" : "_self"}
      rel="noopener noreferrer"
    >
      <i className={`fas ${page.icon} mr-1`} />
      {page.name}
    </a>
  )
}
