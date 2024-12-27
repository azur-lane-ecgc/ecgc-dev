interface DropdownItem {
  name: string
  href: string
  external?: boolean
}

export interface NavbarPage {
  name: string
  href?: string
  icon: string
  isDropdown?: boolean
  dropdownItems?: DropdownItem[]
  external?: boolean
  hiddenOnLarge?: boolean
}
export const navbarPages: NavbarPage[] = [
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
