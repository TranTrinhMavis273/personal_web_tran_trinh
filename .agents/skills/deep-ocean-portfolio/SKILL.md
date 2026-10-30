---
name: deep-ocean-portfolio
description: Build and refine the Deep Ocean visual identity of this Technical PM portfolio using Aceternity, Magic UI, shadcn, Cult UI and restrained Hover.dev-inspired interactions. Use for UI design and implementation in this project.
---

# Deep Ocean portfolio

Follow the Vietnamese technical specification at the project root. This is a
project-authored skill, not an official skill of the component libraries.

## Visual decisions

- Steel Marine #0A0A3A background; #10104A surfaces; #1C1C66 borders.
- Deep Sea Blue #05308C for primary actions and atmospheric glow.
- Lobster Red #AD1F23 for selective emphasis; Claw Cream #FEFDF8 text and
  #D1D0CA secondary text. Use semantic tokens in app/globals.css.
- Keep generous negative space, legible text, technical diagrams and clear
  hierarchy. Never fabricate metrics, employers, awards or project outcomes.
- Plus Jakarta Sans and JetBrains Mono are intended typography; the current
  scaffold uses system fallbacks until fonts are bundled.

## Library choices

Use the official registries configured in components.json and inspect existing
components before adding new ones. Preserve provenance in docs/ui-sources.md.

- Aceternity: Spotlight/Background Beams for the hero, subtle project emphasis.
- Magic UI: Dot Pattern, Border Beam, Marquee, bento layouts and process surfaces.
- shadcn: keyboard-accessible navigation, controls, dialogs, filters and forms.
- Cult UI: composable content cards and focused micro-interactions.
- Hover.dev: consult free/public examples for hover interactions; original
  inspired implementations must be labeled as such. Do not claim downloaded
  components when source was authored locally or use paid source without access.

Prefer one atmospheric effect per section, not every effect at once. Pointer
interactions must be optional and must not hide essential content on touch.
Use 0.2–0.35s entrances and transitions. Slow continuous decorative effects may
use longer cycles; disable them under prefers-reduced-motion and provide a way
to pause moving strips. Preserve focus indicators and sufficient text contrast.

## Implementation

Apply the installed shadcn skill for component composition. Keep client boundaries
small and use MotionConfig/useReducedMotion where JavaScript animates. Verify
mobile widths and keyboard access when browser tools are available, plus the
project's lint, typecheck and build. Record limits of verification honestly.
