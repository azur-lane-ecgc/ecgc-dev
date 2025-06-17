export const shipLBBonusParse = (
  specificBuff: string | null,
): string | null => {
  switch (specificBuff) {
    case "gnr":
      return "All Out Assault activation requirement halved."
    case "torp":
      return "Reduced torpedo spread."
    case "aux":
      return "+30% stats gained from Auxiliary Equipment."
    default:
      return null
  }
}
