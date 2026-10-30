# UI implementation

The UI follows the 24 dark and 24 light wireframe compositions in `design/`.
The Figma editing/inspection tools were not exposed during implementation, so
the locally saved SVG source boards, prior Figma screenshots and agreed visual
direction were used as the source of truth. Complete-page SVGs/screenshots are
not embedded as implementation assets; layouts are responsive React components.

## Structure

- `app/(public)` — public routes and shared public shell.
- `app/(admin)/admin` — preview CMS, list/detail/editor routes and profile settings.
- `components/site` — public content, cards, typography, navigation and visual studies.
- `components/admin` — CMS workspace, lists, editors and inquiry states.
- `components/forms/controls.tsx` — shared labeled form controls and validation errors.
- `components/providers.tsx` — next-themes, MotionConfig, notifications and validated
  local preview state, including storage error handling and cross-tab updates.
- `lib/content.ts` — content models, sample fixtures and Zod schemas.
- `app/api/contact/route.ts` — server validation and optional external contact pipeline.
- `tests/content.test.mjs` — input/schema boundary and unsafe URL/PDF validation checks.

## Design decisions

- Fonts are bundled through Fontsource instead of fetched from Google at build time.
- Lucide is the UI icon family; actual Simple Icons paths represent technologies.
- CSS variables carry light/dark semantic colors. Red action fills stay brand red;
  dark-mode error text uses a lighter tint for legibility.
- Glass/navigation and the hero floating card use a real 20px backdrop blur with
  an opaque fallback. Dot/orbit/halo decoration is code-native and noninteractive.
- Border Beam is restricted to the first featured project; reduced motion disables
  decorative loops, lifts and entrance animation. Long-form content uses solid surfaces.
- The supplied transparent portrait is used on Home and About; the missing CV remains an honest placeholder. Sample case studies are labeled;
  no real employer logos, awards, credentials or impact measurements are invented.
- Public filtered-empty, loading, invalid input, service unavailable and not-found
  UI are included. Mobile navigation uses an accessible Radix Sheet.

## Preview CMS boundary

CMS state is an explicitly labeled, browser-local preview, not production auth or
a cloud persistence layer. Publishing changes the local public preview. All new
preview records remain marked as sample content. Data resets only after confirmation.
The remote Supabase/Resend services have not been enabled or migrated by this task.

Dynamic public detail routes resolve browser-local content to support newly created
preview records. An unknown project/article slug shows an unavailable-content state;
production DB-backed detail lookups should return HTTP 404 from the server instead.

## Validation

Run `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build`.
The browser QA pass covers theme persistence, public search/filter empty states,
Mermaid, content editing, inquiry status changes and responsive layouts.
No production authentication, cloud writes or email delivery is claimed by these
checks. Actual test results are reported with the delivery.


### Verified on 2026-10-30

- `npm test`: 6/6 passed. Node prints a non-failing module-type warning for the TypeScript test import.
- Final production build passed, including ESLint and TypeScript validation.
- HTTP smoke: 16 public/admin routes returned 200; malformed JSON/invalid contact input returned 400, oversized body returned 413.
- Browser: light/dark switching and dark-theme persistence after reload, project search/empty/filter states, rendered Mermaid SVG, Markdown split preview, mobile navigation.
- CMS: create draft, reload with comma-separated technologies intact, publish to local public preview, then remove the QA record; inquiry New/Contacted/Archived/New flow.
- Responsive checks at 390px viewport: home, project index/detail, contact, project editor and inquiry detail. Project/detail/contact/editor checks showed no document-level horizontal overflow.
- No browser console errors observed in the checked production flows. This is a focused browser QA pass, not an exhaustive accessibility audit or cloud integration test.
- Desktop screenshots are saved in the Codex visualization workspace for this chat.
