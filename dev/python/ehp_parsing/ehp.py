import json
import os
import re

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SERVICE_ACCOUNT_FILE = "credentials.json"
SPREADSHEET_ID = "1HF6_hLEB8m_v0stp4DLGnIoDjgojvo7fjYz-cysjTMc"
SHEET_NAMES = ["eHP 3"]
OUTPUT_PATHS = [
    "../../src/db/ehp/shipEHP.json",
]

SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
credentials = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build("sheets", "v4", credentials=credentials)


def extract_base_name(ship_name):
    """Extract base ship name by removing notes in parentheses unless the note contains specific phrases."""
    match = re.search(r"\((.*?)\)", ship_name)

    if match:
        note = match.group(1)

        if any(
            phrase in note
            for phrase in ["Venus Vacation", "Senran Kagura", "Neptunia", "Royal Navy"]
        ):
            return ship_name.strip()

        base_name = ship_name[: match.start()].strip()
    else:
        base_name = ship_name.strip()

    return base_name.strip()


def process_sheet(sheet_name):
    """Process a sheet and return structured data."""
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=SPREADSHEET_ID, range=f"{sheet_name}!A2:C")
        .execute()
    )

    values = result.get("values", [])
    data_dict = {}

    for row in values:
        if len(row) < 3:
            continue

        original_name = row[0].strip()  # Column A (including notes)
        base_name = extract_base_name(original_name)  # Base ship name
        totalEHP = row[1].strip()  # EHP value
        std = row[2].strip()  # 3STD

        entry = {
            "name": original_name,
            "totalEHP": totalEHP,
            "std": std,
        }

        if base_name not in data_dict:
            data_dict[base_name] = []

        if not any(entry["name"] == e["name"] for e in data_dict[base_name]):
            data_dict[base_name].append(entry)

    return data_dict


if __name__ == "__main__":
    if len(SHEET_NAMES) != len(OUTPUT_PATHS):
        raise ValueError("Number of sheet names must match number of output paths")

    for sheet_name, output_path in zip(SHEET_NAMES, OUTPUT_PATHS):
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        sheet_data = process_sheet(sheet_name)

        # Write data to JSON
        with open(output_path, "w", encoding="utf-8") as json_file:
            json.dump(sheet_data, json_file, indent=2, ensure_ascii=False)
            json_file.write('\n')

        print(f"Data from sheet '{sheet_name}' has been written to {output_path}")
