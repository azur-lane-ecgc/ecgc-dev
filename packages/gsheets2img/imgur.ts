import fs from 'fs';
import path from 'path';
import { createInterface } from 'readline';
import axios from 'axios';
import open from 'open';
import FormData from 'form-data';

interface Config {
    client_id: string;
    client_secret: string;
    image_order: string[];
}

interface Tokens {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at?: string;
}

interface ImageInfo {
    path: string;
    title: string;
    description?: string;
}

function loadConfig(): Config {
    const configFile = "packages/gsheets2img/config.json";
    if (!fs.existsSync(configFile)) {
        const defaultConfig: Config = {
            client_id: "YOUR_CLIENT_ID",
            client_secret: "YOUR_CLIENT_SECRET",
            image_order: [],
        };
        fs.writeFileSync(configFile, JSON.stringify(defaultConfig, null, 2));
        console.log(`✨ Created default config at ${configFile}`);
        console.log("❗ Please edit it with your client_id and client_secret");
        return defaultConfig;
    }
    return JSON.parse(fs.readFileSync(configFile, 'utf-8'));
}

function loadTokens(): Tokens | null {
    const tokenFile = "packages/gsheets2img/tokens.json";
    if (!fs.existsSync(tokenFile)) {
        return null;
    }
    return JSON.parse(fs.readFileSync(tokenFile, 'utf-8'));
}

function saveTokens(tokens: Tokens): void {
    const tokenFile = "packages/gsheets2img/tokens.json";
    fs.mkdirSync(path.dirname(tokenFile), { recursive: true });
    tokens.expires_at = new Date(Date.now() + tokens.expires_in * 1000).toISOString();
    fs.writeFileSync(tokenFile, JSON.stringify(tokens, null, 2));
}

function loadImageInfo(): Record<string, ImageInfo> {
    return JSON.parse(fs.readFileSync("packages/gsheets2img/image_info.json", 'utf-8'));
}

function isTokenValid(tokens: Tokens | null): boolean {
    if (!tokens || !tokens.expires_at) {
        return false;
    }
    const expiresAt = new Date(tokens.expires_at);
    return new Date() < new Date(expiresAt.getTime() - 5 * 60 * 1000);
}

async function refreshAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<any> {
    const tokenUrl = "https://api.imgur.com/oauth2/token";
    const data = {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
    };
    const response = await axios.post(tokenUrl, data);
    return response.data;
}

function getAuthorizationUrl(clientId: string): string {
    return `https://api.imgur.com/oauth2/authorize?client_id=${clientId}&response_type=pin&state=APPLICATION_STATE`;
}

async function getTokens(clientId: string, clientSecret: string, pin: string): Promise<any> {
    const tokenUrl = "https://api.imgur.com/oauth2/token";
    const data = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "pin",
        pin: pin,
    };
    const response = await axios.post(tokenUrl, data);
    return response.data;
}

async function getValidAccessToken(clientId: string, clientSecret: string): Promise<string> {
    const storedTokens = loadTokens();

    if (storedTokens && isTokenValid(storedTokens)) {
        console.log("✅ Using existing valid access token");
        return storedTokens.access_token;
    }

    if (storedTokens && storedTokens.refresh_token) {
        console.log("🔄 Refreshing access token...");
        const newTokens = await refreshAccessToken(clientId, clientSecret, storedTokens.refresh_token);

        if (newTokens && newTokens.success !== false) {
            console.log("✅ Successfully refreshed access token");
            saveTokens(newTokens);
            return newTokens.access_token;
        } else {
            console.log("❌ Failed to refresh token, need new authorization");
        }
    }

    console.log("🔐 Need fresh authorization...");
    const authorizationUrl = getAuthorizationUrl(clientId);
    console.log(`Please go to this URL and authorize access: ${authorizationUrl}`);
    await open(authorizationUrl);

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const pin = await new Promise<string>((resolve) => {
        rl.question("Enter the pin obtained from the authorization URL: ", (answer) => {
            rl.close();
            resolve(answer);
        });
    });

    const tokens = await getTokens(clientId, clientSecret, pin);

    if (tokens.success !== false) {
        console.log("✅ Successfully obtained new tokens");
        saveTokens(tokens);
        return tokens.access_token;
    } else {
        throw new Error(`Failed to get tokens: ${JSON.stringify(tokens)}`);
    }
}

