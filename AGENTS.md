# ECGC-Dev Agent Guidelines

## Build, Lint & Test Commands

### Build Commands

- **Full build with type checking**: `bun run build`
- **Development build**: `bun run dev`
- **Compressed production build**: `bun run compress-build`
- **"DB" generation**: `bun run devtools`

### Code Quality Commands

- **Lint**: `bun run lint` (uses oxlint)
- **Format code**: `bun run format` (prettier with astro, tailwind, import organization)
- **Format specific files**: `bun run smol-format`

### Testing

- **Type checking**: Automatic during `bun run build` via `astro check`
- **No dedicated test runner** - Manual testing recommended for UI components

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode**: Enabled via `astro/tsconfigs/strict`
- **JSX**: `react-jsx` with `react` as import source
- **Module resolution**: ES modules with JSON module support
- **Path aliases**: Use `@/` prefixes for clean imports:
  - `@/components/*` → `packages/frontend/src/components/*`
  - `@/utils/*` → `packages/frontend/src/utils/*`
  - `@/assets/*` → `packages/frontend/src/assets/*`
  - `@/tools/*` → `packages/dev/src/*`

### Formatting (Prettier)

- **Semicolons**: Disabled (`semi: false`)
- **Quotes**: Double quotes (`singleQuote: false`)
- **Trailing commas**: All (`trailingComma: "all"`)
- **Indentation**: 2 spaces (`tabWidth: 2`, `useTabs: false`)
- **Line endings**: LF (`endOfLine: "lf"`)
- **Plugins**: astro, tailwindcss, organize-imports, astro-organize-imports

### Naming Conventions

- **Files**: PascalCase for components (`.tsx`, `.astro`), camelCase for utilities
- **Components**: PascalCase (e.g., `ComboBox`, `ShipModal`)
- **Functions**: camelCase (e.g., `extractBaseName`, `processSheet`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `SERVICE_ACCOUNT_FILE`)
- **Types/Interfaces**: PascalCase (e.g., `ComboBoxProps`)

### Import Organization

- **External libraries first**, then internal imports
- **Group by type**: React imports, then utilities, then components
- **Use path aliases** instead of relative imports
- **Auto-organized** by prettier-plugin-organize-imports

### Error Handling

- **Async functions**: Use try/catch with descriptive error messages
- **API calls**: Handle failures gracefully with user feedback
- **Validation**: Check for null/undefined values before processing
- **Logging**: Use `console.error` for errors, `console.log` for info

### React/TypeScript Patterns

- **Functional components** with TypeScript interfaces
- **Hooks**: `useState`, `useEffect`, `useRef` as primary patterns
- **Props**: Strongly typed interfaces for all component props
- **Event handlers**: Arrow functions or named functions
- **Conditional rendering**: Use logical AND (`&&`) or ternary operators
- **Lists**: Always use `key` props with stable identifiers

### File Organization

- **Components**: Group by feature in subdirectories
- **Utilities**: Organized by domain (`commonResource/`, `factionLink/`)
- **Types**: Separate `.d.ts` files or inline interfaces
- **Constants**: Dedicated files like `constants/index.ts`

### Astro-Specific Guidelines

- **Framework**: Astro for static site generation
- **Component mixing**: Combine `.astro`, `.tsx`, `.jsx` as needed
- **Frontmatter**: Use for component-scoped logic
- **Imports**: Follow same organization as React components

### Performance Considerations

- **Bundle optimization**: Automatic via Astro build
- **Image handling**: Use Astro's built-in image optimization
- **Lazy loading**: Implement for large lists/components
- **Memoization**: Use `React.memo` for expensive components

### Security Best Practices

- **Secrets**: Never commit credentials or API keys
- **Input validation**: Sanitize user inputs
- **API keys**: Store in environment variables or secure config files
- **HTTPS**: Use HTTPS URLs for external resources

### Git Workflow

- **Pre-commit hooks**: `lefthook` manages formatting/linting
- **Branch naming**: Descriptive feature branch names
- **Commit messages**: Clear, descriptive messages
- **Pull requests**: Include context and testing notes
