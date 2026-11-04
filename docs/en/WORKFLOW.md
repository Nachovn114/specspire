# Development Workflow — From Concept to Verified Delivery

[Español](../WORKFLOW.md) · [Quick Start](QUICKSTART.md) · [Quality Gates](QUALITY.md) · [Back to README](../../README.md)

**Core Rule:** One verifiable action at a time. Process depth adapts to complexity; the integrity of evidence is non-negotiable.

This document explains Specspire's seven development phases and demonstrates their practical application through a concrete real-world example: **"Build a Task Management API"**.

---

## The Seven Specspire Phases

```text
Context → Specify → Plan & Design → Tasks → Build (TDD) → Verify → Deliver
```

| Phase | Core Activity | Minimal Artifact | Progression Criterion |
|---|---|---|---|
| **0 · Context** | Define problem, users, and non-goals | `PROJECT.md` (or chat) | Scope and exclusions agreed upon |
| **1 · Specify** | User stories and edge cases | `spec.md` | Testable acceptance criteria, no critical ambiguity |
| **2 · Plan & Design** | Minimal stack and simple architecture | `plan.md` (`design.md` if UI) | Risks evaluated and stack justified |
| **3 · Tasks** | Break down into vertical slices | `tasks.md` | Every task defines an outcome and test check |
| **4 · Build** | TDD cycles: RED → GREEN → REFACTOR | Code + tests | Testable behavior with real assertions |
| **5 · Verify** | Reconcile spec against actual diff | `review.md` | Discrepancies fixed or documented |
| **6 · Deliver** | Runbook and execution receipts | Product README | A third party can reproduce cold-start setup |

> [!NOTE]
> In **Skill-only** mode, Phase 0 lives within the conversation until you authorize writing a context document. No artifacts are generated without your consent.

---

## Guided Example: "Build a Task Management API"

Here is how a real user request progresses through all seven phases:

### Phase 0: Context & Discovery
- **Developer prompt:** *"I want to build a lightweight REST API for managing personal tasks in Node.js."*
- **What the agent does:** Asks clarifying questions about constraints, stack, and non-goals. Does not generate code or create directories.
- **What the developer decides:** Confirms an in-memory HTTP API (no external database for this milestone) without multi-user auth.
- **Artifact produced:** `PROJECT.md` (or agreed summary in conversation).
- **How progress is verified:** Explicit human confirmation of project scope before moving forward.

### Phase 1: Specification (`spec.md`)
- **What the agent does:** Drafts user stories with observable acceptance criteria:
  - `POST /tasks`: creates a task with a required title; returns `201 Created` with generated id.
  - `GET /tasks`: lists existing tasks; returns `200 OK`.
  - Validation: empty title returns `400 Bad Request`.
- **What the developer decides:** Reviews HTTP status codes, payloads, and error behaviors.
- **Artifact produced:** `specs/task-api/spec.md`.
- **How progress is verified:** Zero unresolved critical ambiguities in acceptance criteria.

### Phase 2: Planning & Architecture (`plan.md`)
- **What the agent does:** Proposes the simplest maintainable architecture: native HTTP server (`node:http`), in-memory storage (`Map`), and built-in test runner (`node:test`).
- **What the developer decides:** Approves the plan, confirming no external frameworks (Express/Fastify) are required for this scope.
- **Artifact produced:** `specs/task-api/plan.md` (`design.md` is skipped as there is no user interface).
- **How progress is verified:** Stack choices clearly justified against project constraints.

### Phase 3: Task Breakdown (`tasks.md`)
- **What the agent does:** Breaks implementation into independent, vertical slices:
  - Task 1: Base HTTP server and health check endpoint (`GET /health`).
  - Task 2: Task creation (`POST /tasks`) with title validation.
  - Task 3: Task listing (`GET /tasks`).
- **What the developer decides:** Validates implementation order and verification commands.
- **Artifact produced:** `specs/task-api/tasks.md`.
- **How progress is verified:** Each task specifies a concrete terminal verification command.

