# Astro formatting options

Astro support is automatic for files ending in `.astro`.

Core options such as `printWidth`, `semi`, `singleQuote`, `tabWidth`, `useTabs`, and `endOfLine` apply to Astro files.
Set `sortImports` to `true` to sort imports in Astro frontmatter with stock oxfmt.

Astro-specific options are:

- `astroAllowShorthand`: Retain or normalize matching shorthand attributes.
- `astroSkipFrontmatter`: Preserve frontmatter source when set to `true`.
- `astroCompressHTML`: Set template whitespace handling to `"jsx"`, `"html"`, or `"none"`.

Example:

```json
{
  "printWidth": 80,
  "semi": false,
  "sortImports": true,
  "astroAllowShorthand": true,
  "astroSkipFrontmatter": false,
  "astroCompressHTML": "jsx"
}
```
