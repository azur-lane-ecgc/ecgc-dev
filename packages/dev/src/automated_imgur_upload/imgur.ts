import path from "path"
import open from "open"
import { stdin } from "node:process"

const CONFIG_FILE = path.join(import.meta.dir, "config.json")
const TOKENS_FILE = path.join(import.meta.dir, "tokens.json")
const IMAGE_INFO_FILE = path.join(import.meta.dir, "image_info.json")

interface Config {
  client_id: string
  client_secret: string
  image_order: string[]
}

interface Tokens {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
  refresh_token: string
  account_id: number
  account_username: string
  expires_at: string
}

interface ImgurTokenResponse extends Tokens {
  success?: boolean
}

const loadConfig = async (): Promise<Config> => {
  const configFile = Bun.file(CONFIG_FILE)
  if (!(await configFile.exists())) {
    const defaultConfig: Config = {
      client_id: "YOUR_CLIENT_ID",
      client_secret: "YOUR_CLIENT_SECRET",
      image_order: [],
    }
    await Bun.write(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2))
    console.log(`✨ Created default config at ${CONFIG_FILE}`)
    console.log("❗ Please edit it with your client_id and client_secret")
    return defaultConfig
  }
  return await configFile.json()
}

const loadTokens = async (): Promise<Tokens | null> => {
  const tokenFile = Bun.file(TOKENS_FILE)
  if (!(await tokenFile.exists())) {
    return null
  }
  return await tokenFile.json()
}

const saveTokens = async (tokens: Tokens) => {
  tokens.expires_at = new Date(
    new Date().getTime() + tokens.expires_in * 1000,
  ).toISOString()
  await Bun.write(TOKENS_FILE, JSON.stringify(tokens, null, 2))
}

const loadImageInfo = async (): Promise<Record<string, any>> => {
  const imageInfoFile = Bun.file(IMAGE_INFO_FILE)
  return await imageInfoFile.json()
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
): Promise<ImgurTokenResponse | null> => {
  const tokenUrl = "https://api.imgur.com/oauth2/token"
  const data = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
  })

  const response = await fetch(tokenUrl, { method: "POST", body: data })
  if (response.ok) {
    return (await response.json()) as ImgurTokenResponse
  }
  return null
}

const getAuthorizationUrl = (clientId: string): string => {
  return `https://api.imgur.com/oauth2/authorize?client_id=${clientId}&response_type=pin&state=APPLICATION_STATE`
}

const getTokens = async (
  clientId: string,
  clientSecret: string,
  pin: string,
): Promise<ImgurTokenResponse> => {
  const tokenUrl = "https://api.imgur.com/oauth2/token"
  const data = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "pin",
    pin: pin,
  })
  const response = await fetch(tokenUrl, { method: "POST", body: data })
  return (await response.json()) as ImgurTokenResponse
}

const getValidAccessToken = async (
  clientId: string,
  clientSecret: string,
): Promise<string> => {
  let storedTokens = await loadTokens()

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

    if (newTokens && (newTokens.success === undefined || newTokens.success)) {
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

  console.log("Enter the pin obtained from the authorization URL: ")
  let pin = ""
  for await (const chunk of stdin) {
    pin = chunk.toString().trim()
    break
  }

  const tokens = await getTokens(clientId, clientSecret, pin)

  if (tokens.success === undefined || tokens.success) {
    console.log("✅ Successfully obtained new tokens")
    await saveTokens(tokens)
    return tokens.access_token
  } else {
    throw new Error(`Failed to get tokens: ${JSON.stringify(tokens)}`)
  }
}

const uploadImage = async (
  imageKey: string,
  imageRepository: Record<string, any>,
  accessToken: string,
  albumId: string,
): Promise<any> => {
  const imageInfo = imageRepository[imageKey]
  const imagePath = imageInfo.path

  const imageFile = Bun.file(imagePath)
  if (!(await imageFile.exists())) {
    console.log(`❌ File not found at ${imagePath}`)
    return { success: false, error: `File not found: ${imagePath}` }
  }

  const title = imageInfo.title
  const description = imageInfo.description || title
  const url = "https://api.imgur.com/3/upload"
  const headers = { Authorization: `Bearer ${accessToken}` }

  const formData = new FormData()
  formData.append("image", new Blob([await imageFile.arrayBuffer()]))
  formData.append("album", albumId)
  formData.append("title", title)
  formData.append("description", description)

  const response = await fetch(url, { method: "POST", headers, body: formData })

  try {
    return await response.json()
  } catch (e) {
    return {
      success: false,
      status_code: response.status,
      raw_text: await response.text(),
    }
  }
}

const uploadImagesInOrder = async (
  imageOrder: string[],
  imageRepository: Record<string, any>,
  accessToken: string,
  albumId: string,
) => {
  for (const imageKey of imageOrder) {
    const uploadResponse: any = await uploadImage(
      imageKey,
      imageRepository,
      accessToken,
      albumId,
    )

    if (uploadResponse.success) {
      console.log(`✅ Uploaded ${imageKey}`)
    } else {
      console.log(`❌ Failed ${imageKey}: ${JSON.stringify(uploadResponse)}`)
    }

    await new Promise((resolve) => setTimeout(resolve, 150))
  }
}

const deleteImage = async (deletehash: string, accessToken: string) => {
  const url = `https://api.imgur.com/3/image/${deletehash}`
  const headers = { Authorization: `Bearer ${accessToken}` }
  const response = await fetch(url, { method: "DELETE", headers })
  return await response.json()
}

const deleteAllImagesFromAlbum = async (albumId: string, accessToken: string) => {
  const url = `https://api.imgur.com/3/album/${albumId}/images`
  const headers = { Authorization: `Bearer ${accessToken}` }
  const response = await fetch(url, { headers })

  if (!response.ok) {
    console.log(`❌ Failed to get album images: ${response.status}`)
    return
  }

  const result: any = await response.json()
  const images = result.data

  if (images && images.length > 0) {
    console.log(`🗑️  Deleting ${images.length} images from album...`)
    for (const image of images) {
      await deleteImage(image.deletehash, accessToken)
    }
  } else {
    console.log("ℹ️ No images to delete from album")
  }
}

const printCreditLimit = async (accessToken: string) => {
  const url = "https://api.imgur.com/3/credits"
  const headers = { Authorization: `Bearer ${accessToken}` }
  const response = await fetch(url, { headers })

  if (!response.ok) {
    console.log(`❌ Failed to get credits: ${response.status}`)
    return
  }

  const result: any = await response.json()
  const credits = result.data
  console.log(`User Limit: ${credits.UserLimit}`)
  console.log(`User Remaining: ${credits.UserRemaining}`)
  console.log(`User Reset: ${credits.UserReset}`)
  console.log(`Client Limit: ${credits.ClientLimit}`)
  console.log(`Client Remaining: ${credits.ClientRemaining}`)
}

export const main = async () => {
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
