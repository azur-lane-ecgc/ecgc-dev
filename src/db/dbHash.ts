

export const generateHash = (data: any): string => {
  return btoa(
    JSON.stringify(data)
      .split("")
      .reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)
      .toString(),
  )
}
