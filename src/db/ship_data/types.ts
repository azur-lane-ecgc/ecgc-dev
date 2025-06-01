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
  hullType: string
  fleetType: "main" | "ss" | "vg"
  LBBonus: string | null
  slots: SlotProps[]
  augments: string[] | null
  samEval?: string
  fastLoad: {
    text: string
    reduction: number
    quantity: number
    conditional: string
  } | null
  roles: string[]
  locations: ShipLocationData
  permanent: {
    isPermanent: boolean
    isCollab: boolean
  }
}
