# Project context

This is a local Next.js portfolio/CMS targeting Supabase and Vercel. Do not migrate
hosting/frameworks while implementing visual changes.

For UI work, read `.agents/skills/deep-ocean-portfolio/SKILL.md` and the installed
`.agents/skills/shadcn/SKILL.md`. Follow the Vietnamese technical specification.
For light/dark theme decisions, icons and effects, also read
`design/VISUAL-DIRECTION.md`; its light-theme additions extend the original dark
brand specification. Do not treat design mockups as implemented runtime behavior.

Use the registries in `components.json`. Installed component source lives in
`components/ui`; provenance and modifications are listed in `docs/ui-sources.md`.
Keep design preview examples in `/design-system`, separate from real case studies.
Never invent achievements, metrics, credentials or employer logos.

Run appropriate typecheck, lint and build checks after source changes. Keep
`.env.local` ignored. The requested GitHub remote is `origin`.
