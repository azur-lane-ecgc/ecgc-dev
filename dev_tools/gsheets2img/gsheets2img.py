import asyncio
import json
import shutil
import tempfile
import zipfile
from pathlib import Path

import aiohttp
from playwright.async_api import async_playwright

config_path = Path(__file__).parent / "config/default.json"
with open(config_path, "r") as f:
    config = json.load(f)

gsheets2img = config["gsheets2img"]
sheet_id = gsheets2img["sheetID"]
output_dir = Path(__file__).parent / Path(gsheets2img["outputDir"])
include_sheets = gsheets2img.get("includeSheets", [])
exclude_sheets = gsheets2img.get("excludeSheets", [])
concurrency = gsheets2img.get("concurrency", 2)

resolved_output_dir = output_dir.resolve()


async def download(sheet_id):
    temp_dir = Path(tempfile.mkdtemp(prefix="gs2imgz-"))
    zip_path = temp_dir / f"{sheet_id}.zip"

    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=zip"

    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            response.raise_for_status()
            with open(zip_path, "wb") as f:
                f.write(await response.read())

    return zip_path


async def unzip(zip_path):
    temp_dir = Path(tempfile.mkdtemp(prefix="gs2imgx-"))
    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(temp_dir)
    shutil.rmtree(zip_path.parent, ignore_errors=True)
    return temp_dir


async def screenshot(html_path, png_path, browser):
    page = await browser.new_page(
        viewport={"width": 1920, "height": 1080}, device_scale_factor=2
    )
    await page.goto(f"file://{html_path}", timeout=0)

    row_header = await page.query_selector(".row-header-wrapper")
    row_header_box = await row_header.bounding_box()
    row_header_width = row_header_box["width"]

    tbody = await page.query_selector("tbody")
    bounding_box = await tbody.bounding_box()

    await page.set_viewport_size(
        {
            "width": int(bounding_box["width"]) + 10,
            "height": int(bounding_box["height"]) + 10,
        }
    )

    bounding_box["x"] += row_header_width + 1
    bounding_box["width"] -= row_header_width + 1

    await page.screenshot(path=str(png_path), clip=bounding_box)
    await page.close()


async def process_sheets(sheet_names, extracted_dir, browser):
    tasks = []
    semaphore = asyncio.Semaphore(concurrency)

    async def process_sheet(sheet_name):
        async with semaphore:
            file_name = sheet_name.replace(" ", "_") + ".jpeg"
            html_path = extracted_dir / f"{sheet_name}.html"
            png_path = resolved_output_dir / file_name
            print(f"Uploading {file_name}")
            await screenshot(html_path, png_path, browser)

    for sheet_name in sheet_names:
        tasks.append(process_sheet(sheet_name))

    await asyncio.gather(*tasks)


async def main():

    resolved_output_dir.mkdir(parents=True, exist_ok=True)

    zip_path = await download(sheet_id)
    extracted_dir = await unzip(zip_path)

    files = [f for f in extracted_dir.iterdir() if f.suffix == ".html"]
    sheet_names = [
        f.stem
        for f in files
        if (not include_sheets or f.stem in include_sheets)
        and f.stem not in exclude_sheets
    ]

    async with async_playwright() as playwright:
        browser = await playwright.firefox.launch()
        await process_sheets(sheet_names, extracted_dir, browser)
        await browser.close()

    shutil.rmtree(extracted_dir)


if __name__ == "__main__":
    asyncio.run(main())
    print("Finished Uploading Images!")
