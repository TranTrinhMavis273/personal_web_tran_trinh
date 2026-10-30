# Visual direction — icons, decoration, glass and light theme

Figma: https://www.figma.com/design/DPx0FJ3mVSq4gpYGPqwQnm/

Added 2026-10-30. The file now includes the original six dark wireframe pages,
six corresponding light pages (`L01`–`L06`, 24 screens), and
`00 — Icons · Glass · Themes` with side-by-side hero studies, 20 Lucide icon
specimens, four decorative-element studies, palette mappings and effect recipes.
Total screen wireframes: 48, excluding the visual-direction specimens.

## Icon system

- Primary: [Lucide](https://lucide.dev/guide/), already installed in the project.
  Use 16–20 px in controls, 24 px in navigation, and 28–32 px in capability cards.
  The visual study uses 1.75 px strokes, round caps and joins.
- Secondary: [Simple Icons](https://simpleicons.org/), recommended only for
  authentic technology logos. It is not installed by this design task.
- UI mapping: House / navigation, FolderKanban / projects, Workflow / automation,
  BrainCircuit / AI, Database / data, ChartNoAxesCombined / metrics, ShieldCheck /
  risk governance, GitBranch / system flows, BookOpen / articles, BriefcaseBusiness
  / experience, GraduationCap / education, Award / credentials, FileDown / CV,
  Mail / contact, Search / search, Sun and Moon / theme, ArrowUpRight / outgoing CTA.
- Pair unfamiliar icons with labels. Icon-only controls need accessible names.
- `assets/lucide-icons.json` contains SVGs exported from the installed package.
  Preserve the upstream license: https://lucide.dev/license.

## Light theme — Ocean Light

| Semantic role | Dark | Light |
| --- | --- | --- |
| Background | `#0A0A3A` | `#FEFDF8` |
| Surface | `#10104A` | `#FFFFFF` |
| Primary text | `#FEFDF8` | `#0A0A3A` |
| Muted text | `#D1D0CA` | `#555B70` |
| Primary action | `#05308C` | `#05308C` |
| Accent / destructive | `#AD1F23` | `#AD1F23` |
| Border | `#1C1C66` | `#D7DFF0` |

Primary buttons and selected blue chips retain cream text in both themes.
CV previews remain light documents. Error messages use readable red in light mode.
The light boards preserve the content structure of their dark counterparts.

## Decorative elements

- Sparse dot matrix: technical texture on hero/background edges, outside body text.
- Orbital rings: a single cluster framing a portrait or technical focal point.
- Soft spotlight: one diffuse blue source per hero/CTA, lower opacity in light mode.
- System connectors: purposeful flow lines and nodes for case studies/timelines.
- Border Beam: optional 1 px moving highlight on a featured card, 10–14 s cycle.
  References: https://magicui.design/docs/components/border-beam and
  https://ui.aceternity.com/components/glowing-effect.

## Glass and lighting recipe

| Setting | Dark | Light |
| --- | --- | --- |
| Glass fill | Surface at 72% | White at 78% |
| Glass border | Cream at 18% | White at 85% plus subtle outer edge |
| Backdrop blur target | 20 px | 20 px |
| Corner radius | 20–24 px | 20–24 px |
| Padding | 24–32 px | 24–32 px |
| Blue halo target | 20–30% | 6–10% |

Use glass for navigation, a hero floating card and selected CTAs. Long reading
content and data tables use solid surfaces. Keep foreground text at full opacity.
The SVG/Figma glass study uses translucent vector layers and radial gradients;
it does not claim a native live backdrop-blur effect or working animation.
Apply real `backdrop-filter: blur(20px)` with a solid-surface fallback during UI
implementation, and check contrast against the actual composited background.

Hover guidance: lift 2–4 px over 200–300 ms; optional tilt at most 3 degrees.
Honor reduced-motion preferences by stopping loops and retaining border/focus
feedback. The theme switch should follow system preference initially and remember
an explicit choice; that behavior is a future implementation step.

## Source artifacts

- `assets/visual-direction.svg`: editable vector visual-direction study.
- `assets/lucide-icons.json`: 20 source icon SVGs.
- `wireframes-light/01-wireframes.svg` through `06-wireframes.svg`: 24 light screens.
- Each new Figma page was inspected after import; source SVGs were checked for
  valid XML, logical screen counts, and absence of rasterized UI.

This task changes design artifacts, not the Next.js application's runtime theme.
