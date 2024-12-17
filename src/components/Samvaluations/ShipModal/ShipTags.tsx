import { useState } from "react"

import { RoleIcons } from "./RoleIcons"

interface ShipTags {
  hullType: string
  faction: string
  roles: string[]
}

export const ShipTags: React.FC<ShipTags> = ({ hullType, faction, roles }) => {
  const [roleDropdownOpen, setRoleDropdown] = useState(false)

  return (
    <>
      {/* Small Screen Tag Trigger */}
      <button
        onClick={() => setRoleDropdown(!roleDropdownOpen)}
        className={`absolute top-2 left-2 text-base flex items-center space-x-2 ${roleDropdownOpen ? "text-green-600" : "text-cyan-400"} hover:text-green-600 md:hidden`}
      >
        <span>Tags</span>
        <i
          className={`fa-solid translate-y-[1px] ${roleDropdownOpen ? "fa-angle-up" : "fa-angle-down"}`}
        />
      </button>
      {/* Tags (Smaller Screen) */}
      {roleDropdownOpen && (
        <div className="bg-ecgc-secondary absolute md:hidden text-center top-[40px] left-0 w-[160px] border-l border-r border-t border-b-transparent border-gray-500 shadow-lg overflow-y-auto max-h-[200px] z-50">
          {/* Faction Icon */}
          <div className="w-full flex justify-between border-b border-gray-600 py-1 px-5">
            <span className="w-[40px] h-[40px] overflow-hidden relative inline-block">
              <img
                loading="lazy"
                src={`/test_ecgc_2/images/faction/${faction}.png`}
                alt={`${faction}`}
                className="absolute top-0 left-0 w-full h-auto"
              />{" "}
            </span>
            <span className="flex items-center justify-center fake-modal-link">
              {faction}
            </span>
          </div>

          {/* HullType Icon */}
          <div className="w-full flex justify-between border-b border-gray-600 py-1 px-5">
            <span className="w-[40px] h-[40px] flex items-center justify-center overflow-hidden relative">
              <img
                loading="lazy"
                src={`/test_ecgc_2/images/ship_type/${hullType}.png`}
                alt={`${hullType}`}
                className="w-full h-full object-contain"
              />
            </span>
            <span className="flex items-center justify-center fake-modal-link">
              {hullType}
            </span>
          </div>

          {/* Role Icons */}
          {roles.map((role) => (
            <div
              key={role}
              className="w-full flex justify-between border-b border-gray-600 py-1 px-5"
            >
              <span className="w-[40px] h-[40px] flex items-center justify-center overflow-hidden relative">
                {RoleIcons[role]}
              </span>
              <span className="flex items-center justify-center fake-modal-link">
                {role}
              </span>
            </div>
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
