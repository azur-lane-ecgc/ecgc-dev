import re
from datetime import datetime

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

SERVICE_ACCOUNT_FILE = "credentials.json"
END_GAME_RANKINGS_PATH = "../../src/components/_common/Constants/lastUpdated.ts"
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

# Define 2 sheets to parse
SPREADSHEETS = [
    {
        "spreadsheet_id": "1HF6_hLEB8m_v0stp4DLGnIoDjgojvo7fjYz-cysjTMc",
        "sheet_name": "Notes",
        "cell_range": "A1",
        "date_format": "%B %d, %Y",
        "update_key": "ehpUpdateDate",
    },
    {
        "spreadsheet_id": "13YbPw3dM2eN6hr3YfVABIK9LVuCWnVZF0Zp2BGOZXc0",
        "sheet_name": "Changelog",
        "cell_range": "A2",
        "date_format": "%Y/%m/%d",
        "update_key": "endGameRankingsUpdateDate",
    },
]


credentials = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build("sheets", "v4", credentials=credentials)


def get_changelog_date(spreadsheet_id, sheet_name, cell_range, date_format):
    """Fetch date from the specified sheet and return it in MM/DD/YYYY format."""
    result = (
        service.spreadsheets()
        .values()
        .get(spreadsheetId=spreadsheet_id, range=f"{sheet_name}!{cell_range}")
        .execute()
    )
    date_str = result.get("values", [[None]])[0][0]
    if date_str:
        try:
            if date_format == "%B %d, %Y":
                date_str = (
                    date_str.replace("th,", ",")
                    .replace("st,", ",")
                    .replace("nd,", ",")
                    .replace("rd,", ",")
                )
            date_obj = datetime.strptime(date_str, date_format)
            return date_obj.strftime("%m/%d/%Y")
        except ValueError:
            raise ValueError(f"Invalid date format in Changelog: {date_str}")
    return None


def update_constants_file(updates):
    """Update specified date fields in the Constants file."""
    with open(END_GAME_RANKINGS_PATH, "r", encoding="utf-8") as file:
        content = file.read()

    for key, new_date in updates.items():
        updated_content = re.sub(
            rf'export const {key} = "\d{{2}}/\d{{2}}/\d{{4}}"',
            f'export const {key} = "{new_date}"',
            content,
        )
        if updated_content != content:
            content = updated_content

    with open(END_GAME_RANKINGS_PATH, "w", encoding="utf-8") as file:
        file.write(content)


if __name__ == "__main__":
    updates = {}

    for sheet_config in SPREADSHEETS:
        changelog_date = get_changelog_date(
            sheet_config["spreadsheet_id"],
            sheet_config["sheet_name"],
            sheet_config["cell_range"],
            sheet_config["date_format"],
        )
        if changelog_date:
            updates[sheet_config["update_key"]] = changelog_date

    if updates:
        update_constants_file(updates)
        print(f"Updated dates: {updates}")
    else:
        print("No valid dates found, skipping update.")
