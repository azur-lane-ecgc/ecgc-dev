# Review React Doctor findings

These findings remain visible. No rules or diagnostic categories are disabled.
Recheck each decision when its source or content provenance changes.

## React DOM property markers

- Rule: `react-doctor/insecure-crypto-risk`.
- Scope: `.cloudflare/output/v0/workers/default/assets/_astro/client.*.js`.
- Evidence: React DOM uses `Math.random().toString(36).slice(2)` for internal
  property prefixes, including `__reactFiber$`, `__reactProps$`, and
  `__reactContainer$`.
- Decision: rejected. These markers identify DOM properties. They do not
  generate secrets, authentication tokens, or cryptographic keys.
- Recheck condition: the expression becomes application code or its value
  enters a security-sensitive operation.

## Author-controlled ship trigger notes

- Rule: `react-doctor/dangerous-html-sink`.
- Source: `src/components/_common/ShipModal/ShipModal.tsx`, `descriptionNote`.
- Evidence: `SamvaluationModals` constructs rank notes from numeric ranking
  data. `FastLoadShipList.astro` reads generated ship conditions.
  `SubmarineTable.astro` reads checked-in category definitions. These sources
  deliberately include author-supplied links and formatting.
- Decision: rejected for the current static content boundary. Request values,
  URL parameters, browser storage, and visitor input do not supply these notes.
  Rendering notes as plain text would remove existing links and formatting.
- Recheck condition: notes accept visitor content or a new runtime data source.

The audit uses React Doctor `0.9.22`. The remote rule prompts identify plugin
version `0.9.3`; local `rules explain` output and source evidence determine
applicability. The warning count does not represent confirmed vulnerabilities.
