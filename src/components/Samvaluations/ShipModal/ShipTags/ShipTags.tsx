import { useState } from "react"

import { factionLink } from "@utils/factionLink"
import { hullTypeLink } from "@utils/ships"

import { RoleIcons } from "./RoleIcons"

interface ShipTags {
  hullType: string
  faction: string
  roles: string[]
}

const trimRoles = (roles: string[]): string[] => {
  if (roles.includes("SuperTank") && roles.includes("Tank")) {
    roles = roles.filter((role) => role != "Tank")
  }

  if (roles.includes("FastLoad") && roles.includes("Preload")) {
    roles = roles.filter((role) => role != "FastLoad")
  }

  if (roles.includes("AA") && roles.includes("AACarry")) {
    roles = roles.filter((role) => role != "AA")
  }

  return roles
}

export const ShipTags: React.FC<ShipTags> = ({ hullType, faction, roles }) => {
  const [roleDropdownOpen, setRoleDropdown] = useState(false)
  const displayRoles = trimRoles(roles)

  return (
    <>
      {/* Small Screen Tag Trigger */}
      <button
        onClick={() => setRoleDropdown(!roleDropdownOpen)}
        className={`bg-[#3b444bb9] absolute top-0 left-0 p-[4px] rounded-lg text-base flex items-center space-x-2 border-2 border-gray-400 text-gray-300 ${roleDropdownOpen ? "border-pink-300 text-amber-500" : ""} hover:text-cyan-300 hover:border-amber-500 md:hidden`}
      >
        <i
          className={`fa-solid translate-y-[1px] ${roleDropdownOpen ? "fa-angle-up" : "fa-angle-down"}`}
        />
      </button>

      {/* Tags (Smaller Screen) */}
      <div
        className={`${
          roleDropdownOpen ? "max-h-[500px] border" : "max-h-0 border-0"
        } bg-slate-800 absolute md:hidden text-center top-[31px] left-0 w-[150px] border-gray-400 shadow-2xl overflow-hidden z-50 transition-all ease-in-out duration-300`}
      >
        {/* Faction Icon */}
        <div className="w-full flex justify-between border border-transparent border-b-gray-600 hover:border-[#ffa500] hover:bg-[#3b444bb9] py-1 px-3">
          <span className="w-[40px] h-[40px] overflow-hidden relative inline-block">
            <img
              loading="lazy"
              src={`/test_ecgc_2/images/faction/${faction}.png`}
              alt={faction}
              title={"Faction: " + faction}
              className="absolute top-0 left-0 w-full h-auto"
            />{" "}
          </span>
          <a
            className="flex items-center justify-center fake-modal-link"
            href={factionLink(faction)}
            target="_blank"
            title={"Faction: " + faction}
            aria-label={faction}
          >
            {faction}
          </a>
        </div>

        {/* HullType Icon */}
        <div className="w-full flex justify-between border border-transparent border-b-gray-600 hover:border-[#ffa500] hover:bg-[#3b444bb9] py-1 px-3">
          <span className="w-[40px] h-[40px] flex items-center justify-center overflow-hidden relative">
            <img
              loading="lazy"
              src={`/test_ecgc_2/images/ship_type/${hullType}.png`}
              alt={hullType}
              title={"Hull: " + hullType}
              className="w-full h-full object-contain"
            />
          </span>
          <a
            className="flex items-center justify-center fake-modal-link"
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
            className="w-full flex justify-between border border-transparent border-b-gray-600 hover:border-[#ffa500] hover:bg-[#3b444bb9] py-1 px-3"
          >
            <span
              className="w-[40px] h-[40px] flex items-center justify-center overflow-hidden relative"
              title={role}
            >
              {RoleIcons[role]}
            </span>
            <span
              className="flex items-center justify-center text-white/90 font-bold"
              title={role}
            >
              {role}
            </span>
          </div>
        ))}
      </div>

      {/* Tags (Larger Screen) */}
      <div className="absolute top-0 left-0 transform translate-x-0 hidden md:inline-block">
        <a
          className="w-[40px] h-[40px] overflow-hidden relative inline-block"
          href={factionLink(faction)}
          target="_blank"
          title={"Faction: " + faction}
          aria-label={faction}
        >
          <img
            loading="lazy"
            src={`/test_ecgc_2/images/faction/${faction}.png`}
            alt={faction}
            title={"Faction: " + faction}
            className="absolute top-0 left-0 w-full h-auto translate-y-[1px]"
          />
        </a>
        <a
          className="w-[40px] h-[40px] overflow-hidden relative inline-block"
          href={hullTypeLink(hullType)}
          target="_blank"
          title={"Hull: " + hullType}
          aria-label={hullType}
        >
          <img
            loading="lazy"
            src={`/test_ecgc_2/images/ship_type/${hullType}.png`}
            alt={hullType}
            title={"Hull: " + hullType}
            className="w-full h-auto translate-y-1/2"
          />
        </a>
        {displayRoles.map((role) => (
          <span
            aria-label={role}
            title={role}
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
