# Phase 3 · Actionable Work Plan

**Outcome:** `tasks.md`: small, ordered, traceable and suitable for a junior developer.

1. Derive tasks only from `spec.md`, `plan.md`, `design.md` when it exists, and current code; do not invent infrastructure.
2. For each task write `T01 [RF-01] concrete description — test/evidence — dependencies`. A task must produce observable behavior.
3. Start with a **minimal vertical slice** (input → validation → visible response) and then expand error cases, security and improvements.
4. Check for gaps: requirements without tasks, tasks without requirements, circular dependencies, criteria nobody tests and UI without states.
5. Parallelize only when truly independent tasks exist; see [orchestration](11-agent-collaboration.md). A small app does not need multiple agents.
6. Before implementing, verify that another person could execute the next task without guessing architecture or expected outcome.

**Gate:** Each task has what, why, verifiable outcome and dependency. Do not demand absurd micro-tasks nor rigidly limit the number of files.

**Prompt:** "Build a backlog by user journeys, one verifiable change per task and a first end-to-end delivery; eliminate steps that do not add value."

