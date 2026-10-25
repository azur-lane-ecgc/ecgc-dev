import { readdir, realpath, stat, readFile, writeFile } from "fs/promises"
import { join, extname, resolve, relative } from "path"

import sharp from "sharp"

const compressionConcurrency = 2

const extensionMap: Record<string, string> = {
  avci: "avif",
  avcs: "avif",
  avifs: "avif",
  heic: "heif",
  heics: "heif",
  heifs: "heif",
  jfif: "jpeg",
  jif: "jpeg",
  jpe: "jpeg",
  apng: "png",
  jpg: "jpeg",
}

const compressionSettings: Record<string, any> = {
  avif: { chromaSubsampling: "4:4:4", effort: 9, lossless: true },
  gif: { effort: 10 },
  jpeg: {
    chromaSubsampling: "4:4:4",
    mozjpeg: true,
    trellisQuantisation: true,
    overshootDering: true,
    optimiseScans: true,
  },
  png: { compressionLevel: 9, palette: true },
  tiff: { compression: "lzw" },
  heif: { effort: 9, lossless: true },
}

const supported = Object.keys(compressionSettings)

const getAllImages = async (dir: string): Promise<string[]> => {
  const out: string[] = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const entryPath = join(dir, entry.name)
    const path = entry.isSymbolicLink() ? await realpath(entryPath) : entryPath
    const pathType = entry.isSymbolicLink() ? await stat(path) : entry
    if (pathType.isDirectory()) {
      out.push(...(await getAllImages(path)))
    } else {
      const ext = extname(entry.name).slice(1).toLowerCase()
      const format = extensionMap[ext] || ext
      if (supported.includes(format)) {
        out.push(resolve(path))
      }
    }
  }
  return out
}

type CompressionResult = "compressed" | "preserved"

const compressImage = async (
  file: string,
  base: string,
): Promise<CompressionResult> => {
  const relativePath = relative(base, file).replace(/\\/g, "/")
  console.log(`Processing: ${relativePath}`)

  const ext = extname(file).slice(1).toLowerCase()
  const format = extensionMap[ext] || ext
  const options = compressionSettings[format]
  if (!options) {
    console.log(`Skipping unsupported format: ${relativePath}`)
    return "preserved"
  }

  const inputBuffer = await readFile(file)
  const originalSize = inputBuffer.length
  let image = sharp(inputBuffer, {
    failOn: "error",
    sequentialRead: true,
    unlimited: true,
  })

  try {
    await image.metadata()
  } catch (sharpError) {
    console.log(
      `Skipping file with unsupported format: ${relativePath} (${sharpError})`,
    )
    return "preserved"
  }

  switch (format) {
    case "avif":
      image = image.avif(options)
      break
    case "gif":
      image = image.gif(options)
      break
    case "jpeg":
      image = image.jpeg(options)
      break
    case "png":
      image = image.png(options)
      break
    case "tiff":
      image = image.tiff(options)
      break
    case "heif":
      image = image.heif(options)
      break
  }

  const outputBuffer = await image.toBuffer()
  if (outputBuffer.length >= inputBuffer.length) {
    console.log(
      `${relativePath}: already optimized (${(originalSize / 1024).toFixed(1)}KB)`,
    )
    return "preserved"
  }

  await writeFile(file, outputBuffer)
  const newSize = outputBuffer.length
  const savedPercent = (
    ((originalSize - newSize) / originalSize) *
    100
  ).toFixed(1)

  console.log(
    `${relativePath}: ${(originalSize / 1024).toFixed(1)}KB → ${(
      newSize / 1024
    ).toFixed(1)}KB (${savedPercent}% saved)`,
  )
  return "compressed"
}

/** Compresses build images with at most two active image jobs. */
export const compressImages = async (directory: string): Promise<void> => {
  console.log("Scanning for images under", directory)

  let base = directory
  let images: string[] = []
  try {
    base = await realpath(directory)
    // Resolve symbolic links before scheduling to avoid concurrent writes to one file.
    images = [...new Set(await getAllImages(base))]
  } catch (error) {
    console.error(`Error reading build output: ${error}`)
    process.exitCode = 1
    return
  }

  if (images.length === 0) {
    console.log("No images found.")
    return
  }

  console.log(`Found ${images.length} images. Compressing…`)
  let compressedCount = 0
  let preservedCount = 0

  let nextImageIndex = 0
  let compressionFailed = false
  const compressNextImages = async () => {
    try {
      while (!compressionFailed && nextImageIndex < images.length) {
        const image = images[nextImageIndex++]!
        const result = await compressImage(image, base)
        if (result === "compressed") {
          compressedCount++
        } else {
          preservedCount++
        }
      }
    } catch (error) {
      compressionFailed = true
      throw error
    }
  }

  const results = await Promise.allSettled(
    Array.from(
      { length: Math.min(compressionConcurrency, images.length) },
      compressNextImages,
    ),
  )
  const failure = results.find((result) => result.status === "rejected")
  if (failure) throw failure.reason

  console.log(
    `Done compressing images. Compressed: ${compressedCount}. Preserved: ${preservedCount}.`,
  )
}
