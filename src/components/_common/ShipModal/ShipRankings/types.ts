export interface ShipRankingTypes {
  ship: string
}

export interface MainFleetRankingProps {
  notes?: string | null
  nameNote?: string | null

  // Rank
  hardarbiter: string
  meta: string
  cm: string
  w14mob: string
  w14boss: string
  w15mob: string
  w15boss: string
  ex: string

  // Usage
  consistency?: number | null
  fleetreq?: number | null
  gearreq?: number | null
  flagreq?: number | null

  // Offense
  lightdmg: number
  mediumdmg: number
  heavydmg: number
  aoedmg: number
  dmguptime?: number | null
  offensivebuff?: number | null

  // Defense
  selfsurvival?: number | null
  aa?: number | null
  rammers?: number | null
  othermain?: number | null
  vgsurvival?: number | null
}

export interface VanguardFleetRankingProps {
  notes?: string | null
  nameNote?: string | null

  // Rank
  hardarbiter: string
  meta: string
  cm: string
  w14mob: string
  w14boss: string
  w15mob: string
  w15boss: string
  ex: string

  // Usage
  consistency?: number | null
  fleetreq?: number | null
  gearreq?: number | null

  // Offense
  lightdmg: number
  mediumdmg: number
  heavydmg: number
  aoedmg: number
  offensivebuff?: number | null

  // Defense
  selfsurvival?: number | null
  aa?: number | null
  asw?: number | null
  defensivebuff?: number | null
}

export interface SSFleetRankingProps {
  notes?: string | null
  nameNote?: string | null

  // Rank
  hardarbiter: string
  cm: string
  campaign?: string | null

  // Usage
  consistency?: number | null
  fleetreq?: number | null
  flagreq?: number | null

  // Offense
  lightdmg: number
  mediumdmg: number
  heavydmg: number
  offensivebuff?: number | null
}