async function uploadImage(imageKey: string, imageRepository: Record<string, ImageInfo>, accessToken: string, albumId: string): Promise<any> {
    const imageInfo = imageRepository[imageKey];
    const relativeSubpath = imageInfo.path;
    const scriptDir = path.dirname(new URL(import.meta.url).pathname);
    const projectRoot = path.resolve(scriptDir, '..', '..', '..');
    const imagePath = path.join(projectRoot, relativeSubpath);

    if (!fs.existsSync(imagePath)) {
        console.log(`❌ File not found at ${imagePath}`);
        return { success: false, error: `File not found: ${imagePath}` };
    }

    const title = imageInfo.title;
    const description = imageInfo.description || title;
    const url = "https://api.imgur.com/3/upload";
    const headers = { Authorization: `Bearer ${accessToken}` };

    const imageFile = fs.createReadStream(imagePath);
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('album', albumId);
    formData.append('title', title);
    formData.append('description', description);

    try {
        const response = await axios.post(url, formData, { headers: { ...headers, ...formData.getHeaders() } });
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            status_code: error.response?.status,
            raw_text: error.response?.data,
        };
    }
}

async function uploadImagesInOrder(imageOrder: string[], imageRepository: Record<string, ImageInfo>, accessToken: string, albumId: string): Promise<void> {
    for (const imageKey of imageOrder) {
        const uploadResponse = await uploadImage(imageKey, imageRepository, accessToken, albumId);

        if (uploadResponse.success !== false) {
            console.log(`✅ Uploaded ${imageKey}`);
        } else {
            console.log(`❌ Failed ${imageKey}: ${JSON.stringify(uploadResponse)}`);
        }

        await new Promise(resolve => setTimeout(resolve, 150));
    }
}

async function deleteImage(deletehash: string, accessToken: string): Promise<any> {
    const url = `https://api.imgur.com/3/image/${deletehash}`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await axios.delete(url, { headers });
    return response.data;
}

async function deleteAllImagesFromAlbum(albumId: string, accessToken: string): Promise<void> {
    const url = `https://api.imgur.com/3/album/${albumId}/images`;
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await axios.get(url, { headers });

    if (response.status !== 200) {
        console.log(`❌ Failed to get album images: ${response.status}`);
        return;
    }

    const images = response.data.data;

    if (images.length > 0) {
        console.log(`🗑️  Deleting ${images.length} images from album...`);
        for (const image of images) {
            await deleteImage(image.deletehash, accessToken);
        }
    } else {
        console.log("ℹ️ No images to delete from album");
    }
}

async function printCreditLimit(accessToken: string): Promise<void> {
    const url = "https://api.imgur.com/3/credits";
    const headers = { Authorization: `Bearer ${accessToken}` };
    const response = await axios.get(url, { headers });

    if (response.status !== 200) {
        console.log(`❌ Failed to get credits: ${response.status}`);
        return;
    }

    const credits = response.data.data;
    console.log(`User Limit: ${credits.UserLimit}`);
    console.log(`User Remaining: ${credits.UserRemaining}`);
    console.log(`User Reset: ${credits.UserReset}`);
    console.log(`Client Limit: ${credits.ClientLimit}`);
    console.log(`Client Remaining: ${credits.ClientRemaining}`);
}

async function imgur(): Promise<void> {
    const config = loadConfig();
    const clientId = config.client_id;
    const clientSecret = config.client_secret;
    const albumId = "YoxqS7A";

    const accessToken = await getValidAccessToken(clientId, clientSecret);

    const imageOrder = config.image_order;
    const imageInfo = loadImageInfo();

    await deleteAllImagesFromAlbum(albumId, accessToken);
    console.log("✅ Finished Deletion");

    await uploadImagesInOrder(imageOrder, imageInfo, accessToken, albumId);
    console.log("✅ Finished Uploading");

    console.log();
    console.log("🎉 Success!!");
    console.log();
    await printCreditLimit(accessToken);
    console.log();
}

if (import.meta.url === `file://${process.argv[1]}`) {
    imgur().catch(console.error);
}