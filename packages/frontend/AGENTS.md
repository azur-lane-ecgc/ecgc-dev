# Frontend Package Agent Guidelines

## Overview

This is the main Astro-based frontend application for the ECGC project. It provides a static site with Azur Lane game data, ship information, guides, and interactive components. The site includes ship databases, equipment guides, farming calculators, and various tools for Azur Lane players.

## Build Commands

- **Development server**: `bun run dev` (serves at http://localhost:4321)
- **Full build**: `bun run build` (includes type checking via `astro check`)
- **Compressed build**: `bun run compress-build` (production optimized with compression)
- **Cloudflare dev**: `bun run cf-dev` (with Cloudflare Wrangler for edge deployment)
- **Preview build**: `bun run preview` (preview production build locally)

## Tech Stack

- **Framework**: Astro 4.x with React integration for interactive components
- **Styling**: Tailwind CSS with custom utilities
- **TypeScript**: Strict mode enabled with path aliases
- **Components**: Mix of `.astro` (static), `.tsx` (interactive), and `.jsx` files
- **Path aliases**: `@/` for clean imports (configured in `astro.config.ts`)
- **State Management**: React hooks with optional stores for complex state
- **Icons**: FontAwesome via custom CSS imports

## Key Directories

- `src/components/_common/`: Shared UI components (buttons, modals, tables, etc.)
- `src/components/[Feature]/`: Feature-specific components (e.g., Ships/, Equipment/)
- `src/pages/`: Astro page components with file-based routing
- `src/layouts/`: Page layout templates (guides, homepage, etc.)
- `src/utils/`: Utility functions organized by domain (commonResource/, factionLink/, etc.)
- `src/assets/`: Static assets including farming guides, fleetbuilding guides, and images
- `src/store/`: State management stores (e.g., CommonResource/)
- `src/db/`: Processed data from dev scripts (EHP rankings, ship data, etc.)
- `src/styles/`: Global styles, Tailwind config, and FontAwesome setup

## Component Patterns

- Use functional components with TypeScript interfaces for all props
- Strongly type all props with dedicated interfaces (e.g., `ComboBoxProps`)
- Prefer React hooks: `useState`, `useEffect`, `useRef`, `useMemo`
- Implement lazy loading for large lists using `React.lazy` or virtual scrolling
- Use `React.memo` for expensive components to prevent unnecessary re-renders
- Handle loading states with skeleton components or spinners
- Implement error boundaries for robust error handling

## Data Integration

- Consumes JSON data processed by `packages/dev` scripts (ships, equipment, rankings)
- Data stored in `src/db/` (EHP, rankings) and `src/assets/` (guides, images)
- Use efficient data structures (Maps, Sets) for large datasets
- Implement proper loading states and error boundaries for data fetching
- Cache static data in memory to avoid repeated processing

## Key Pages and Features

- **Ship Database**: Comprehensive ship listings with filters and search
- **Equipment Guides**: Augment, retrofit, and gear recommendations
- **Farming Calculators**: Resource planning and drop rate tools
- **Fleet Building**: Ship composition and strategy guides
- **Rankings**: End-game fleet rankings and EHP calculations
- **Changelog**: Version history and update notes

## Performance Considerations

- Leverage Astro's static generation for fast loading pages
- Optimize images with Astro's built-in optimization and responsive images
- Implement code splitting for large bundles using dynamic imports
- Monitor bundle size with `bun run build` and optimize accordingly
- Use lazy loading for images and components to improve initial load times

## Testing & Quality

- Type checking: Automatic during `bun run build` via `astro check`
- Manual testing: Recommended for UI components and user flows
- Code quality: Run `bun run lint` (oxlint) and `bun run format` (Prettier) before commits
- Pre-commit hooks: lefthook manages automatic formatting and linting
- Accessibility: Ensure components are keyboard navigable and screen reader friendly

## Deployment

- Built as static site for Cloudflare Workers
- Use `bun run compress-build` for production with asset optimization
- Deploy via Cloudflare Wrangler or GitHub Actions workflows
- Ensure all assets are properly optimized and cached

See root [AGENTS.md](../../AGENTS.md) for general coding standards and additional guidelines.
