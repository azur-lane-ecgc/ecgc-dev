import { useState } from "react"

import { factionLink } from "@utils/factionLink"
import { hullTypeLink, trimRoles } from "@utils/ships"

import { getFactionIcon } from "./FactionIcons"
import { RoleIcons } from "./RoleIcons"

interface ShipTags {
  hullType: string
  faction: string
  roles: string[]
}

export const ShipTags: React.FC<ShipTags> = ({ hullType, faction, roles }) => {
  const [roleDropdownOpen, setRoleDropdown] = useState(false)
  const displayRoles = trimRoles(roles)

  return (
    <>
      {/* Small Screen Tag Trigger */}
      <button
        onClick={() => setRoleDropdown(!roleDropdownOpen)}
        className={`absolute left-0 top-0 flex items-center space-x-2 rounded-lg border-2 border-gray-400 bg-[#3b444bb9] p-[4px] text-base text-gray-300 ${
          roleDropdownOpen ? "border-pink-300 text-amber-500" : ""
        } hover:border-amber-500 hover:text-cyan-300 md:hidden`}
      >
        <i
          className={`fa-solid translate-y-[1px] ${
            roleDropdownOpen ? "fa-angle-up" : "fa-angle-down"
          }`}
        />
      </button>

      {/* Tags (Smaller Screen) */}
      <div
        className={`${
          roleDropdownOpen ? "max-h-[500px] border" : "max-h-0 border-0"
        } absolute left-0 top-[31px] z-50 w-[150px] overflow-hidden border-gray-400 bg-slate-800 text-center shadow-2xl transition-all duration-300 ease-in-out md:hidden`}
      >
        {/* Faction Icon */}
        <div className="flex w-full justify-between border border-transparent border-b-gray-600 px-3 py-1 hover:border-[#ffa500] hover:bg-[#3b444bb9]">
          <span className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden">
            {getFactionIcon(faction)}
          </span>
          <a
            className="fake-modal-link flex items-center justify-center"
            href={factionLink(faction)}
            target="_blank"
            title={"Faction: " + faction}
            aria-label={faction}
          >
            {faction}
          </a>
        </div>

        {/* HullType Icon */}
        <div className="flex w-full justify-between border border-transparent border-b-gray-600 px-3 py-1 hover:border-[#ffa500] hover:bg-[#3b444bb9]">
          <span className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden">
            <img
              loading="lazy"
              src={`/images/ship_type/${hullType}.png`}
              alt={hullType}
              title={"Hull: " + hullType}
              className="h-full w-full object-contain"
            />
          </span>
          <a
            className="fake-modal-link flex items-center justify-center"
            href={hullTypeLink(hullType)}
            target="_blank"
            title={"Hull: " + hullType}
            aria-label={hullType}
          >
            {hullType}
          </a>
        </div>

        {/* Role Icons */}
        {displayRoles.map((role) => (
          <div
            key={role}
            className="flex w-full justify-between border border-transparent border-b-gray-600 px-3 py-1 hover:border-[#ffa500] hover:bg-[#3b444bb9]"
          >
            <span
              className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden"
              title={role}
            >
              {RoleIcons[role]}
            </span>
            <span
              className="flex items-center justify-center font-bold text-white/90"
              title={role}
            >
              {role}
            </span>
          </div>
        ))}
      </div>

      {/* Tags (Larger Screen) */}
      <div className="absolute left-0 top-0 hidden translate-x-0 transform md:inline-block">
        {/* Faction + Hull Icons */}
        <div className="mt-1 flex space-x-1 pl-1">
          <a
            className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden"
            href={factionLink(faction)}
            target="_blank"
            title={"Faction: " + faction}
            aria-label={faction}
          >
            {getFactionIcon(faction)}
          </a>
          <a
            className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden"
            href={hullTypeLink(hullType)}
            target="_blank"
            title={"Hull: " + hullType}
            aria-label={hullType}
          >
            <img
              loading="lazy"
              src={`/images/ship_type/${hullType}.png`}
              alt={hullType}
              title={"Hull: " + hullType}
              className="h-auto w-full"
            />
          </a>
        </div>

        {/* Role Icons */}
        <div className="mt-0.5 flex pl-1">
          {displayRoles.map((role) => (
            <div
              aria-label={role}
              title={role}
              key={role}
              className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden"
            >
              {RoleIcons[role] || RoleIcons["default"]}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
