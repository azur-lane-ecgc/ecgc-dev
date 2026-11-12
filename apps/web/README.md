# Build the static website

Run `bun run cf-build` from the repository root to build and compress the website.
The command also creates Cloudflare Build Output locally. It does not upload assets.

`cloudflare.config.ts` defines the static website's Worker settings.
`wrangler.config.ts` selects `./dist` as the asset directory.
No Worker entrypoint or Astro adapter is required.

The new configuration imports `cf/config` and `wrangler/experimental-config`.
Keep both CLI packages as development dependencies and run them through Node.

The local build uses Cloudflare's `cf-wrangler` backend directly because
`cf build` selects `astro build`, which does not create Cloudflare Build Output
for this static site. Deployment commands use `--prebuilt` to upload that output.

See [Cloudflare's project commands](https://developers.cloudflare.com/cf/projects/)
and [Astro's static configuration](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/#if-you-have-a-static-site).
