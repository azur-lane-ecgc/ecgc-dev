# Audit React islands

Date: 2026-11-11.

## Scan the frontend

React Doctor `0.9.22` detects Astro and React 19. The initial full scan analyzes
210 files and reports 82 warnings, with no errors. The final full scan analyzes
222 files and reports two reviewed warnings, with no errors. Both scans complete
without skipped checks. The scan includes React source and supported Astro scripts.
A separate changed-scope regression scan checks 43 files and reports no findings.

Use this command from the repository root:

```bash
bunx react-doctor@0.9.22 --project apps/web --scope full --json --blocking none --yes --no-telemetry --no-supply-chain
```

Remote scoring, share links, crash reporting, and the external supply-chain
service are disabled. Neither scan provides a numerical health score.

## Apply the fixes

- Replace modal trigger elements with native buttons. Keep note links outside buttons.
- Use native dialogs for focus containment, keyboard dismissal, and backdrop dismissal.
- Restore trigger focus and release body scroll locks before removing dialog elements.
- Separate modal totals, drops, equipment, and rankings into focused components.
- Deliver debounced input and selection events without effect-driven parent updates.
- Cancel pending control events when controls reset or unmount.
- Give inputs, clear buttons, navigation controls, and tag controls accessible names.
- Use semantic keys for resources, ships, rankings, navigation, tools, and menu options.
- Share sortable table headings while keeping domain-specific comparators separate.
- Use native buttons for table sorting and carousel controls.
- Derive ship results synchronously from typed filter actions instead of copying them through an effect.
- Separate ship filtering and ranking controls into their owning modules.
- Throttle scroll-button updates and remove listeners during Astro navigation.

## Verify functionality

Temporary verification runs preserve exact results and order for 176 ship-filter
scenarios. Fourteen control behavior checks cover debounce delivery, current
callbacks, reset cancellation, selection, search, and forced selection.
Ranking parity checks preserve all 42 main-fleet and vanguard table columns,
including labels, values, order, and color-function arguments.

Production browser checks cover these scenarios:

| Scenario                                                                           | Result |
| ---------------------------------------------------------------------------------- | ------ |
| Search ships, clear filters, select fleet, and enable ranking controls             | Pass   |
| Open ship and resource dialogs with Enter and Space                                | Pass   |
| Contain keyboard focus and restore trigger focus after dismissal                   | Pass   |
| Dismiss with Escape, close control, and backdrop                                   | Pass   |
| Clear resource hashes and dismiss resource dialogs with browser Back               | Pass   |
| Sort tools with Enter and Space through ascending, descending, and unsorted states | Pass   |
| Activate fleet-technology sorting after its Astro island hydrates                  | Pass   |
| Pause the carousel, change slides, and toggle captions with the keyboard           | Pass   |
| Open mobile navigation, select mobile fleet options, and toggle mobile ship tags   | Pass   |

Desktop captures use 1920×1080. Mobile captures use 390×844. Captures remain
under the ignored `.agent-screenshots/react-doctor/screenshots/` directory.
The shared browser snapshot operation times out twice. Headless Agent Browser
provides the runtime evidence instead. No browser exceptions or console errors
appear during the completed scenarios.

## Retain explicit limits

The two remaining findings are explained in `false-positives.md`. They remain
visible in normal scans. The generated JSON chunk-size warning remains accepted
and visible. This audit does not replace a dependency supply-chain review or
measure field performance. It adds no test runner or permanent test fixtures.

Type checks, Oxlint with denied warnings, Oxfmt, Knip, the frontend production
build, and the local Cloudflare output build pass. Validation does not push code,
upload previews, or deploy the site.
