export interface GSheets2ImgConfig {
  gsheets2img: {
    sheetID: string
    outputDir: string
    includeSheets: string[]
    excludeSheets: string[]
    concurrency: number
  }
}
