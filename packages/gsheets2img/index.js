import { createWriteStream } from 'node:fs';
import { mkdir, mkdtemp, readdir, rm } from 'node:fs/promises';
import { basename, dirname, extname, join, normalize } from 'node:path';
import { tmpdir } from 'node:os';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import config from 'config';
import yauzl from 'yauzl-promise';
import { firefox } from 'playwright';


async function download(sheetID) {
  const dir = await mkdtemp(join(tmpdir(), 'gs2imgz-'));
  const zipPath = join(dir, sheetID + '.zip');
  const res = await fetch(`https://docs.google.com/spreadsheets/d/${sheetID}/export?format=zip`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(zipPath));
  return zipPath;
}

async function unzip(zipPath) {
  const extractedDir = await mkdtemp(join(tmpdir(), 'gs2imgx-'));
  const zip = await yauzl.open(zipPath);

  try {
    for await (const entry of zip) {
      const targetPath = join(extractedDir, entry.filename);
      if (entry.filename.endsWith('/')) {
        // directory
        await mkdir(targetPath, { recursive: true });
      } else {
        // file
        const readStream = await entry.openReadStream();
        await mkdir(dirname(targetPath), { recursive: true });
        await pipeline(readStream, createWriteStream(targetPath));
      }
    }
  } finally {
    await zip.close();
  }

  await rm(dirname(zipPath), { force: true, recursive: true });
  return extractedDir;
}

async function screenshot(htmlPath, pngPath, browser) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
  await page.goto('file://' + htmlPath, { timeout: 0 });

  try {
    const rowHeader = await page.$('.row-header-wrapper');
    const { width: rowHeaderWidth } = await rowHeader.boundingBox();
    const tbody = await page.$('tbody');
    const boundingBox = await tbody.boundingBox();
    const clipArea = {
      x: boundingBox.x + rowHeaderWidth + 1,
      y: boundingBox.y,
      width: boundingBox.width - rowHeaderWidth - 1,
      height: boundingBox.height,
    };
    
    await page.setViewportSize({
      width: Math.max(1920, Math.floor(clipArea.width) + 100),
      height: Math.max(1080, Math.floor(clipArea.height) + 100),
    });

    await page.screenshot({ path: pngPath, clip: clipArea });
  } catch (e) {
    console.error(e);
  } finally {
    await page.close();
  }
}

download(config.get('gsheets2img.sheetID'))
  .then(unzip)
  .then(async extractedDir => {
    const outputDir = normalize(config.get('gsheets2img.outputDir'));
    await mkdir(outputDir, { recursive: true });

    const files = await readdir(extractedDir);
    const includeSheets = config.get('gsheets2img.includeSheets');
    const excludeSheets = config.get('gsheets2img.excludeSheets');
    const sheetNames = files
      .filter(x => extname(x) == '.html')
      .map(x => basename(x).slice(0, -5))
      .filter(x => (!Array.isArray(includeSheets) || !includeSheets.length || includeSheets.includes(x))
        && (!Array.isArray(excludeSheets) || !excludeSheets.includes(x))
      );
    const browser = await firefox.launch();
    const promises = [];

    for (const sheetName of sheetNames) {
      const promise = screenshot(join(extractedDir, sheetName + '.html'), join(outputDir, sheetName + '.jpg'), browser)
        .then(() => promises.splice(promises.indexOf(promise), 1));
      promises.push(promise);

      if (promises.length >= config.get('gsheets2img.concurrency')) {
        await Promise.race(promises);
      }
    }

    await Promise.all(promises);
    await browser.close();
    await rm(extractedDir, { force: true, recursive: true });
  });
