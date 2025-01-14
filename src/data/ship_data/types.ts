export interface SlotProps {
  type: string[]
  efficiency: number
  mounts: number
}

export interface shipLocation {
  name: string
  href: string
}

export interface ShipLocationData {
  events: shipLocation[]
  other: shipLocation[]
  construction: shipLocation[]
  permanent: shipLocation[]
}

export interface ShipData {
  id: number
  ship: string
  faction: string
  rarity: number
  isKai: boolean
  hull: number
  hullType: string
  fleetType: "main" | "ss" | "vg"
  limitBreakBonus: string | null
  slots: SlotProps[]
  augments: string[] | null
  samvaluationText?: string
  fastLoad: string
  roles: string[]
  locations: ShipLocationData
}
