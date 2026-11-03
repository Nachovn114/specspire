# Case Study: TaskFlow ES

> **Evidence-Based Engineering in Practice with Specspire**  
> *How a single bilingual Agent Skill guided an exploratory web pilot from specification to proof without hallucinations or skipping quality gates.*

---

## 1. Executive Summary

AI coding agents excel at generating syntax, but left unconstrained they routinely jump directly to implementation, make unverified architectural assumptions, produce desktop-only layouts, and claim tests passed that were never executed.

**TaskFlow ES** was developed as an exploratory pilot project (built with React, Vite, Tailwind CSS, Vitest, and Playwright) to validate the Specspire workflow in a realistic development lifecycle. The mission: build an accessible, responsive, privacy-conscious task management client in Spanish with bilingual technical documentation, using strict test-first development and verifiable quality gates.

### Key Metrics & Verified Results

| Dimension | Result | Verification Method |
|---|---|---|
| **Workflow Adherence** | 7 of 7 phases completed in sequence | Progressive feature scaffolding (`spec`, `plan`, `design`, `tasks`, `review`) |
| **Test-First Discipline** | 100% TDD (RED → GREEN → REFACTOR) | 125 unit/component tests in Vitest |
| **End-to-End Validation** | 23 unique user scenarios verified | Playwright automated browser test suite (41 cross-platform runs) |
| **Responsive Standards** | Verified at 375×667, 390×844, 768×1024, and 1280×800 px (fluid down to 320 px) | Automated headless viewport matrix (R01–R05 `PASS`; R06 `NOT VERIFIED`) |
| **Data Privacy** | Client-side `localStorage` with in-memory contingency; zero telemetry | P01–P06 data privacy audit gate |
| **Downstream Impact** | 4 framework improvements (M01–M04) + R06 verdict standard | Merged upstream into Specspire `main` (PR #8) |

---

## 2. The Problem: AI Coding Without Architecture

When an agent is prompted with *"Build a task management application with a responsive dashboard,"* common failure modes emerge:
1. **Scope explosion:** The agent immediately creates dozens of boilerplate files, Docker setups, or databases before defining user flows.
2. **Missing acceptance criteria:** Edge cases (empty states, oversized task names, rapid toggles) remain undocumented.
3. **Desktop-only design:** CSS layouts break on mobile viewports (horizontal overflow, clipped buttons, ignored safe areas).
4. **Phantom test suites:** The agent writes optimistic assertions or claims "all tests pass" without evidence receipts.

Specspire enforces a disciplined constraint system: the agent receives one single `SKILL.md` entrypoint that routes dynamically to phase-specific references on demand.

---

## 3. The Seven-Phase Workflow in Action

```text
Phase 0 (Context) ➔ Phase 1 (Specify) ➔ Phase 2 (Plan & Design) ➔ Phase 3 (Tasks)
  ➔ Phase 4 (Build / TDD) ➔ Phase 5 (Verify / Review) ➔ Phase 6 (Deliver)
```

### Phase 0 — Context & Boundaries (`PROJECT.md`)
The project boundaries were fixed before writing application code:
- **Core scope:** Task creation, completion toggles, state filtering (*Todas*, *Pendientes*, *Completadas*), and responsive layout.
- **Data boundaries:** Pure client-side persistence using browser `localStorage` (key `taskflow_es_tasks`) with graceful fallback to in-memory state if `localStorage` throws or is disabled; zero external network requests; zero third-party telemetry.
- **Languages:** Spanish user interface with bilingual technical documentation.

### Phase 1 — Specification (`spec.md`)
Observable behaviors and edge cases were defined as strict requirements:
- **REQ-01:** Adding a task with a trimmed non-empty title immediately renders it in the list.
- **REQ-02:** Empty or whitespace-only submissions are rejected with an accessible error state.
- **REQ-03:** Status filtering (*Todas*, *Pendientes*, *Completadas*) updates the visible list and count deterministically.
- **REQ-04:** Mobile viewport (minimum 320px width) maintains touch targets ≥ 44×44px without horizontal scrolling.

### Phase 2 — Architecture & Responsive Design (`plan.md`, `design.md`)
Instead of generic UI mockups, the agent prepared an explicit design specification:
- **Layout tokens:** CSS variables for spacing (`--space-xs` to `--space-xl`), typography, and contrast-compliant colors.
- **Responsive matrix:** Breakpoints verified in browser simulation at:
  - Mobile: 375×667 px (compact / iPhone SE profile), 390×844 px (standard mobile). Fluid layout reflow verified down to 320 px without horizontal overflow.
  - Tablet: 768×1024 px (iPad / tablet portrait).
  - Desktop: 1280×800 px (standard desktop viewport).
  - *Note:* 1920 px (ultra-wide desktop) was not evaluated during this pilot.
- **Safe area insets:** Integration of `viewport-fit=cover` and `env(safe-area-inset-*)` variables.

### Phase 3 — Verifiable Tasks (`tasks.md`)
The feature was partitioned into vertical, testable slices:
1. Task state machine & pure reducer logic.
2. DOM rendering & accessibility attributes (WAI-ARIA).
3. Status filter toggles (*Todas*, *Pendientes*, *Completadas*).
4. Responsive reflow & touch target validation.

### Phase 4 — Test-First Development (TDD)
Every component was built following strict **RED → GREEN → REFACTOR**:
- **Step 1 (RED):** Write failing unit tests for state transitions (`createTask`, `toggleTask`, `filterByStatus`). Run test suite; confirm failure.
- **Step 2 (GREEN):** Implement minimal pure JavaScript/React logic satisfying the assertions. Run test suite; confirm green.
- **Step 3 (REFACTOR):** Optimize modularity and readability without breaking tests.

```javascript
// Illustrative conceptual example of the test-first reducer pattern
test('adding a valid task updates task list and persists to state', () => {
  const initialState = { tasks: [], filter: 'todas' };
  const state = taskReducer(initialState, {
    type: 'ADD_TASK',
    payload: { title: 'Implement safe-area-inset padding' }
  });
  assert.equal(state.tasks.length, 1);
  assert.equal(state.tasks[0].title, 'Implement safe-area-inset padding');
  assert.equal(state.tasks[0].completed, false);
  assert.equal(state.filter, 'todas');
});
```

### Phase 5 — Verification & Review (`review.md`)
The agent reconciled the final implementation against initial requirements:
- All acceptance criteria verified against automated tests (125 Vitest tests and 23 unique E2E scenarios).
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
- **R05 (Safe Areas):** Bottom navigation pads against home indicator via CSS env variables (`PASS`).
- **R06 (Physical Hardware Inspection):** Native mobile physical hardware rendering (`NOT VERIFIED` in automated CI; documented truthfully).

---

## 5. How TaskFlow ES Evolved Specspire Upstream

Real-world usage uncovers edge cases that simulated tests cannot foresee. The pilot directly resulted in five upstream enhancements merged into Specspire's `main` branch (PR #8):

1. **M01 (Test Runner Scoping):** Explicit scoping guidelines in `04-implement.md` to avoid execution collisions between unit runners (e.g. Vitest) and browser runners (e.g. Playwright) through explicit discovery boundaries.
2. **M02 (Accessibility Scan Stability):** Guidance in `02-responsive-cross-platform.md` forbidding arbitrary `sleep` calls and requiring deterministic DOM stability before automated accessibility scans (`axe-core`) to prevent false positives caused by active CSS transitions.
3. **M03 (Emulation vs. Physical Hardware Boundary):** Explicit demarcation in `02-responsive-cross-platform.md` distinguishing what can be formally certified via headless browser emulation (`PASS`/`FAIL`) from native physical hardware testing (`NOT VERIFIED`).
4. **M04 (Monotonic Sequence Signals):** Documented pattern in `08-code-quality.md` introducing monotonic sequence tokens (`seq`) for triggering UI notifications and side-effects on immutable state updates without external reactive dependencies.
5. **R06 Verdict Criteria:** Formalized the separation between `PASS WITH LIMITATIONS` (when physical hardware is deliberately out of scope for the test environment) and `BLOCKED` (when mandatory required hardware is absent).

---

## 6. Limitations & Open Source Transparency

In keeping with Specspire's reporting integrity principles:
- **Pilot Scope:** TaskFlow ES was developed as an exploratory pilot to stress-test the Agent Skill workflow, not as certified production SaaS software.
- **Hardware Verification:** Automated tests simulated mobile and tablet viewports in headless Chromium and WebKit; native iOS/Android physical hardware testing remains `NOT VERIFIED`.
- **Accessibility Scope:** Automated scans with `axe-core` detected zero automated contrast or structure violations; this does not constitute full manual WCAG 2.1 AAA certification.
- **Privacy Scope:** Privacy gates confirm pure client-side `localStorage` operation and data minimization; they do not constitute formal legal certification.

---

## Related Documentation

- [Seven-Phase Workflow](../WORKFLOW.md)
- [Quality & Evidence Gates](../QUALITY.md)
- [Responsive & Cross-Platform Standards](../DESIGN.md)
- [Quick Start Guide](../QUICKSTART.md)
