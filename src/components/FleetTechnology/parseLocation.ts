export const parseLocation = (location: string) => {
  // War Archive Version
  if (location === "Divergent Chessboard") {
    location = "Divergent Chessboard Rerun"
  }

  // Memento -> Collection
  else if (location === "Memento (Collections)") {
    location = "Collection"
  }

  // Map Drop ships
  else if (location === "Map Drop") {
    location = "List of Ship Drops"
  }

  return location.replaceAll(" ", "_")
}
