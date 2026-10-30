# UI sources

Installed through the shadcn CLI on 2026-10-30:

| Source | Components | Role |
| --- | --- | --- |
| https://ui.shadcn.com | Badge, Card, Tabs, Input, Textarea, Label, Dialog, Dropdown Menu | Accessible controls |
| https://ui.aceternity.com/components/spotlight | Spotlight | Hero lighting |
| https://magicui.design | Dot Pattern, Border Beam, Marquee | Background, featured border, technology strip |
| https://www.cult-ui.com/docs/components/minimal-card | Minimal Card family | Content cards |

The existing Button is a local Radix Slot/CVA implementation compatible with the
project's shadcn configuration. It was not downloaded from the registry.

`components/design/hover-skill-card.tsx` is original project code inspired by the
interaction category at https://www.hover.dev/components/cards; it is not an
installed Hover.dev component or copied Pro code. No commercial templates bought.

Adaptations: corrected registry imports from `cn` to `@/lib/utils`, mapped neutral
colors to project semantic tokens, added reduced-motion handling, shortened the
Spotlight entrance, and used Next Image in the Cult image component.

The official shadcn skill comes from `shadcn-ui/ui`, path `skills/shadcn`.
The Deep Ocean skill is project-authored from the user's specification and UI
library choices; it is not an official skill from those libraries.
