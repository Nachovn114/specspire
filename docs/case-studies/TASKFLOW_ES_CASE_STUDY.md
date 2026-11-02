# Case Study: TaskFlow ES

> **Evidence-Based Engineering in Practice with Specspire**  
> *How a single bilingual Agent Skill guided a production-grade pilot from specification to proof without hallucinations or skipping quality gates.*

---

## 1. Executive Summary

AI coding agents excel at generating syntax, but left unconstrained they routinely jump directly to implementation, make unverified architectural assumptions, produce brittle desktop-only layouts, and claim tests passed that were never executed.

**TaskFlow ES** was designed as an independent pilot project to validate Specspire in a real development lifecycle. The mission: build an accessible, responsive, privacy-conscious task and workflow management client in Spanish and English using test-first development and verifiable quality gates.

### Key Metrics & Verified Results

| Dimension | Result | Verification Method |
|---|---|---|
| **Workflow Adherence** | 7 of 7 phases completed in sequence | Progressive feature scaffolding (`spec`, `plan`, `design`, `tasks`, `review`) |
| **Test-First Discipline** | 100% TDD (RED → GREEN → REFACTOR) | Automated unit & component test suites |
| **Responsive Standards** | Verified across 320px to 1920px viewports | R01–R06 responsive matrix evidence |
| **Privacy Compliance** | Zero tracking, in-memory isolation | P01–P06 data privacy audit gate |
| **Downstream Impact** | 4 framework improvements (M01–M04) + R06 verdict standard | Merged upstream into Specspire `main` (PR #8) |

---

## 2. The Problem: AI Coding Without Architecture

When an agent is prompted with *"Build a task management application with a responsive dashboard,"* common failure modes emerge:
1. **Scope explosion:** The agent immediately creates dozens of boilerplate files, Docker setups, or databases before defining user flows.
2. **Missing acceptance criteria:** Edge cases (empty states, oversized task names, rapid toggles) remain undocumented.
3. **Desktop-only design:** CSS layouts break on mobile devices (horizontal overflow, clipped buttons, ignored safe areas).
4. **Phantom test suites:** The agent writes optimistic assertions or claims "all tests pass" without evidence receipts.

Specspire enforces a disciplined constraint system: the agent receives one single `SKILL.md` entrypoint that routes dynamically to phase-specific references on demand.

---

## 3. The Seven-Phase Workflow in Action

```text
Phase 0 (Context) ➔ Phase 1 (Specify) ➔ Phase 2 (Plan & Design) ➔ Phase 3 (Tasks) ➔ Phase 4 (Build) ➔ Phase 5 (Verify) ➔ Phase 6 (Deliver)
```

### Phase 0 — Context & Boundaries (`PROJECT.md`)
The project boundaries were fixed before writing a single line of code:
- **Core scope:** Task creation, category filtering, status transitions, search, and responsive layout.
- **Boundaries:** Pure client-side operation; zero remote tracking servers; zero third-party telemetry.
- **Languages:** Primary Spanish interface with bilingual technical documentation.

### Phase 1 — Specification (`spec.md`)
Observable behaviors and edge cases were defined as strict requirements:
- **REQ-01:** Adding a task with a trimmed non-empty title immediately renders it in the active list.
- **REQ-02:** Empty or whitespace-only submissions are blocked with accessible error messages.
- **REQ-03:** Category filtering updates the visible count and active items deterministically.
- **REQ-04:** Mobile viewport (320px) maintains touch targets ≥ 44×44px without horizontal scrolling.

### Phase 2 — Architecture & Responsive Design (`plan.md`, `design.md`)
Instead of generic UI mockups, the agent prepared an explicit design specification:
- **Layout tokens:** CSS variables for spacing (`--space-xs` to `--space-xl`), typography, and contrast-compliant colors.
- **Responsive matrix:** Breakpoints verified at 320px (iPhone SE/compact), 768px (tablet), 1024px (laptop), and 1920px (desktop).
- **Safe area insets:** Integration of `viewport-fit=cover` and `env(safe-area-inset-*)` variables.

### Phase 3 — Verifiable Tasks (`tasks.md`)
The feature was partitioned into vertical, testable slices:
1. Task state machine & pure reducer logic.
2. DOM rendering & accessibility attributes (WAI-ARIA).
3. Filter & search bar interactions.
4. Responsive reflow & touch target validation.

### Phase 4 — Test-First Development (TDD)
Every component was built following strict **RED → GREEN → REFACTOR**:
- **Step 1 (RED):** Write failing unit tests for state transitions (`createTask`, `toggleTask`, `filterByCategory`). Run test suite; confirm failure.
- **Step 2 (GREEN):** Implement minimal pure JavaScript logic satisfying the assertions. Run test suite; confirm green.
- **Step 3 (REFACTOR):** Optimize modularity, readability, and performance without breaking tests.

```javascript
// Example TDD Assertion from Pilot
test('adding a valid task updates list and active count', () => {
  const state = taskReducer(initialState, {
    type: 'ADD_TASK',
    payload: { title: 'Implement safe area insets', category: 'UI' }
  });
  assert.equal(state.tasks.length, 1);
  assert.equal(state.tasks[0].title, 'Implement safe area insets');
  assert.equal(state.activeCount, 1);
});
```

### Phase 5 — Verification & Review (`review.md`)
The agent reconciled the final implementation against initial requirements:
- All acceptance criteria verified against automated tests.
- Git diff reviewed for unintentional files or security regressions.
- Responsive Quality Gate evaluated against R01–R06.
- Privacy Gate evaluated against P01–P06.

### Phase 6 — Delivery & Evidence Receipt
The pilot concluded with a reproducible handover document detailing test execution commands, environment requirements, and explicit limitation notes.

---

## 4. Quality Gates: Moving from Opinion to Evidence

Specspire rejects vanity claims. Every quality check must record an unambiguous evidence state:
- **`PASS`**: Verified by automated test output or verified inspection.
- **`FAIL`**: Observed failure with diagnostic logs.
- **`BLOCKED`**: Execution prevented by external dependency or permission restriction.
- **`NOT VERIFIED`**: Scenario has not been tested in this specific environment.

### Responsive Quality Gate (R01–R06)
- **R01 (Viewport Meta):** `width=device-width, initial-scale=1.0, viewport-fit=cover` verified (`PASS`).
- **R02 (Fluid Layout):** No horizontal overflow at 320px minimum width (`PASS`).
- **R03 (Touch Targets):** Interactive buttons meet minimum 44×44px hit areas (`PASS`).
- **R04 (Typography Scale):** Base font readable at 16px without zooming (`PASS`).
- **R05 (Safe Areas):** Bottom navigation pads against home indicator (`PASS`).
- **R06 (Physical Hardware Inspection):** Native device physical rendering (`NOT VERIFIED` in CI; documented truthfully).

---

## 5. How TaskFlow ES Evolved Specspire Upstream

Real-world usage uncovers edge cases that simulated tests cannot foresee. The pilot directly resulted in five upstream enhancements merged into Specspire's `main` branch:

1. **M01 (Mobile Reflow Guidance):** Clarified layout reflow instructions in `02-responsive-cross-platform.md` to prevent table overflow on 320px screens.
2. **M02 (Diagnostic Error Reporting):** Enhanced error messaging requirements when assertions fail during Phase 4 implementation.
3. **M03 (Multi-Viewport Automated Testing):** Added explicit guidelines for headless viewport simulation in automated test suites.
4. **M04 (UI State Transition Clarity):** Improved `08-code-quality.md` regarding deterministic UI state transitions.
5. **R06 Verdict Criteria:** Formalized the separation between automated viewport checks (`PASS`) and physical device verification (`NOT VERIFIED` when hardware is unavailable).

---

## 6. Limitations & Open Source Transparency

In keeping with Specspire's reporting integrity principles:
- **Pilot Scope:** TaskFlow ES was developed as a controlled evaluation pilot, not a commercial SaaS offering.
- **Hardware Verification:** Automated tests simulated multiple screen dimensions; native iOS/Android hardware testing remains `NOT VERIFIED`.
- **Privacy Scope:** Privacy gates confirm compliance with data minimization principles; they do not constitute formal legal certification.

---

## Related Documentation

- [Seven-Phase Workflow](../WORKFLOW.md)
- [Quality & Evidence Gates](../QUALITY.md)
- [Responsive & Cross-Platform Standards](../DESIGN.md)
- [Quick Start Guide](../QUICKSTART.md)
