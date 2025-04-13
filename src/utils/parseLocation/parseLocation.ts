export const parseLocation = (location: string) => {
  // Divergent Chessboard (EN)
  if (location === "Divergent Chessboard" || location === "Opposite-Colored") {
    location = "Divergent Chessboard Rerun"
  }

  // Air Raid Drills w/ Essex
  else if (location.match(/Air Raid Drills with Essex/)) {
    location = "Air Raid Drills with Essex Rerun"
  }

  //LNY
  else if (location === "Lunar New Year") {
    const now = new Date()
    const currentYear = now.getFullYear()
    const febFirst = new Date(currentYear, 1, 1)

    if (now < febFirst) {
      location = `Happy Lunar New Year ${currentYear - 1}`
    } else {
      location = `Happy Lunar New Year ${currentYear}`
    }
  }

  // Shipyard
  else if (location.match(/Shipyard \(PR(\d+)\)/)) {
    location = location.replace(/Shipyard \(PR(\d+)\)/, "Research#Series_$1")
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

  // Login Rewards
  else if (location === "Login Reward") {
    location = "Missions#Login_Rewards"
  }

  // Dossier Analysis
  else if (location.match(/Dossier/)) {
    location = "META_Showdown#Dossier_Analysis"
  }

  // Akashi Questline
  else if (location === "Quest") {
    location = "Akashi/Questline"
  } else if (location === "Cruise Pass") {
    location = "Cruise_Missions"
  }

  return location.replaceAll(" ", "_")
}
