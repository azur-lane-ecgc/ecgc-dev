import json
import os
import re
from datetime import datetime

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# Constants
SERVICE_ACCOUNT_FILE = "dev_tools/credentials.json"
SPREADSHEET_ID = "13YbPw3dM2eN6hr3YfVABIK9LVuCWnVZF0Zp2BGOZXc0"
CHANGELONG_SHEET_NAME = "Changelog"
END_GAME_RANKINGS_PATH = "src/components/_common/Constants/lastUpdated.ts"

# Authenticate and initialize the Sheets API
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
credentials = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build("sheets", "v4", credentials=credentials)


def get_changelog_date():
    """Fetch date from Changelog sheet (A2) and return it in MM/DD/YY format"""
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=SPREADSHEET_ID, range=f"{CHANGELONG_SHEET_NAME}!A2")
        .execute()
    )
    date_str = result.get("values", [[None]])[0][0]
    if date_str:
        # Convert YYYY/MM/DD to MM/DD/YY
        try:
            date_obj = datetime.strptime(date_str, "%Y/%m/%d")
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
        r'export const endGameRankingsUpdateDate = "\d{2}/\d{2}/\d{4}"',
        f'export const endGameRankingsUpdateDate = "{new_date}"',
        content,
    )

    with open(END_GAME_RANKINGS_PATH, "w", encoding="utf-8") as file:
        file.write(updated_content)


if __name__ == "__main__":

    changelog_date = get_changelog_date()
    if changelog_date:
        update_end_game_rankings_update_date(changelog_date)
        print(f"Updated endGameRankingsUpdateDate to {changelog_date}")
    else:
        print("Changelog date is not available, skipping update.")
