export interface LocationProps {
  found: boolean
  locations?: {
    name: string
    wikiLink: string | null
    quantity: {
      amount: number | "RNG"
      timeFrame:
        | "one-time"
        | "daily"
        | "weekly"
        | "twice-monthly"
        | "monthly"
        | "bimonthly"
        | null
    }
  }[]
}

export interface ResourceProps {
  name: string
  rarity: number
  image: string
  wikiLink: string
  drops?: {
    academy?: LocationProps
    missions?: LocationProps
    dailyRaid?: LocationProps
    cruisePass?: LocationProps
    mapDrop?: LocationProps
    opsi?: LocationProps
    shops?: LocationProps
  }
  total: {
    monthly: number
    weekly: number
    daily: number
  }
}
