const combiningMarkPattern = /[\u0300-\u036f]/g

export const normalizeString = (str: string) =>
  str.normalize("NFD").replace(combiningMarkPattern, "").toLowerCase()
