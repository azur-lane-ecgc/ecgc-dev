import os
import shutil
import asyncio
import json
from pathlib import Path
from tempfile import mkdtemp
from aiohttp import ClientSession
from playwright.async_api import async_playwright
import zipfile

def loadConfig():
    configPath = os.path.join(os.path.dirname(__file__), 'config', 'default.json')
    with open(configPath, 'r') as f:
        return json.load(f)

async def download(sheetId, session):
    dirPath = mkdtemp(prefix="gs2imgz-")
    zipPath = os.path.join(dirPath, f"{sheetId}.zip")
    url = f"https://docs.google.com/spreadsheets/d/{sheetId}/export?format=zip"
    
    async with session.get(url) as response:
        with open(zipPath, "wb") as f:
            f.write(await response.read())
    
    return zipPath

def unzip(zipPath):
    extractedDir = mkdtemp(prefix="gs2imgx-")
    with zipfile.ZipFile(zipPath, 'r') as zipRef:
        zipRef.extractall(extractedDir)
    shutil.rmtree(os.path.dirname(zipPath), ignore_errors=True)
    return extractedDir

async def screenshot(htmlPath, pngPath, browser):
    context = await browser.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=2)
    page = await context.new_page()
    await page.goto(f"file://{htmlPath}", timeout=0)

    rowHeader = await page.query_selector(".row-header-wrapper")
    rowHeaderBBox = await rowHeader.bounding_box()
    tbody = await page.query_selector("tbody")
    boundingBox = await tbody.bounding_box()
    
    await page.set_viewport_size({
        "width": int(boundingBox["width"]) + 10,
        "height": int(boundingBox["height"]) + 10
    })

    boundingBox["x"] += rowHeaderBBox["width"] + 1
    boundingBox["width"] -= rowHeaderBBox["width"] + 1

    await page.screenshot(path=pngPath, clip=boundingBox)
    await page.close()
    await context.close()

async def main():
    config = loadConfig()["gsheets2img"]
    sheetId = config.get("sheetID")
    outputDir = os.path.normpath(config.get("outputDir"))
    os.makedirs(outputDir, exist_ok=True)

    includeSheets = config.get("includeSheets", [])
    excludeSheets = config.get("excludeSheets", [])
    concurrency = int(config.get("concurrency", 5))

    async with ClientSession() as session:
        zipPath = await download(sheetId, session)

    extractedDir = unzip(zipPath)
    files = [f for f in os.listdir(extractedDir) if f.endswith(".html")]
    sheetNames = [
        Path(f).stem for f in files
        if (not includeSheets or Path(f).stem in includeSheets) and Path(f).stem not in excludeSheets
    ]

    async with async_playwright() as p:
        browser = await p.firefox.launch()
        tasks = []

        for sheetName in sheetNames:
            fileName = f"{sheetName.replace(' ', '_')}.jpeg"
            print("Uploading", fileName)

            htmlPath = os.path.join(extractedDir, f"{sheetName}.html")
            pngPath = os.path.join(outputDir, fileName)

            task = asyncio.create_task(screenshot(htmlPath, pngPath, browser))
            tasks.append(task)

            if len(tasks) >= concurrency:
                await asyncio.wait(tasks, return_when=asyncio.FIRST_COMPLETED)
                tasks = [t for t in tasks if not t.done()]

        await asyncio.gather(*tasks)
        await browser.close()

    shutil.rmtree(extractedDir, ignore_errors=True)

if __name__ == "__main__":
    asyncio.run(main())
