export const getCellColor = (color: string | undefined | null) => {
  let colorClass = "relative "

  switch (color) {
    case "red":
      colorClass += "!bg-[lightcoral] hover:!bg-[#c75e5e]"
      break
    case "green":
      colorClass += "!bg-[palegreen]/90 hover:!bg-[#5bc95b]"
      break
    case "sand":
      colorClass += "!bg-[lemonchiffon]/95 hover:!bg-[rgba(199,193,136,0.9)]"
      break
    default:
      colorClass += "!bg-[lightcoral] hover:!bg-[#c75e5e]"
  }

  return colorClass
}
