# Tech PM Portfolio — Wireframe v1

Figma: https://www.figma.com/design/DPx0FJ3mVSq4gpYGPqwQnm/

Created 2026-10-30 from the user's six reference images and the technical spec.
The deliverable is 6 Figma pages containing 24 desktop/mobile screen compositions
plus a contact-form state board. These are layout wireframes with brand colors,
editable text and vector layers; they are not an interactive prototype or a
complete Figma component/variable library.

## Groups and reference mapping

| Figma page | Desktop | Mobile | Reference direction |
| --- | --- | --- | --- |
| 01 — Trang chủ | Home | Home | Images 3–4: split hero; 1–6: projects, tools and process |
| 02 — Dự án & Case study | Projects Hub, Case Study | Projects, Case Study | Images 1–2: card grid and hierarchy; spec: metrics, architecture and RAID |
| 03 — Bài viết & Insights | Articles, Article Reader | Articles, Article Reader | Images 1–5: editorial cards; reader: narrow content column and TOC |
| 04 — Giới thiệu & CV | About, Resume | About, Resume | Images 5–6: profile facts, skills and timeline |
| 05 — Liên hệ & Trạng thái | Contact | Contact | Images 1–6: information/form split; validation, loading, success and failure states |
| 06 — Quản trị CMS | Login, Dashboard, Projects Manager, Project Editor, Articles Manager, Inquiries | Dashboard, Inquiry | Image 2: sidebar/workspace; spec: CMS tasks |

Desktop baseline: 1440 px. Mobile baseline: 390 px. Inter is used for this
wireframe pass. Production typography remains Plus Jakarta Sans / JetBrains Mono
as described in the technical spec and project design skill.

## Content and visual decisions

- Preserve Steel Marine, Deep Sea Blue, Lobster Red and Claw Cream.
- Retain the layout principles of the references, without copying their fictional
  names, biographies, photos, client logos, testimonials or performance metrics.
- Portraits, employers, credentials, projects, metrics, contact details and dates
  remain explicitly marked placeholders until confirmed by the user.
- Home introduces the PM positioning, selected work, competencies, process and
  experience before the contact CTA.
- Case studies prioritize role/scope, verified impact, executive summary, system
  architecture, risk management and lessons learned.
- Article readers prioritize comfortable line length and a table of contents.
- Mobile layouts stack cards/forms and replace the admin sidebar with a drawer.
- Contact inquiries have New / Contacted / Archived states. Changing a status
  does not imply sending an email reply.
- Decorative motion is specified for later implementation; wireframes are static.

## Source and verification

`wireframes/01-wireframes.svg` through `06-wireframes.svg` are the source boards
imported into the corresponding Figma pages. Every UI composition uses SVG text
and vector geometry, with no raster screenshots embedded.

The Figma connector was installed but its file-editing tools were not exposed in
the session. A browser-created Design file was used. Marketplace scripting plugins
failed to load their environment, so the boards were imported as native SVG/text
layers via the Figma editor. A pilot confirmed the text became editable Figma Text
layers. Each group was inspected in the Figma canvas after import.

The imported groups use fixed wireframe geometry. Auto-layout, shared component
instances, variable bindings, prototype connections and production font refinement
are follow-up design-system work, not claimed as complete by this wireframe pass.

## Light-theme extension

The subsequent design pass added six light-theme pages with the same 24 screen
compositions and a visual-direction board for icons, glass and lighting. See
`VISUAL-DIRECTION.md` for the palette, source artifacts and effect recipes.
