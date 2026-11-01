# Phase 2 · Plan and Design

**Outcome:** `plan.md` explains the minimal solution; `design.md` only when an interface exists.

1. Read spec, constitution, rubric and actual code. Respect mandatory stack; if a project exists, prioritize reusing its technology before suggesting migrations.
2. **If stack is NOT defined**, recommend one using the "Stack selection" procedure below and record the decision in `plan.md`. Never select a framework solely for popularity or novelty.
3. Define minimal vertical flow: input → validation → outcome; contracts, data schema or infrastructure **only when the feature demands it**.
4. Explain every added dependency or layer. Consider errors, security, accessibility, testing, performance and real constraints.
5. **If UI exists:** investigate 2 relevant references (Refero/RicoUI/etc.), identify useful pattern and distinctive identity; write visual direction in `design.md` (typography, hierarchy, tokens, states, content, mobile-first). Do not copy designs or brands.
6. To conduct a full visual audit, consult [02-ui-quality.md](02-ui-quality.md) only in projects with UI.
   In that case also read the [cross-platform responsive standard](02-responsive-cross-platform.md): define matrix, web/native branch, criteria R01–R06 and tests before implementing. Preserve existing design when not asked to redesign.
8. **If processing personal data, accounts or trackers:** consult [privacy and data](12-data-privacy-compliance.md) to define flows, lawful basis, retention and processors; do not add banners or policies where unjustified.
9. Verify consistency **spec ↔ plan ↔ constraints**; return authorized scope changes back to spec.

## Stack selection (only if applicable)

- **Context:** application type, users, features, complexity, budget, hosting, devices, team, experience and academic constraints.
- **Current research:** when agent has browsing capability, check official documentation, stable versions, release notes, support/LTS, runtime requirements, compatibility and security advisories. Record **date and verifiable links**. Do not infer that the latest version is the most appropriate.
- **Without Internet access:** declare "live versions not verified", do not invent versions or maintenance status; state pending verification before installing.
- **Brief comparison:** present at most **three options** (preferred, reasonable alternative and minimal frameworkless option when sensible); compare suitability, complexity, community/maintenance, security, accessibility, testing, cost and deployment. Do not score irrelevant factors.
- **Decision:** offer **one primary recommendation and why**; also justify what is NOT needed (e.g. backend, database, global state, Docker, SSR). In existing projects, propose changes only with clear benefits and evaluated risks.
- **Approval:** before installing dependencies or generating extensive scaffolding, confirm requirements and user choice when changing significant commitments or incurring costs.
- **Record:** include summary of this decision in existing `plan.md`; do not create another document by default. Verify compatibility with rubric and available environment.

**Gate:** another person can execute the plan without pending fundamental decisions; technologies justified and versions verified or explicitly pending; for UI, normal, error, loading, empty and success states exist according to context.

**Prompt:** "Before planning, recommend a modern stack if none is set, verify versions against official sources when able and compare alternatives without overengineering. Design the simplest path satisfying the specification; if UI exists, propose professional visual identity and create design.md. Explain what you ruled out."

