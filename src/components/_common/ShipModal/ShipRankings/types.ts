export interface ShipRankingTypes {
  ship: string
}

export interface MainFleetRankingProps {
  notes?: string
  nameNote?: string

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
  consistency?: number
  fleetreq?: number
  gearreq?: number
  flagreq?: number

  // Offense
  lightdmg: number
  mediumdmg: number
  heavydmg: number
  aoedmg: number
  dmguptime?: number
  offensivebuff?: number

  // Defense
  selfsurvival?: number
  aa?: number
  rammers?: number
  othermain?: number
  vgsurvival?: number
}

export interface VanguardFleetRankingProps {
  notes?: string
  nameNote?: string

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
  consistency?: number
  fleetreq?: number
  gearreq?: number

  // Offense
  lightdmg: number
  mediumdmg: number
  heavydmg: number
  aoedmg: number
  offensivebuff?: number

  // Defense
  selfsurvival?: number
  aa?: number
  asw?: number
  defensivebuff?: number
}

export interface SSFleetRankingProps {
  notes?: string
  nameNote?: string

  // Rank
  hardarbiter: string
  cm: string
  campaign?: string

  // Usage
  consistency?: number
  fleetreq?: number
  flagreq?: number

  // Offense
  lightdmg: number
  mediumdmg: number
  heavydmg: number
  offensivebuff?: number
}
