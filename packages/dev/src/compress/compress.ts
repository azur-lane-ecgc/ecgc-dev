import { readdir, stat, readFile, writeFile } from "fs/promises"
import { join, extname, resolve, relative } from "path"
import sharp from "sharp"

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
    overshootDeringing: true,
    optimiseScans: true,
  },
  png: { compressionLevel: 9, palette: true },
  tiff: { compression: "lzw" },
  webp: { effort: 6, lossless: true },
  heif: { effort: 9, lossless: true },
}

const supported = Object.keys(compressionSettings)

const getAllImages = async (dir: string): Promise<string[]> => {
  const out: string[] = []
  for (const name of await readdir(dir)) {
    const p = join(dir, name)
    const s = await stat(p)
    if (s.isDirectory()) {
      out.push(...(await getAllImages(p)))
    } else {
      const ext = extname(name).slice(1).toLowerCase()
      const fmt = extensionMap[ext] || ext
      if (supported.includes(fmt)) {
        out.push(resolve(p))
      }
    }
  }
  return out
}

const compressImage = async (file: string, base: string) => {
  const relPath = relative(base, file).replace(/\\/g, "/")

  try {
    console.log(`Processing: ${relPath}`)

    const ext = extname(file).slice(1).toLowerCase()
    const fmt = extensionMap[ext] || ext
    const opts = compressionSettings[fmt]
    if (!opts) {
      console.log(`Skipping unsupported format: ${relPath}`)
      return
    }

    // Get original file size
    const origStats = await stat(file)
    const origSize = origStats.size

    // Read file using Node.js fs
    const inBuf = await readFile(file)

    // Validate that sharp can read this image
    let img
    try {
      img = sharp(inBuf, {
        failOn: "error",
        sequentialRead: true,
        unlimited: true,
      })

      // Test if sharp can actually process this image by getting metadata
      await img.metadata()
    } catch (sharpError) {
      console.log(
        `Skipping file with unsupported format: ${relPath} (${sharpError})`,
      )
      return
    }

    switch (fmt) {
      case "avif":
        img = img.avif(opts as any)
        break
      case "gif":
        img = img.gif(opts as any)
        break
      case "jpeg":
        img = img.jpeg(opts as any)
        break
      case "png":
        img = img.png(opts as any)
        break
      case "tiff":
        img = img.tiff(opts as any)
        break
      case "webp":
        img = img.webp(opts as any)
        break
      case "heif":
        img = img.heif(opts as any)
        break
    }

    const outBuf = await img.toBuffer()
    await writeFile(file, outBuf)

    // Get new file size
    const newStats = await stat(file)
    const newSize = newStats.size
    const saved = (((origSize - newSize) / origSize) * 100).toFixed(1)

    console.log(
      `${relPath}: ${(origSize / 1024).toFixed(1)}KB → ${(
        newSize / 1024
      ).toFixed(1)}KB (${saved}% saved)`,
    )
  } catch (error) {
    console.error(`Error processing ${relPath}:`, error)
  }
}

const main = async () => {
  const base = resolve("../frontend/dist")
  console.log("Scanning for images under", base)
  let images: string[] = []
  try {
    images = await getAllImages(base)
  } catch (err) {
    console.error(`Error reading directory ${base}:`, err)
    return
  }
  if (images.length === 0) {
    console.log("No images found.")
    return
  }
  console.log(`Found ${images.length} images. Compressing…`)
  for (const img of images) {
    await compressImage(img, base)
  }
  console.log("Done compressing images.")
}

main().catch((err) => {
  console.error("An error occurred", err)
  process.exit(1)
})
