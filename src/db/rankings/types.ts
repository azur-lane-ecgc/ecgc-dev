interface BaseFleetRankingProps {
  notes?: string | null
  nameNote?: string | null

  // Rank
  hardarbiter: string
  cm: string

  // Usage
  consistency?: number | null
  fleetreq?: number | null
  gearreq?: number | null

  // Offense
  lightdmg: number
  mediumdmg: number
  heavydmg: number
  offensivebuff?: number | null
}

export interface MainFleetRankingProps extends BaseFleetRankingProps {
  // Rank
  meta: string
  w14mob: string
  w14boss: string
  w15mob: string
  w15boss: string
  ex: string

  // Usage
  flagreq?: number | null

  // Offense
  aoedmg: number
  dmguptime?: number | null

  // Defense
  selfsurvival?: number | null
  aa?: number | null
  rammers?: number | null
  othermain?: number | null
  vgsurvival?: number | null
}

export interface VanguardFleetRankingProps extends BaseFleetRankingProps {
  // Rank
  meta: string
  w14mob: string
  w14boss: string
  w15mob: string
  w15boss: string
  ex: string

  // Offense
  aoedmg: number

  // Defense
  selfsurvival?: number | null
  aa?: number | null
  asw?: number | null
  defensivebuff?: number | null
}

export interface SSFleetRankingProps extends BaseFleetRankingProps {
  // Rank
  campaign?: string | null

  // Usage
  flagreq?: number | null
}
