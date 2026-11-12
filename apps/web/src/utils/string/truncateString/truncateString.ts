export const truncateString = (str: string, maxLen: number): string => {
  if (str.length <= maxLen) {
    return str
  }

  return str.slice(0, maxLen - 3) + "..."
}

export const truncateArray = (arr: string[], maxLen: number) => {
  const sortedString = arr.sort().join(", ")
  const firstElement = sortedString.split(", ")[0]

  if (arr.length === 1) {
    return firstElement.length > maxLen
      ? firstElement.slice(0, maxLen - 3) + "..."
      : firstElement
  }

  if (firstElement.length + ", etc.".length <= maxLen) {
    return firstElement + ", etc."
  } else {
    return firstElement.slice(0, maxLen - "..., etc.".length) + "..., etc."
  }
}
