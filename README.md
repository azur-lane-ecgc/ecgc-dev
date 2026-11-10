# ECGC

Sam's English Community Guide Compendium for Azur Lane

Link: [azurlaneecgc.com/](https://azurlaneecgc.com/)

If there are any questions, concerns, or feedback, DM me on discord @samheart564.  
Join our [Discord Server](https://discord.gg/wKJKxq5WQt)!

## License

Read [LICENSE.md](./LICENSE.md) for Copyright / License related information.

## Star History

<a href="https://www.star-history.com/#azur-lane-ecgc/ecgc-dev&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=azur-lane-ecgc/ecgc-dev&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=azur-lane-ecgc/ecgc-dev&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=azur-lane-ecgc/ecgc-dev&type=Date" />
 </picture>
</a>

## Configure Umami analytics

Set `PUBLIC_UMAMI_BASE_URL` to your Umami HTTPS origin and
`PUBLIC_UMAMI_WEBSITE_ID` to the ECGC website ID before building. For local
builds, use the ignored `apps/web/.env.local` file. For production GitHub
Actions builds, set repository secrets with these names. Missing values
disable analytics. The origin and website ID become public in built HTML;
never use an administrator password or API token here.

Both page layouts load the same deferred Umami tracker. The tracker records
page views and client-side navigation without cookies. It runs only on
`azurlaneecgc.com` and `www.azurlaneecgc.com`, so local and preview visits
do not enter production statistics. Astro preserves the script during page
transitions to prevent duplicate tracker initialization.
