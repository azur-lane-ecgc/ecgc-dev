export const generateHash = (data: any): string => {
  return Bun.hash(JSON.stringify(data)).toString(16)
}
