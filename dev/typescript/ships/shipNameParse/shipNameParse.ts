export const shipNameParse = (id: number, name: string): string => {
  switch (id) {
    case 557:
      return "Enterprise (Royal Navy)"

    case 10001:
      return "Neptune (Neptunia)"

    case 10057:
      return "Ookami Mio"

    case 10063:
      return "Kasumi (Venus Vacation)"

    case 10105:
      return "Fubuki (Senran Kagura)"

    default:
      return decodeURIComponent(name)
  }
}
