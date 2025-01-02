import json
import os

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# Constants
SERVICE_ACCOUNT_FILE = "dev_tools/end_game_al_rankings/credentials.json"
SPREADSHEET_ID = "13YbPw3dM2eN6hr3YfVABIK9LVuCWnVZF0Zp2BGOZXc0"
SHEET_NAMES = ["VG (no img)"]
OUTPUT_PATHS = ["dev_tools/end_game_al_rankings/output.json"]  # Array of explicit output paths

# Authenticate and initialize the Sheets API
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
credentials = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build("sheets", "v4", credentials=credentials)


def get_headers(sheet_name):
    """Get headers from row 2 (column D onwards)"""
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=SPREADSHEET_ID, range=f"{sheet_name}!D2:Z2")
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
        .get(spreadsheetId=SPREADSHEET_ID, range=f"{sheet_name}!C3:Z")
        .execute()
    )

    values = result.get("values", [])
    data_dict = {}

    for row in values:
        if len(row) < 1:
            continue

        key = row[0].strip()  # Column C value as the key, trimmed
        
        # Create object with header-value pairs
        # Skip first value (which was the key from column C)
        row_data = {}
        for i, value in enumerate(row[1:]):
            if i < len(headers):  # Only process if we have a corresponding header
                row_data[headers[i]] = value.strip()

        data_dict[key] = row_data

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