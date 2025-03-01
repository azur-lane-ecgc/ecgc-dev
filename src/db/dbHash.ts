export const generateHash = (data: any): string => {
  const str = JSON.stringify(data)
  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0
  }

  return hash.toString(36)
}
