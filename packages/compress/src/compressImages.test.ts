import { expect, test } from "bun:test"
import {
  mkdtemp,
  mkdir,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"

import sharp from "sharp"

import { compressImages } from "./compressImages"

test("compresses nested images and preserves unsupported files", async () => {
  const directory = await mkdtemp(join(tmpdir(), "ecgc-compress-"))
  try {
    const nested = join(directory, "nested")
    await mkdir(nested)
    const png = await sharp({
      create: { width: 128, height: 128, channels: 4, background: "#33669980" },
    })
      .png({ compressionLevel: 0 })
      .toBuffer()
    const jpeg = await sharp({
      create: { width: 128, height: 128, channels: 3, background: "#336699" },
    })
      .jpeg({ quality: 100 })
      .toBuffer()
    const pngPath = join(nested, "image.png")
    const jpegPath = join(directory, "image.jpeg")
    const webpPath = join(directory, "image.webp")
    const brokenPath = join(directory, "broken.png")
    await Promise.all([
      writeFile(pngPath, png),
      writeFile(jpegPath, jpeg),
      writeFile(webpPath, "Preserve the unsupported file"),
      writeFile(brokenPath, "Preserve the invalid image"),
    ])

    await compressImages(directory)

    const outputPng = await readFile(pngPath)
    const outputJpeg = await readFile(jpegPath)
    expect(outputPng.length).toBeLessThan(png.length)
    expect(outputJpeg.length).toBeLessThanOrEqual(jpeg.length)
    expect(await sharp(outputPng).raw().toBuffer()).toEqual(
      await sharp(png).raw().toBuffer(),
    )
    expect((await sharp(outputJpeg).metadata()).format).toBe("jpeg")
    expect(await readFile(webpPath, "utf8")).toBe(
      "Preserve the unsupported file",
    )
    expect(await readFile(brokenPath, "utf8")).toBe(
      "Preserve the invalid image",
    )
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})

test("processes symbolic links without competing writes to one image", async () => {
  const directory = await mkdtemp(join(tmpdir(), "ecgc-compress-"))
  try {
    const originalPath = join(directory, "original.png")
    const linkedPath = join(directory, "linked.png")
    const original = await sharp({
      create: { width: 256, height: 256, channels: 3, background: "#336699" },
    })
      .png({ compressionLevel: 0 })
      .toBuffer()
    await writeFile(originalPath, original)
    await symlink(originalPath, linkedPath)

    await compressImages(directory)

    expect(await readFile(linkedPath)).toEqual(await readFile(originalPath))
    expect(await sharp(linkedPath).raw().toBuffer()).toEqual(
      await sharp(original).raw().toBuffer(),
    )
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})
