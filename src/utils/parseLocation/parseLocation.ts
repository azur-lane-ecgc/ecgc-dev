export const parseLocation = (location: string) => {
  // War Archive Version
  if (location === "Divergent Chessboard" || location === "Opposite-Colored") {
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

  // Permanent UR ships
  else if (location === "Permanent Ultra Rare Pity") {
    location = "Building#UR_Ships_Construction"
  }

  // Shipyard
  else if (location.match(/Shipyard \(PR(\d+)\)/)) {
    location = location.replace(/Shipyard \(PR(\d+)\)/, "Research#Series_$1")
  }

  // Login Rewards
  else if (location === "Login Reward") {
    location = "Missions#Login_Rewards"
  }

  // Dossier Analysis
  else if (location.match(/Dossier/)) {
    location = "META_Showdown#Dossier_Analysis"
  }

  return location.replaceAll(" ", "_")
}
