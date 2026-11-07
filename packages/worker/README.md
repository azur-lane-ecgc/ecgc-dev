# Build the static Worker

Run `bun run cf-build` from the repository root to build and compress the website.
Then run `bun run --filter worker build` to create Cloudflare Build Output locally.

The separate Worker workspace prevents cf from selecting Astro's build command,
which does not produce Cloudflare Build Output for this static site.
`cloudflare.config.ts` defines Worker settings. `wrangler.config.ts` selects the
built website assets. Wrangler remains the build backend required by cf.

Run cf through Node, as the package scripts do. Bun installs dependencies but
cannot load Cloudflare's programmatic configuration.
