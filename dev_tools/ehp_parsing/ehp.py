import json
import os

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# Constants
SERVICE_ACCOUNT_FILE = "dev_tools/credentials.json"
SPREADSHEET_ID = "1HF6_hLEB8m_v0stp4DLGnIoDjgojvo7fjYz-cysjTMc"
SHEET_NAMES = ["eHP 3"]
OUTPUT_PATHS = [
    "src/components/_common/ShipModal/ShipEHP/shipEHP.json",
]

# Authenticate and initialize the Sheets API
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
credentials = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build("sheets", "v4", credentials=credentials)


def extract_base_name(ship_name):
    """Extract base ship name by removing notes in parentheses."""
    if "(" in ship_name:
        return ship_name.split("(")[0].strip()
    return ship_name.strip()


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
