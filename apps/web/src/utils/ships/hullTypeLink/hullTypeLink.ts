const hullTypeToSection: Record<string, string> = {
  DD: "Destroyer",
  DDGv: "Guided-Missile Destroyer",
  DDGm: "Guided-Missile Destroyer",
  CL: "Light Cruiser",
  CA: "Heavy Cruiser",
  CB: "Large Cruiser",
  BB: "Battleship",
  BC: "Battlecruiser",
  BBV: "Aviation Battleship",
  BM: "Monitor",
  CV: "Aircraft Carrier",
  CVL: "Light Aircraft Carrier",
  SS: "Submarine",
  SSV: "Submarine Carrier",
  AR: "Repair Ship",
  AE: "Munition Ship",
  IXv: "Sailing Frigate (Vanguard)",
  IXm: "Sailing Frigate (Main)",
  IXs: "Sailing Frigate (Submarine)",
}

export const hullTypeLink = (hullType: string): string => {
  const baseURL = "https://azurlane.koumakan.jp/wiki/List_of_Ships_by_Type"

  const section = hullTypeToSection[hullType]
  return section ? `${baseURL}#${encodeURIComponent(section)}` : baseURL
}
