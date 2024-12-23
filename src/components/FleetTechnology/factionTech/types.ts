export interface FleetTechData {
  faction: string
  thresholds: {
    ship: string
    techPoints: number
    note?: string
  }[]
  data: {
    ship: string
    location: {
      event: string
      stages: string[]
    }[]
    investment: string
    techPoints: number
    isShipyard: boolean
  }[]
}
