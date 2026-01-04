const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return "th"
  switch (day % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}

export const formatDate = (dateString: string) => {
  const [month, day, year] = dateString.split("/").map(Number)

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const monthName = monthNames[month - 1]
  const daySuffix = getOrdinalSuffix(day)

  return `${monthName} ${day}${daySuffix}, ${year}`
}
