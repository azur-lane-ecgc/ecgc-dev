import json
import shutil
import tempfile
import zipfile
from pathlib import Path
import requests
from playwright.sync_api import sync_playwright

# Hardcoded constants
sheet_id = "1wWMIzaUKISAXMbOEnmsuuLkO9PesabpdTUWdosvHygM"
output_dir = Path(__file__).parent.parent.parent.parent / "public/images/equip_misc/"
include_sheets = []
exclude_sheets = [
    "(WiP) SS RLD Chart",
    "Copy of BB Guns",
    "(WiP) OpSi Image Guide Pt4",
    "Ammo Modifiers Chart",
    "(WiP) Rikka Specific Guide"
]
resolved_output_dir = output_dir.resolve()

def download(sheet_id):
    temp_dir = Path(tempfile.mkdtemp(prefix="gs2imgz-"))
    zip_path = temp_dir / f"{sheet_id}.zip"
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=zip"
    response = requests.get(url)
    response.raise_for_status()
    with open(zip_path, "wb") as f:
        f.write(response.content)
    return zip_path

def unzip(zip_path):
    temp_dir = Path(tempfile.mkdtemp(prefix="gs2imgx-"))
    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(temp_dir)
    shutil.rmtree(zip_path.parent, ignore_errors=True)
    return temp_dir

def screenshot(html_path, png_path, browser):
    page = browser.new_page(
        viewport={"width": 1920, "height": 1080}, device_scale_factor=2
    )
    page.goto(f"file://{html_path}", timeout=0)

    row_header = page.query_selector(".row-header-wrapper")
    if not row_header:
        print(f"Skipping {html_path.name}: row-header-wrapper not found.")
        page.close()
        return

    row_header_box = row_header.bounding_box()
    if not row_header_box:
        print(f"Skipping {html_path.name}: bounding box not found.")
        page.close()
        return

    tbody = page.query_selector("tbody")
    if not tbody:
        print(f"Skipping {html_path.name}: tbody not found.")
        page.close()
        return

    bounding_box = tbody.bounding_box()
    if not bounding_box:
        print(f"Skipping {html_path.name}: bounding box not found.")
        page.close()
        return

    row_header_width = row_header_box["width"]

    # Create a new clip area instead of modifying the original bounding_box
    clip_area = {
        "x": bounding_box["x"] + row_header_width + 1,
        "y": bounding_box["y"],
        "width": bounding_box["width"] - row_header_width - 1,
        "height": bounding_box["height"]
    }

    # Set viewport large enough to contain the full content with buffer
    page.set_viewport_size({
        "width": max(1920, int(clip_area["width"]) + 100),
        "height": max(1080, int(clip_area["height"]) + 100)
    })

    print(f"Uploading {html_path.stem}")
    page.screenshot(path=str(png_path), clip=clip_area)
    page.close()

def process_sheets(sheet_names, extracted_dir, browser):
    for sheet_name in sheet_names:
        file_name = sheet_name.replace(" ", "_") + ".jpeg"
        html_path = extracted_dir / f"{sheet_name}.html"
        png_path = resolved_output_dir / file_name
        if not html_path.exists():
            print(f"Skipping {sheet_name}: HTML file not found.")
            continue
        screenshot(html_path, png_path, browser)

def main():
    resolved_output_dir.mkdir(parents=True, exist_ok=True)
    zip_path = download(sheet_id)
    extracted_dir = unzip(zip_path)
    files = [f for f in extracted_dir.iterdir() if f.suffix == ".html"]
    sheet_names = [
        f.stem
        for f in files
        if (not include_sheets or f.stem in include_sheets)
        and f.stem not in exclude_sheets
    ]

    print(f"Found {len(sheet_names)} sheets to process.")

    with sync_playwright() as playwright:
        browser = playwright.firefox.launch()
        try:
            process_sheets(sheet_names, extracted_dir, browser)
        finally:
            browser.close()

    shutil.rmtree(extracted_dir)
    print("Finished uploading images.")

if __name__ == "__main__":
    main()