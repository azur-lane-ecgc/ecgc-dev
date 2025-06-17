import json
import os
import re

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# Constants
SERVICE_ACCOUNT_FILE = "credentials.json"
SPREADSHEET_ID = "13YbPw3dM2eN6hr3YfVABIK9LVuCWnVZF0Zp2BGOZXc0"
SHEET_NAMES = ["subs (no img)"]
OUTPUT_PATHS = ["../../src/db/rankings/ssFleetRankings.json"]

# Authenticate and initialize the Sheets API
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
credentials = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build("sheets", "v4", credentials=credentials)

# Priority levels for sorting
priority_order = {"SS": 5, "S": 4, "A": 3, "B": 2, "C": 1, "D": 0}


def parse_fleet_key(fleet_key):
    """Parse the fleet key to extract shipName and nameNote."""
    exceptions = [
        "Neptune (Neptunia)",
        "Enterprise (Royal Navy)",
        "Kasumi (Venus Vacation)",
        "Fubuki (Senran Kagura)",
        "Kaga(BB)",
        "Amagi(CV)",
    ]

    for exception in exceptions:
        if fleet_key.startswith(exception):
            return {
                "shipName": exception,
                "nameNote": fleet_key[len(exception) :].strip().strip("()"),
            }

    match = re.match(r"^(.*?)\s*\((.*?)\)$", fleet_key)
    return (
        {"shipName": match.group(1).strip(), "nameNote": match.group(2).strip()}
        if match
        else {"shipName": fleet_key.strip(), "nameNote": "Base"}
    )


def get_headers(sheet_name):
    """Get headers from row 2 (column D onwards)"""
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=SPREADSHEET_ID, range=f"{sheet_name}!D2:AA2")
        .execute()
    )
    # Trim whitespace from headers
    headers = [h.strip() for h in result.get("values", [[]])[0]]
    return headers


def process_sheet(sheet_name):
    """Process a sheet and return structured data"""
    # Get headers first
    headers = get_headers(sheet_name)

    # Get content (row 3 onwards)
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=SPREADSHEET_ID, range=f"{sheet_name}!C3:AA")
        .execute()
    )

    values = result.get("values", [])
    data_dict = {}

    for row in values:
        if len(row) < 1:
            continue

        fleet_key = row[0].strip()  # Column C value as the key, trimmed
        parsed_key = parse_fleet_key(fleet_key)

        # Create object with header-value pairs
        # Skip first value (which was the key from column C)
        row_data = {}
        for i, value in enumerate(row[1:]):
            if i < len(headers):  # Only process if we have a corresponding header
                row_data[headers[i]] = value.strip() if value else None

        if parsed_key["shipName"] not in data_dict:
            data_dict[parsed_key["shipName"]] = []

        ranking = {
            "nameNote": parsed_key["nameNote"],
            "notes": row_data.get("Notes"),
            "hardarbiter": row_data.get("Hard Arbiter"),
            "cm": row_data.get("CM"),
            "campaign": row_data.get("Campaign"),
            "consistency": (
                int(row_data["Consistency"]) if row_data.get("Consistency") else None
            ),
            "fleetreq": (
                int(row_data["Fleet Req."]) if row_data.get("Fleet Req.") else None
            ),
            "flagreq": (
                int(row_data["Flag Req."]) if row_data.get("Flag Req.") else None
            ),
            "lightdmg": (
                int(row_data["Light Dmg"]) if row_data.get("Light Dmg") else None
            ),
            "mediumdmg": (
                int(row_data["Medium Dmg"]) if row_data.get("Medium Dmg") else None
            ),
            "heavydmg": (
                int(row_data["Heavy Dmg"]) if row_data.get("Heavy Dmg") else None
            ),
            "offensivebuff": (
                int(row_data["Offense Buff"]) if row_data.get("Offense Buff") else None
            ),
        }

        if parsed_key["nameNote"] == "":
            data_dict[parsed_key["shipName"].strip()].insert(0, ranking)
        else:
            data_dict[parsed_key["shipName"].strip()].append(ranking)

    for ship_name, rankings in data_dict.items():
        data_dict[ship_name] = sorted(
            rankings, key=lambda x: (len(x["nameNote"]) > 0, x["nameNote"])
        )

    return data_dict


# Main logic to process sheets and save as separate JSON files
if __name__ == "__main__":
    # Ensure we have matching output paths for each sheet
    if len(SHEET_NAMES) != len(OUTPUT_PATHS):
        raise ValueError("Number of sheet names must match number of output paths")

    for sheet_name, output_path in zip(SHEET_NAMES, OUTPUT_PATHS):
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        sheet_data = process_sheet(sheet_name)

        # Sort the sheet data by shipName alphabetically before saving to JSON
        sorted_sheet_data = {
            k: sorted(
                sheet_data[k],
                key=lambda x: (
                    -priority_order.get(
                        sheet_data[k][0]["campaign"], 0
                    ),  # w14boss sorting
                    k,  # tiebreak by shipName (the dictionary key)
                ),
            )
            for k in sorted(sheet_data)
        }
        # Write the sorted data to a JSON file
        with open(output_path, "w", encoding="utf-8") as json_file:
            json.dump(sorted_sheet_data, json_file, indent=2, ensure_ascii=False)
            json_file.write('\n')

        print(f"Data from sheet '{sheet_name}' has been written to {output_path}")
