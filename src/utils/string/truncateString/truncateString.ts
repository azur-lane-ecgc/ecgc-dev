export const truncateString = (str: string, maxLen: number): string => {
  if (str.length <= maxLen) {
    return str
  }

  return str.slice(0, maxLen - 3) + "..."
}
