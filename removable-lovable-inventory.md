# Lovable.dev Removal Inventory

Generated: 2026-05-25
Branch: remove-lovable-branding

## Matches Found

| # | File | Line(s) | Match | Type | Action |
|---|------|---------|-------|------|--------|
| 1 | `src/routes/__root.tsx` | 32 | `title: "Lovable App"` | Meta tag - Branding | Replace with "LODE" |
| 2 | `src/routes/__root.tsx` | 33 | `description: "Lovable Generated Project"` | Meta tag - Branding | Replace with "LODE - AI Website Builder" |
| 3 | `src/routes/__root.tsx` | 34 | `author: "Lovable"` | Meta tag - Branding | Remove or replace with "LODE" |
| 4 | `src/routes/__root.tsx` | 35 | `og:title: "Lovable App"` | OG tag - Branding | Replace with "LODE" |
| 5 | `src/routes/__root.tsx` | 36 | `og:description: "Lovable Generated Project"` | OG tag - Branding | Replace with "LODE - AI Website Builder" |
| 6 | `src/routes/__root.tsx` | 39 | `twitter:site: "@Lovable"` | Twitter tag - Branding | Remove |
| 7 | `vite.config.ts` | 1-6 | Comment referencing `@lovable.dev/vite-tanstack-config` | Comment - Dependency | Remove entire comment block |
| 8 | `vite.config.ts` | 7 | `import { defineConfig } from "@lovable.dev/vite-tanstack-config"` | Import - Dependency | Replace with standard Vite plugins |
| 9 | `package.json` | 71 | `"@lovable.dev/vite-tanstack-config": "^1.3.0"` | devDependency | Remove from package.json |
| 10 | `package-lock.json` | 65 | `"@lovable.dev/vite-tanstack-config": "^1.2.0"` | Lockfile entry | Regenerate lockfile |
| 11 | `package-lock.json` | 1771-1773 | `node_modules/@lovable.dev/vite-tanstack-config` + resolved URL | Lockfile entry | Regenerate lockfile |
| 12 | `package-lock.json` | 1778 | `lovable-tagger: "1.1.13"` | Lockfile dependency | Regenerate lockfile |
| 13 | `package-lock.json` | 7184-7186 | `node_modules/lovable-tagger` + resolved URL | Lockfile entry | Regenerate lockfile |
| 14 | `package-lock.json` | 7198, 7211, 7221 | `lovable-tagger/node_modules/*` | Lockfile transitive deps | Regenerate lockfile |
| 15 | `bun.lockb` | (binary) | Contains "lovable" strings | Binary lockfile | Regenerate with `bun install` |
| 16 | `package-lock.json` | (URLs) | `europe-west1-npm.pkg.dev/lovable-core-prod/...` | Package registry URLs | Regenerate lockfile |

## Summary

- **Source files to edit**: 3 (`__root.tsx`, `vite.config.ts`, `package.json`)
- **Lockfiles to regenerate**: 2 (`package-lock.json`, `bun.lockb`)
- **Total unique Lovable references**: 16 (across 5 files)
- **No Lovable logos, images, or assets found** in the repository
- **No README.md or documentation files** with Lovable references
- **No .github directory** or CI workflow files with Lovable references
- **No secrets or API keys** with Lovable domain references found
