import json
import os
import re
from datetime import datetime

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# Constants
SERVICE_ACCOUNT_FILE = "dev_tools/credentials.json"
SPREADSHEET_ID = "1HF6_hLEB8m_v0stp4DLGnIoDjgojvo7fjYz-cysjTMc"
CHANGELONG_SHEET_NAME = "Notes"
END_GAME_RANKINGS_PATH = "src/components/_common/Constants/lastUpdated.ts"

# Authenticate and initialize the Sheets API
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
credentials = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build("sheets", "v4", credentials=credentials)


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

    changelog_date = get_changelog_date()
    if changelog_date:
        update_end_game_rankings_update_date(changelog_date)
        print(f"Updated ehpUpdateDate to {changelog_date}")
    else:
        print("Changelog date is not available, skipping update.")
