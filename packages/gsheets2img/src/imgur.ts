import fs from "fs"
import path from "path"
import { createInterface } from "readline"
import open from "open"

import config from "@/config/config.json"

interface Config {
  client_id: string
  client_secret: string
  image_order: string[]
}

interface Tokens {
  access_token: string
  refresh_token: string
  expires_in: number
  expires_at?: string
}

interface ImageInfo {
  path: string
  title: string
  description?: string
}

const loadConfig = async (): Promise<Config> => {
  return config
}

const loadTokens = async (): Promise<Tokens | null> => {
  const tokenFile = "../config/tokens.json"
  const file = Bun.file(tokenFile)
  if (!(await file.exists())) {
    return null
  }
  const content = await file.text()
  return JSON.parse(content)
}

const saveTokens = async (tokens: Tokens): Promise<void> => {
  const tokenFile = "../config/tokens.json"
  fs.mkdirSync(path.dirname(tokenFile), { recursive: true })
  tokens.expires_at = new Date(
    Date.now() + tokens.expires_in * 1000,
  ).toISOString()
  await Bun.write(tokenFile, JSON.stringify(tokens, null, 2))
}

const loadImageInfo = async (): Promise<Record<string, ImageInfo>> => {
  const content = await Bun.file("../config/image_info.json").text()
  return JSON.parse(content)
}

const isTokenValid = (tokens: Tokens | null): boolean => {
  if (!tokens || !tokens.expires_at) {
    return false
  }
  const expiresAt = new Date(tokens.expires_at)
  return new Date() < new Date(expiresAt.getTime() - 5 * 60 * 1000)
}

const refreshAccessToken = async (
  clientId: string,
  clientSecret: string,
  refreshToken: string,
): Promise<any> => {
  const tokenUrl = "https://api.imgur.com/oauth2/token"
  const data = {
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
  }
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data).toString(),
  })
  return response.json()
}

const getAuthorizationUrl = (clientId: string): string => {
  return `https://api.imgur.com/oauth2/authorize?client_id=${clientId}&response_type=pin&state=APPLICATION_STATE`
}

const getTokens = async (
  clientId: string,
  clientSecret: string,
  pin: string,
): Promise<any> => {
  const tokenUrl = "https://api.imgur.com/oauth2/token"
  const data = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "pin",
    pin: pin,
  }
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data).toString(),
  })
  return response.json()
}

const getValidAccessToken = async (
  clientId: string,
  clientSecret: string,
): Promise<string> => {
  const storedTokens = await loadTokens()

  if (storedTokens && isTokenValid(storedTokens)) {
    console.log("✅ Using existing valid access token")
    return storedTokens.access_token
  }

  if (storedTokens && storedTokens.refresh_token) {
    console.log("🔄 Refreshing access token...")
    const newTokens = await refreshAccessToken(
      clientId,
      clientSecret,
      storedTokens.refresh_token,
    )

    if (newTokens && newTokens.success !== false) {
      console.log("✅ Successfully refreshed access token")
      await saveTokens(newTokens)
      return newTokens.access_token
    } else {
      console.log("❌ Failed to refresh token, need new authorization")
    }
  }

  console.log("🔐 Need fresh authorization...")
  const authorizationUrl = getAuthorizationUrl(clientId)
  console.log(`Please go to this URL and authorize access: ${authorizationUrl}`)
  await open(authorizationUrl)

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  const pin = await new Promise<string>((resolve) => {
    rl.question(
      "Enter the pin obtained from the authorization URL: ",
      (answer) => {
        rl.close()
        resolve(answer)
      },
    )
  })

  const tokens = await getTokens(clientId, clientSecret, pin)

  if (tokens.success !== false) {
    console.log("✅ Successfully obtained new tokens")
    await saveTokens(tokens)
    return tokens.access_token
  } else {
    throw new Error(`Failed to get tokens: ${JSON.stringify(tokens)}`)
  }
}

