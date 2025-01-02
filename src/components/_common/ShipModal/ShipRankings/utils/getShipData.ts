

function getShipData(shipName: string, shipData) {
  const result = []

  for (const [key, data] of Object.entries(shipData)) {
    if (key.includes(shipName)) {
      result.push({
        name: key,
        data: data,
      })
    }
  }

  return result
}
