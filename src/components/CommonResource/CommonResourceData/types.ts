export interface LocationProps {
  found: boolean
  locations?: {
    name: string
    wikiLink: string
    quantity: {
      amount: number | "RNG"
      timeFrame:
        | "one-time"
        | "daily"
        | "weekly"
        | "twice-monthly"
        | "monthly"
        | "bimonthly"
        | "cycle"
        | null
    }
    notes?: string
  }[]
  checkMark: {
    color: "red" | "green" | "sand"
    mark: "check" | "x"
    optimal?: boolean
  }
}

export interface ResourceProps {
  name: string
  rarity: number
  image: string
  wikiLink: string
  drops: {
    academy?: LocationProps
    missions?: LocationProps
    dailyRaid?: LocationProps
    cruisePass?: LocationProps

    campaignDrop?: LocationProps
    hardModeDrop?: LocationProps
    eventDrop?: LocationProps
    opsi?: LocationProps

    generalShop?: LocationProps
    coreDataShop?: LocationProps
    guildShop?: LocationProps
    meritShop?: LocationProps

    medalShop?: LocationProps
    prototypeShop?: LocationProps
    eventShop?: LocationProps
    metaShop?: LocationProps
  }
  total: {
    bimonthly: number
    monthly: number
    weekly: number
    daily: number
  }
}