### Phase 4: Test-Driven Development (TDD)
- **What the agent does:** Strictly follows the RED → GREEN → REFACTOR cycle:
  1. **RED:** Writes a test in `tests/tasks.test.mjs` for `POST /tasks` and runs `node --test`. The test fails legitimately with an `AssertionError`, not an import or syntax crash.
  2. **GREEN:** Implements the minimal route handler in `src/server.mjs`. Runs `node --test` and observes passing green output.
  3. **REFACTOR:** Cleans up code while keeping test suite green.
- **What the developer decides:** Inspects the diff and confirms test outcomes.
- **Artifact produced:** Source code and automated tests.
- **How progress is verified:** Actual terminal output with all tests passing.

### Phase 5: Verification & Convergence (`review.md`)
- **What the agent does:** Compares git diff against `spec.md`, verifies no unauthorized dependencies were added, and runs quality checks.
- **What the developer decides:** Approves the diff and authorizes feature completion.
- **Artifact produced:** `specs/task-api/review.md` with recorded `PASS` states and terminal receipts.
- **How progress is verified:** Complete reconciliation between specification and code.

### Phase 6: Delivery
- **What the agent does:** Documents execution instructions in the product README and prepares delivery notes.
- **What the developer decides:** Performs a clean cold-start test and approves the final commit or Pull Request.
- **Artifact produced:** Cold-start documentation and delivery confirmation.
- **How progress is verified:** An independent developer can clone, run `npm test`, and verify the API.

---

## Distinguishing Agent Guidance from CLI Operations

It is essential to understand what the Specspire CLI does versus what the AI agent performs:

| Capability | Specspire CLI (`specspire`) | AI Agent (guided by `SKILL.md`) |
|---|---|---|
| **Initialization** | Safely copies templates and Skill idempotently. | Reads existing context and adopts the 4-line protocol. |
| **Feature Scaffolding** | Creates `specs/<slug>/` directories with template files. | Fills specification fields with meaningful requirements. |
| **Environment Diagnosis (`doctor`)** | Validates file presence, link integrity, and disk structure. | Interprets doctor output and corrects configuration defects. |
| **Next Action (`next`)** | Inspects document progression state on disk. | Proposes next concrete technical action within active phase. |
| **Development (TDD)** | Does not write application code. | Writes failing tests, implements features, and refactors. |
| **Test Execution** | Does not execute application tests. | Executes project commands (`npm test`) and records real output. |

---

## Managing Changes During Development

Not every small task or bug fix requires generating all seven documents:

| Situation | Recommended Path | Technical Reference |
|---|---|---|
| **Bug or Regression** | Reproduce with a failing test, diagnose root cause, fix, and verify regression. Do not re-scaffold the whole project. | [09-debugging](../../skills/specspire/references/en/09-debugging.md) |
| **Scope Change** | Update only affected sections in `spec.md` and `tasks.md`. | [07-maintain](../../skills/specspire/references/en/07-maintain.md) |
| **Personal Data Processing** | Apply Privacy by Design controls (P01–P06) only if personal data is handled. | [12-data-privacy-compliance](../../skills/specspire/references/en/12-data-privacy-compliance.md) |
| **Differences in `review.md`** | Add corrective tasks to `tasks.md` and re-cycle Build → Verify. | [05-converge](../../skills/specspire/references/en/05-converge.md) |

---

## Useful Steering Prompt for Your Agent

```text
Continue with Specspire from the current project state.
Read the active feature specification and related source code.
Report in 4 lines: current phase, next single action, required evidence, and any real blockers.
Do not skip ahead to future phases or claim test results that were not actually executed.
```

---

Next steps: [Quality Gates](QUALITY.md) · [Quick Start](QUICKSTART.md) · [Back to README](../../README.md) · [Versión en español](../WORKFLOW.md)
