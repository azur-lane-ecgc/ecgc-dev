# import json
# import os
# import re
# from datetime import datetime

# from google.oauth2.service_account import Credentials
# from googleapiclient.discovery import build

# # Constants
# SERVICE_ACCOUNT_FILE = "dev_tools/credentials.json"
# SPREADSHEET_ID = "13YbPw3dM2eN6hr3YfVABIK9LVuCWnVZF0Zp2BGOZXc0"
# SHEET_NAMES = ["VG (no img)", "MAIN (no img)", "subs (no img)"]
# OUTPUT_PATHS = [
#     "src/components/Samvaluations/ShipModal/ShipRankings/data/tempvg.json",
#     "src/components/Samvaluations/ShipModal/ShipRankings/data/tempmain.json",
#     "src/components/Samvaluations/ShipModal/ShipRankings/data/tempss.json",
# ]
# CHANGELONG_SHEET_NAME = "Changelog"
# END_GAME_RANKINGS_PATH = "src/components/_common/Constants/lastUpdated.ts"

# # Authenticate and initialize the Sheets API
# SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]
# credentials = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
# service = build("sheets", "v4", credentials=credentials)


# def get_headers(sheet_name):
#     """Get headers from row 2 (column D onwards)"""
#     result = (
#         service.spreadsheets()
#         .values()
#         .get(spreadsheetId=SPREADSHEET_ID, range=f"{sheet_name}!D2:AA2")
#         .execute()
#     )
#     # Trim whitespace from headers
#     headers = [h.strip() for h in result.get("values", [[]])[0]]
#     return headers


# def process_sheet(sheet_name):
#     """Process a sheet and return structured data"""
#     # Get headers first
#     headers = get_headers(sheet_name)

#     # Get content (row 3 onwards)
#     result = (
#         service.spreadsheets()
#         .values()
#         .get(spreadsheetId=SPREADSHEET_ID, range=f"{sheet_name}!C3:AA")
#         .execute()
#     )

#     values = result.get("values", [])
#     data_dict = {}

#     for row in values:
#         if len(row) < 1:
#             continue

#         key = row[0].strip()  # Column C value as the key, trimmed

#         # Create object with header-value pairs
#         # Skip first value (which was the key from column C)
#         row_data = {}
#         for i, value in enumerate(row[1:]):
#             if i < len(headers):  # Only process if we have a corresponding header
#                 row_data[headers[i]] = value.strip()

#         data_dict[key] = row_data

#     return data_dict


# # Priority levels for sorting
# priority_order = {"SS": 0, "S": 1, "A": 2, "B": 3, "C": 4, "D": 5}


# # Function to extract the priority value from "W14 Boss" or fallback to "Campaign"
# def get_priority_with_fallback(entry):
#     w14_boss = entry.get("W14 Boss", "").strip("*")  # Check "W14 Boss" property
#     campaign = entry.get("Campaign", "").strip("*")  # Fallback to "Campaign" property
#     value = (
#         w14_boss if w14_boss else campaign
#     )  # Use "W14 Boss" if it exists; otherwise, "Campaign"
#     return priority_order.get(value, float("inf"))  # Default to infinity if not found


# def get_changelog_date():
#     """Fetch date from Changelog sheet (A2) and return it in MM/DD/YY format"""
#     result = (
#         service.spreadsheets()
#         .values()
#         .get(spreadsheetId=SPREADSHEET_ID, range=f"{CHANGELONG_SHEET_NAME}!A2")
#         .execute()
#     )
#     date_str = result.get("values", [[None]])[0][0]
#     if date_str:
#         # Convert YYYY/MM/DD to MM/DD/YY
#         try:
#             date_obj = datetime.strptime(date_str, "%Y/%m/%d")
#             return date_obj.strftime("%m/%d/%Y")
#         except ValueError:
#             raise ValueError(f"Invalid date format in Changelog: {date_str}")
#     return None


# def update_end_game_rankings_update_date(new_date):
#     """Update the endGameRankingsUpdateDate in the Constants file"""
#     with open(END_GAME_RANKINGS_PATH, "r", encoding="utf-8") as file:
#         content = file.read()

#     # Use a regex to find the line containing endGameRankingsUpdateDate and replace the date
#     updated_content = re.sub(
#         r'export const endGameRankingsUpdateDate = "\d{2}/\d{2}/\d{4}"',
#         f'export const endGameRankingsUpdateDate = "{new_date}"',
#         content,
#     )

#     with open(END_GAME_RANKINGS_PATH, "w", encoding="utf-8") as file:
#         file.write(updated_content)


# # Main logic to process sheets and save as separate JSON files
# if __name__ == "__main__":
#     # Ensure we have matching output paths for each sheet
#     if len(SHEET_NAMES) != len(OUTPUT_PATHS):
#         raise ValueError("Number of sheet names must match number of output paths")

#     for sheet_name, output_path in zip(SHEET_NAMES, OUTPUT_PATHS):
#         # Create directory if it doesn't exist
#         os.makedirs(os.path.dirname(output_path), exist_ok=True)

#         sheet_data = process_sheet(sheet_name)

#         # Sorting the dictionary based on the "W14 Boss" or "Campaign" property,
#         # and using the key alphabetically for tiebreaker
#         sorted_sheet_data = dict(
#             sorted(
#                 sheet_data.items(),
#                 key=lambda x: (
#                     get_priority_with_fallback(x[1]),
#                     x[0].lower(),
#                 ),  # Alphabetical by key for tie-breaking
#             )
#         )

#         # Write the data to a JSON file
#         with open(output_path, "w", encoding="utf-8") as json_file:
#             json.dump(sorted_sheet_data, json_file, indent=4, ensure_ascii=False)

#         print(f"Data from sheet '{sheet_name}' has been written to {output_path}")

#     changelog_date = get_changelog_date()
#     if changelog_date:
#         update_end_game_rankings_update_date(changelog_date)
#         print(f"Updated endGameRankingsUpdateDate to {changelog_date}")
#     else:
#         print("Changelog date is not available, skipping update.")
