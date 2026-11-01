# Development Workflow

[Español](../WORKFLOW.md) · [Quick start](QUICKSTART.md) · [Quality gates](QUALITY.md) · [Back to README](../../README.md)

**Core rule:** One verifiable action at a time. Process depth adapts to complexity; process integrity does not.

This document maps out the end-to-end development process. For evidence recording and gate validation protocols, see [Quality gates](QUALITY.md).

| Stage | Activity | Minimal artifact | Progression condition |
|---|---|---|---|
| **0 · Context** | Define problem, users, constraints | `PROJECT.md` or chat context | Scope and exclusions clearly understood |
| **1 · Specification** | Draft observable behaviors and errors | `spec.md` | Testable acceptance criteria, no critical ambiguity |
| **2 · Plan & UI** | Pick simplest architecture, justify stack | `plan.md` (`design.md` if UI) | Risks, trade-offs, and alternatives reasoned |
| **3 · Tasks** | Break down into vertical increments | `tasks.md` | Every task has an observable outcome and check |
| **4 · Build** | RED → GREEN → REFACTOR when automatable | Code + tests | Testable functionality, not just generated code |
| **5 · Convergence** | Reconcile requirements against diff | `review.md` | Discrepancies fixed or documented |
| **6 · Delivery** | Document run instructions and receipt | Product README | A third party can independently reproduce the build |

In a skill-only onboarding setup, Stage 0 lives in the chat conversation until you explicitly authorize saving a context document. Subsequent artifacts are likewise created only with your agreement.

## Decisions that prevent overengineering

- **Local form or script:** Typically requires no server, microservices, or database.
- **Web app with state:** Introduce APIs and persistence only when the requirement actually arises.
- **Production service:** Add observability, CI/CD, and defensive security proportional to operational risk.
- **Academic or coursework project:** Prioritize the evaluation rubric and preserve required evidence.

## Managing changes during development

Do not restart the process from scratch; jump into the affected stage.

| Situation | What to do | Agent reference |
|---|---|---|
| New requirement or scope change | Update only affected documents and re-estimate tasks | [07-maintain (es)](../../skills/specspire/references/07-maintain.md) |
| Bug or regression | Reproduce, diagnose, write regression test, and fix | [09-debugging (es)](../../skills/specspire/references/09-debugging.md) |
| Personal data or trackers | Apply privacy by design, lawful basis, and retention | [12-data-privacy-compliance (es)](../../skills/specspire/references/12-data-privacy-compliance.md) |
| `review.md` detects spec mismatches | Create corrective tasks and cycle build → verification | [05-converge (es)](../../skills/specspire/references/05-converge.md) |

## Useful steering prompt for your agent

```text
Continue with Specspire from the current project state.
Read the active feature specification and related source code.
Report: current phase, next single action, required evidence, and any real blockers.
Do not skip ahead to future phases or claim results that were not actually executed.
```

Next: [Quality gates](QUALITY.md) · [Quick start](QUICKSTART.md) · [Back to README](../../README.md) · [Versión en español](../WORKFLOW.md)
