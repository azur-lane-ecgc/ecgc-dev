export const shipDefaultAugmentParse = (hull: number): string[] => {
  switch (hull) {
    case 1:
      return ["Dual Swords", "Hammer"]
    case 2:
      return ["Crossbow", "Sword"]
    case 12:
      return ["Crossbow"]
    case 3:
    case 18:
    case 19:
      return ["Greatsword", "Lance"]
    case 13:
      return ["Lance"]
    case 4:
    case 5:
    case 10:
      return ["Bowgun", "Officer's Sword"]
    case 6:
    case 7:
      return ["Scepter", "Hunting Bow"]
    case 8:
    case 17:
      return ["Kunai", "Dagger"]
    default:
      return []
  }
}
