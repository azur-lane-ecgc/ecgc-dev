/*
  Naming Convention:
  <fleet of ship> | <buff receiver> | <buff type> | "Support"
*/

// Main Fleet

const _uniKai = new Set(["Unicorn"])

export const mainHealSupport = new Set([
  "Unicorn",
  "Cowpens",
  "Zuihou",
  "Aquila",
  "Perseus",
  "Ryuuhou",
])

const _mainSmallHealSupport = new Set([
  "Aquila",
  "Volga",
  "Cowpens",
  "Klaudia Valentz",
  // gap between top and bottom
  "Raffaelo",
  "Daisen",
  "Honoka",
])

const _mainAllSlowSupport = new Set([
  "Admiral Nakhimov",
  "August von Parseval",
  "Implacable",
  "Ark Royal",
])

const _mainMainDmgSupport = new Set(["Sovetsky Soyuz", "Alsace"])

const _mainBBDmgSupport = new Set(["Mikasa", "Vanguard"])

const _mainCVDmgSupport = new Set([
  "Shinano",
  "Nagato",
  "Yorktown II",
  "Independence",
  "Kearsarge",
  "AmagiCV",
])

// Vanguard Fleet

const _vgAllDmgSupport = new Set(["Helena", "Aurora", "Z52"])

const _vgBBDmgSupport = new Set(["Plymouth", "Trafalgar"])

const _vgCVDmgSupport = new Set(["Kazagumo", "Sirius"])

const _vgAllSlowSupport = new Set(["Eldridge", "Ägir"])

const _vgVgTRPSupport = new Set([
  "Noshiro",
  "Jintsuu",
  "Jintsuu META",
  "Noshiro μ",
  "Tanikaze",
  "Fubuki",
])

const _vgVgBulkSupport = new Set([
  "Eldridge",
  "Jeanne d'Arc",
  "Napoli",
  "Anchorage",
  "San Francisco",
  "De Zeven Provinciën",
])
