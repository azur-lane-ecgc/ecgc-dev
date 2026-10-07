export const getEHPColor = (totalEHP: number): string => {
  let totalEHPColor = "#FFFFFF"
  if (totalEHP !== 100) {
    if (totalEHP > 100) {
      const ratio = Math.min((totalEHP - 100) / 30, 1)
      totalEHPColor = `rgb(
                    ${Math.round(255 - 151 * ratio)},
                    ${Math.round(255 - 114 * ratio)},
                    ${Math.round(255 - 55 * ratio)})`
    } else {
      const ratio = Math.min(Math.max((totalEHP - 70) / 30, 0), 1)
      totalEHPColor = `rgb(
                    ${Math.round(230 + (255 - 230) * ratio)},
                    ${Math.round(124 + (255 - 124) * ratio)},
                    ${Math.round(115 + (255 - 115) * ratio)})`
    }
  }

  return totalEHPColor
}

export const getSTDColor = (std: number): string => {
  let stdColor = "#FFFFFF"
  if (std !== 30) {
    if (std < 30) {
      const ratio = Math.min(Math.max((std - 20) / 10, 0), 1)
      stdColor = `rgb(
          ${Math.round(94 + (255 - 94) * ratio)},
          ${Math.round(141 + (255 - 141) * ratio)},
          ${Math.round(200 + (255 - 200) * ratio)})`
    } else {
      const ratio = Math.min(Math.max((std - 30) / 10, 0), 1)
      stdColor = `rgb(
          ${Math.round(255 - (255 - 230) * ratio)},
          ${Math.round(255 - (255 - 124) * ratio)},
          ${Math.round(255 - (255 - 115) * ratio)})`
    }
  }

  return stdColor
}
