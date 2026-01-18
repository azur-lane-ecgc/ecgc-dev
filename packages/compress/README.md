# compress

Image compression utilities for ECGC build optimization.

## Installation

Dependencies managed via monorepo root. Run from project root:

```bash
bun install
```

## Usage

Run from project root:

- **Compress build output**: `bun run compress`
- **Type check**: `bun --filter compress check`

Or run directly in package:

```bash
cd packages/compress
bun run compress
```

## How It Works

The compressor scans `apps/web/dist/` recursively for images and re-encodes them with optimized settings:

- Supports: JPEG, PNG, WebP, AVIF, HEIF, GIF, TIFF
- Uses Sharp library for high-performance processing
- Lossless compression for WebP, AVIF, HEIF
- Optimized lossy settings for JPEG (mozjpeg encoder, 4:4:4 chroma)
- Reports size savings per file

## Compression Results

Example output:

```
Processing: _astro/ship_image.1234abcd.png
_astro/ship_image.1234abcd.png: 245.3KB → 186.7KB (23.9% saved)
Done compressing images.
```

## Configuration

Edit `index.ts` to adjust compression settings per format.
