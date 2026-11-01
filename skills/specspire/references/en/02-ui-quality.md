# Annex UI/UX · Professional Visual Quality

**Read only when the project has an interface.** Do not turn this annex into a requirement for backend, CLI or APIs.

For any UI, also apply the [cross-platform responsive standard](02-responsive-cross-platform.md): adaptation, safe areas, matrix and gate are defined there. Visual direction is maintained here; do not duplicate both procedures nor turn every application into a generic dashboard. In maintenance, preserve the existing identity unless a redesign was requested.

## Procedure

1. **Research:** review 2–3 real and relevant references, such as [Refero Styles](https://styles.refero.design/), [RicoUI Brands](https://design.ricoui.com/brands), [Hallmark](https://www.usehallmark.com/) or [Jakub Skills](https://jakub.kr/skills). If you lack access, declare it and do not invent findings.
2. **Identity:** define product type, personality, audience and tasks. Propose at least two **truly different** directions (composition, weight, typography, density, color and interaction style), not merely alternative color palettes.
3. **Design:** choose one direction; record in `design.md` a clear typographic scale, 3–6 semantic tokens and the anatomy of necessary components. Use realistic content, without lorem ipsum upon delivery.
4. **Experience states:** input, focus, validation, empty, loading, error, success and disabled as appropriate. Maintain helpful messages; avoid dark patterns.
5. **Implementation:** mobile-first, perceptible hierarchy, responsive design and reasonable touch targets. Prioritize HTML semantics, labels, keyboard navigation and contrast.
6. **Review:** inspect at least mobile and desktop viewports when a browser is available; correct overflow, spacing, alignment, focus, errors, typography and consistency. Verify interaction, not merely static screenshots.

## Evaluation: do not confuse premium with overengineering

- Can the primary task be recognized in seconds?
- Does every visual element contribute function, brand or legibility?
- Do states and errors allow recovery?
- Does the UI retain quality on small screens and with keyboard navigation?
- Does the design have personality without resembling a clone of another brand?
- Does the system reuse tokens and components only when truly needed?

**Do not:** copy third-party designs, assets or license text, add animation for fashion, introduce libraries for a single button or create a corporate design system for a single screen.

**Deliverable:** concise `design.md` + real visual review evidence in `review.md`; if browser testing was not possible, indicate as not verified.

