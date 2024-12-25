export const getCellColor = (color: string | undefined | null) => {
  let colorClass = ""

  switch (color) {
    case "red":
      colorClass = "!bg-[lightcoral] hover:!bg-[#c75e5e]"
      break
    case "green":
      colorClass = "!bg-[palegreen] hover:!bg-[#52b352]"
      break
    case "sand":
      colorClass = "!bg-[lemonchiffon] hover:!bg-[#f1e1b3]"
      break
    default:
      colorClass = "!bg-[lightcoral] hover:!bg-[#c75e5e]"
  }

  return colorClass
}
