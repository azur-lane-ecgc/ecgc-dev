import json
import os
import re
from datetime import datetime

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# Constants
SERVICE_ACCOUNT_FILE = "dev_tools/credentials.json"
SPREADSHEET_ID = "1HF6_hLEB8m_v0stp4DLGnIoDjgojvo7fjYz-cysjTMc"
SHEET_NAMES = ["eHP 3"]
OUTPUT_PATHS = [
    "src/components/_common/ShipModal/ShipEHP/shipEHP.json",
]
CHANGELONG_SHEET_NAME = "Notes"
END_GAME_RANKINGS_PATH = "src/components/_common/Constants/lastUpdated.ts"

# Authenticate and initialize the Sheets API
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
credentials = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build("sheets", "v4", credentials=credentials)


import re


def extract_base_name(ship_name):
    """Extract base ship name by removing notes in parentheses unless the note contains specific phrases."""
    # Regular expression to find text within parentheses
    match = re.search(r"\((.*?)\)", ship_name)

    if match:
        note = match.group(1)

        # If note contains specific phrases, return the name without modification
        if any(
            phrase in note
            for phrase in ["Venus Vacation", "Senran Kagura", "Neptunia", "Royal Navy"]
        ):
            return ship_name.strip()

        # Otherwise, remove the note from the name
        base_name = ship_name[: match.start()].strip()
    else:
        base_name = ship_name.strip()

    return base_name.strip()


def process_sheet(sheet_name):
    """Process a sheet and return structured data."""
    # Get content (row 2 onwards, columns A, B, C)
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=SPREADSHEET_ID, range=f"{sheet_name}!A2:C")
        .execute()
    )

    values = result.get("values", [])
    data_dict = {}

    for row in values:
        if len(row) < 3:  # Ensure there are at least 3 columns (A, B, C)
            continue

        original_name = row[0].strip()  # Column A (including notes)
        base_name = extract_base_name(original_name)  # Base ship name
        totalEHP = row[1].strip()  # Column B
        std = row[2].strip()  # Column C

        # Create an object for this entry
        entry = {
            "name": original_name,
            "totalEHP": totalEHP,
            "std": std,
        }

        # Append to the array for this base name
        if base_name not in data_dict:
            data_dict[base_name] = []
        data_dict[base_name].append(entry)

    return data_dict


def get_changelog_date():
    """Fetch date from Changelog sheet (A2) and return it in MM/DD/YYYY format"""
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=SPREADSHEET_ID, range=f"{CHANGELONG_SHEET_NAME}!A1")
        .execute()
    )
    date_str = result.get("values", [[None]])[0][0]
    if date_str:
        try:
            date_str = (
                date_str.replace("th,", ",")
                .replace("st,", ",")
                .replace("nd,", ",")
                .replace("rd,", ",")
            )
            date_obj = datetime.strptime(date_str, "%B %d, %Y")
            return date_obj.strftime("%m/%d/%Y")
        except ValueError:
            raise ValueError(f"Invalid date format in Changelog: {date_str}")
    return None


def update_end_game_rankings_update_date(new_date):
    """Update the endGameRankingsUpdateDate in the Constants file"""
    with open(END_GAME_RANKINGS_PATH, "r", encoding="utf-8") as file:
        content = file.read()

    # Use a regex to find the line containing endGameRankingsUpdateDate and replace the date
    updated_content = re.sub(
        r'export const ehpUpdateDate = "\d{2}/\d{2}/\d{4}"',
        f'export const ehpUpdateDate = "{new_date}"',
        content,
    )

    with open(END_GAME_RANKINGS_PATH, "w", encoding="utf-8") as file:
        file.write(updated_content)


# Main logic to process sheets and save as separate JSON files
if __name__ == "__main__":
    # Ensure we have matching output paths for each sheet
    if len(SHEET_NAMES) != len(OUTPUT_PATHS):
        raise ValueError("Number of sheet names must match number of output paths")

    for sheet_name, output_path in zip(SHEET_NAMES, OUTPUT_PATHS):
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        sheet_data = process_sheet(sheet_name)

        # Write the data to a JSON file
        with open(output_path, "w", encoding="utf-8") as json_file:
            json.dump(sheet_data, json_file, indent=4, ensure_ascii=False)

        print(f"Data from sheet '{sheet_name}' has been written to {output_path}")

    changelog_date = get_changelog_date()
    if changelog_date:
        update_end_game_rankings_update_date(changelog_date)
        print(f"Updated endGameRankingsUpdateDate to {changelog_date}")
    else:
        print("Changelog date is not available, skipping update.")
