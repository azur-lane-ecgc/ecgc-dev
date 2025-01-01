export const shipNameParse = (id: number): string | null => {
  switch (id) {
    case 557:
      return "Enterprise (Royal Navy)"

    case 10063:
      return "Kasumi (Venus Vacation)"

    case 10105:
      return "Fubuki (Senran Kagura)"

    default:
      return null
  }
}