const uploadImage = async (
  imageKey: string,
  imageRepository: Record<string, ImageInfo>,
  accessToken: string,
  albumId: string,
): Promise<any> => {
  const imageInfo = imageRepository[imageKey]
  const relativeSubpath = imageInfo.path
  const scriptDir = path.dirname(new URL(import.meta.url).pathname)
  const projectRoot = path.resolve(scriptDir, "..", "..", "frontend")
  const imagePath = path.join(projectRoot, relativeSubpath)

  if (!(await Bun.file(imagePath).exists())) {
    console.log(`❌ File not found at ${imagePath}`)
    return { success: false, error: `File not found: ${imagePath}` }
  }

  const title = imageInfo.title
  const description = imageInfo.description || title
  const url = "https://api.imgur.com/3/upload"
  const headers = { Authorization: `Bearer ${accessToken}` }

  const imageFile = new Blob([await Bun.file(imagePath).bytes()])
  const formData = new FormData()
  formData.append("image", imageFile)
  formData.append("album", albumId)
  formData.append("title", title)
  formData.append("description", description)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: formData,
    })
    return response.json()
  } catch (error: any) {
    return {
      success: false,
      status_code: error.response?.status,
      raw_text: error.response?.data,
    }
  }
}

const uploadImagesInOrder = async (
  imageOrder: string[],
  imageRepository: Record<string, ImageInfo>,
  accessToken: string,
  albumId: string,
): Promise<void> => {
  for (const imageKey of imageOrder) {
    const uploadResponse = await uploadImage(
      imageKey,
      imageRepository,
      accessToken,
      albumId,
    )

    if (uploadResponse.success !== false) {
      console.log(`✅ Uploaded ${imageKey}`)
    } else {
      console.log(`❌ Failed ${imageKey}: ${JSON.stringify(uploadResponse)}`)
    }

    await new Promise((resolve) => setTimeout(resolve, 150))
  }
}

const deleteImage = async (
  deletehash: string,
  accessToken: string,
): Promise<any> => {
  const url = `https://api.imgur.com/3/image/${deletehash}`
  const headers = { Authorization: `Bearer ${accessToken}` }
  const response = await fetch(url, { method: "DELETE", headers })
  return response.json()
}

const deleteAllImagesFromAlbum = async (
  albumId: string,
  accessToken: string,
): Promise<void> => {
  const url = `https://api.imgur.com/3/album/${albumId}/images`
  const headers = { Authorization: `Bearer ${accessToken}` }
  const response = await fetch(url, { headers })

  if (!response.ok) {
    console.log(`❌ Failed to get album images: ${response.status}`)
    return
  }

  const data = await response.json()
  const images = data.data

  if (images.length > 0) {
    console.log(`🗑️  Deleting ${images.length} images from album...`)
    for (const image of images) {
      await deleteImage(image.deletehash, accessToken)
    }
  } else {
    console.log("ℹ️ No images to delete from album")
  }
}

const printCreditLimit = async (accessToken: string): Promise<void> => {
  const url = "https://api.imgur.com/3/credits"
  const headers = { Authorization: `Bearer ${accessToken}` }
  const response = await fetch(url, { headers })

  if (!response.ok) {
    console.log(`❌ Failed to get credits: ${response.status}`)
    return
  }

  const data = await response.json()
  const credits = data.data
  console.log(`User Limit: ${credits.UserLimit}`)
  console.log(`User Remaining: ${credits.UserRemaining}`)
  console.log(`User Reset: ${credits.UserReset}`)
  console.log(`Client Limit: ${credits.ClientLimit}`)
  console.log(`Client Remaining: ${credits.ClientRemaining}`)
}

export const imgur = async (): Promise<void> => {
  const config = await loadConfig()
  const clientId = config.client_id
  const clientSecret = config.client_secret
  const albumId = "YoxqS7A"

  const accessToken = await getValidAccessToken(clientId, clientSecret)

  const imageOrder = config.image_order
  const imageInfo = await loadImageInfo()

  await deleteAllImagesFromAlbum(albumId, accessToken)
  console.log("✅ Finished Deletion")

  await uploadImagesInOrder(imageOrder, imageInfo, accessToken, albumId)
  console.log("✅ Finished Uploading")

  console.log()
  console.log("🎉 Success!!")
  console.log()
  await printCreditLimit(accessToken)
  console.log()
}

if (import.meta.url === `file://${process.argv[1]}`) {
  imgur().catch(console.error)
}
