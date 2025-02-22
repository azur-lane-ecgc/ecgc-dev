import { useState } from "react"

import { factionLink } from "@utils/factionLink"
import { hullTypeLink } from "@utils/ships"

import { getFactionIcon } from "./FactionIcons"
import { RoleIcons } from "./RoleIcons"

interface ShipTags {
  hullType: string
  faction: string
  roles: string[]
}

const trimRoles = (roles: string[]): string[] => {
  // Super Tank & Tank
  if (roles.includes("SuperTank") && roles.includes("Tank")) {
    roles = roles.filter((role) => role != "Tank")
  }

  // Fast Load & Preload
  if (roles.includes("FastLoad") && roles.includes("Preload")) {
    roles = roles.filter((role) => role != "FastLoad")
  }

  // AA Carry & AA Average
  if (roles.includes("AA") && roles.includes("AACarry")) {
    roles = roles.filter((role) => role != "AA")
  }

  // Strong Damage Dealer & Average Damage Dealer
  if (roles.includes("DmgDealer") && roles.includes("TopDmg")) {
    roles = roles.filter((role) => role != "DmgDealer")
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
        className={`bg-[#3b444bb9] absolute top-0 left-0 p-[4px] rounded-lg text-base flex items-center space-x-2 border-2 border-gray-400 text-gray-300 ${
          roleDropdownOpen ? "border-pink-300 text-amber-500" : ""
        } hover:text-cyan-300 hover:border-amber-500 md:hidden`}
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
        } bg-slate-800 absolute md:hidden text-center top-[31px] left-0 w-[150px] border-gray-400 shadow-2xl overflow-hidden z-50 transition-all ease-in-out duration-300`}
      >
        {/* Faction Icon */}
        <div className="w-full flex justify-between border border-transparent border-b-gray-600 hover:border-[#ffa500] hover:bg-[#3b444bb9] py-1 px-3">
          <span className="w-[40px] h-[40px] flex items-center justify-center overflow-hidden relative">
            {getFactionIcon(faction)}
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
        {/* Faction + Hull Icons */}
        <div className="flex space-x-1 pl-1 mt-1">
          <a
            className="w-[40px] h-[40px] relative overflow-hidden flex items-center justify-center"
            href={factionLink(faction)}
            target="_blank"
            title={"Faction: " + faction}
            aria-label={faction}
          >
            {getFactionIcon(faction)}
          </a>
          <a
            className="w-[40px] h-[40px] relative overflow-hidden flex items-center justify-center"
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
              className="w-full h-auto"
            />
          </a>
        </div>

        {/* Role Icons */}
        <div className="flex pl-1 mt-0.5">
          {displayRoles.map((role) => (
            <div
              aria-label={role}
              title={role}
              key={role}
              className="w-[40px] h-[40px] relative overflow-hidden flex items-center justify-center"
            >
              {RoleIcons[role] || RoleIcons["default"]}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
