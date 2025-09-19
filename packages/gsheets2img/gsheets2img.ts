import fs from 'fs';
import path from 'path';
import tmp from 'tmp';
import AdmZip from 'adm-zip';
import { chromium } from 'playwright';

// Hardcoded constants
const sheetId = "1wWMIzaUKISAXMbOEnmsuuLkO9PesabpdTUWdosvHygM";
const outputDir = "../frontend/public/images/equip_misc/";
const includeSheets: string[] = [];
const excludeSheets = [
    "(WiP) SS RLD Chart",
    "Copy of BB Guns",
    "(WiP) OpSi Image Guide Pt4",
    "Ammo Modifiers Chart",
    "(WiP) Rikka Specific Guide"
];
const resolvedOutputDir = path.resolve(outputDir);

async function download(sheetId: string): Promise<string> {
    const tempDir = tmp.dirSync({ prefix: 'gs2imgz-' });
    const zipPath = path.join(tempDir.name, `${sheetId}.zip`);
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=zip`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to download: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(zipPath, Buffer.from(buffer));
    return zipPath;
}

function unzip(zipPath: string): string {
    const tempDir = tmp.dirSync({ prefix: 'gs2imgx-' });
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(tempDir.name, true);
    fs.rmSync(path.dirname(zipPath), { recursive: true, force: true });
    return tempDir.name;
}

async function screenshot(htmlPath: string, pngPath: string, browser: any): Promise<void> {
    const page = await browser.newPage({
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 2
    });
    await page.goto(`file://${htmlPath}`, { timeout: 0 });

    const rowHeader = await page.$('.row-header-wrapper');
    if (!rowHeader) {
        console.log(`Skipping ${path.basename(htmlPath)}: row-header-wrapper not found.`);
        await page.close();
        return;
    }

    const rowHeaderBox = await rowHeader.boundingBox();
    if (!rowHeaderBox) {
        console.log(`Skipping ${path.basename(htmlPath)}: bounding box not found.`);
        await page.close();
        return;
    }

    const tbody = await page.$('tbody');
    if (!tbody) {
        console.log(`Skipping ${path.basename(htmlPath)}: tbody not found.`);
        await page.close();
        return;
    }

    const boundingBox = await tbody.boundingBox();
    if (!boundingBox) {
        console.log(`Skipping ${path.basename(htmlPath)}: bounding box not found.`);
        await page.close();
        return;
    }

    const rowHeaderWidth = rowHeaderBox.width;

    const clipArea = {
        x: boundingBox.x + rowHeaderWidth + 1,
        y: boundingBox.y,
        width: boundingBox.width - rowHeaderWidth - 1,
        height: boundingBox.height
    };

    await page.setViewportSize({
        width: Math.max(1920, Math.floor(clipArea.width) + 100),
        height: Math.max(1080, Math.floor(clipArea.height) + 100)
    });

    console.log(`Uploading ${path.parse(htmlPath).name}`);
    await page.screenshot({ path: pngPath, clip: clipArea });
    await page.close();
}

async function processSheets(sheetNames: string[], extractedDir: string, browser: any): Promise<void> {
    for (const sheetName of sheetNames) {
        const fileName = sheetName.replace(/ /g, '_') + '.jpeg';
        const htmlPath = path.join(extractedDir, `${sheetName}.html`);
        const pngPath = path.join(resolvedOutputDir, fileName);
        if (!fs.existsSync(htmlPath)) {
            console.log(`Skipping ${sheetName}: HTML file not found.`);
            continue;
        }
        await screenshot(htmlPath, pngPath, browser);
    }
}

async function main(): Promise<void> {
    fs.mkdirSync(resolvedOutputDir, { recursive: true });
    const zipPath = await download(sheetId);
    const extractedDir = unzip(zipPath);
    const files = fs.readdirSync(extractedDir).filter(f => f.endsWith('.html')).map(f => path.join(extractedDir, f));
    const sheetNames = files
        .map(f => path.parse(f).name)
        .filter(name => (!includeSheets.length || includeSheets.includes(name)) && !excludeSheets.includes(name));

    console.log(`Found ${sheetNames.length} sheets to process.`);

    const browser = await chromium.launch();
    try {
        await processSheets(sheetNames, extractedDir, browser);
    } finally {
        await browser.close();
    }

    fs.rmSync(extractedDir, { recursive: true, force: true });
    console.log("Finished uploading images.");
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}