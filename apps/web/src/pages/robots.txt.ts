// @ts-nocheck
import type { APIRoute } from "astro"

const GOOGLE_BOTS = [
  "Googlebot",
  "Googlebot-Image",
  "Googlebot-News",
  "Googlebot-Video",
  "Mediapartners-Google",
  "AdsBot-Google",
  "AdsBot-Google-Mobile",
  "APIs-Google",
  "Google-Read-Aloud",
  "DuplexWeb-Google",
  "FeedFetcher-Google",
]

const getRobotsTxt = (sitemapURL: URL) => {
  let rules = ""

  for (const bot of GOOGLE_BOTS) {
    rules += `User-agent: ${bot}\nDisallow:\n\n`
  }

  rules += `User-agent: *\nDisallow: /\n\n`
  rules += `Sitemap: ${sitemapURL.href}\n`

  return rules
}

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site)
  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
