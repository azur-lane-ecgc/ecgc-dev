import { useState } from "react"

import { RoleIcons } from "./RoleIcon"

interface ShipTags {
  hullType: string
  faction: string
  roles: string[]
}

export const ShipTags: React.FC<ShipTags> = ({ hullType, faction, roles }) => {
  const [roleDropdownOpen, setRoleDropdown] = useState(false)

  const toggleDropdown = () => {
    setRoleDropdown(!roleDropdownOpen)
  }

  return (
    <>
      {/* Small Screen Tag Trigger */}
      <button
        onClick={toggleDropdown}
        className="absolute top-2 left-2 text-base flex items-center space-x-2  text-cyan-400 hover:text-green-600 md:hidden"
      >
        <span>Tags</span>
        <i
          className={`fa-solid translate-y-[1px] ${roleDropdownOpen ? "fa-angle-up" : "fa-angle-down"}`}
        />
      </button>
      {/* Tags (Smaller Screen) */}
      {roleDropdownOpen && (
        <div className="relative md:hidden text-center">
          <span className="w-[40px] h-[40px] overflow-hidden relative inline-block">
            <img
              loading="lazy"
              src={`/test_ecgc_2/images/faction/${faction}.png`}
              alt={`${faction}`}
              className="absolute top-0 left-0 w-full h-auto translate-y-[1px]"
            />
          </span>
          <span className="w-[40px] h-[40px] overflow-hidden relative inline-block">
            <img
              loading="lazy"
              src={`/test_ecgc_2/images/ship_type/${hullType}.png`}
              alt={`${faction}`}
              className="w-full h-auto translate-y-1/2"
            />
          </span>
          {roles.map((role) => (
            <span
              key={role}
              className="w-[40px] h-[40px] overflow-hidden relative inline-block"
            >
              {RoleIcons[role]}
            </span>
          ))}
        </div>
      )}
      {/* Tags (Larger Screen) */}
      <div className="absolute top-0 left-0 transform translate-x-0 hidden md:inline-block">
        <span className="w-[40px] h-[40px] overflow-hidden relative inline-block">
          <img
            loading="lazy"
            src={`/test_ecgc_2/images/faction/${faction}.png`}
            alt={`${faction}`}
            className="absolute top-0 left-0 w-full h-auto translate-y-[1px]"
          />
        </span>
        <span className="w-[40px] h-[40px] overflow-hidden relative inline-block">
          <img
            loading="lazy"
            src={`/test_ecgc_2/images/ship_type/${hullType}.png`}
            alt={`${hullType}`}
            className="w-full h-auto translate-y-1/2"
          />
        </span>
        {roles.map((role) => (
          <span
            key={role}
            className="w-[40px] h-[40px] overflow-hidden relative inline-block"
          >
            {RoleIcons[role]}
          </span>
        ))}
      </div>
    </>
  )
}
