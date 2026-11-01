# Phase 4 · Build Real Increments

**Outcome:** A functional, small and tested vertical slice, without adding infrastructure the requirement does not need.

1. Choose **a single task** from `tasks.md`. Read existing code and tests. If a shared API must be modified, confirm contract and scope.
2. For verifiable logic and bugs: **RED:** write a test for the behavior, run it and verify it fails for the expected reason. **GREEN:** write the minimal code to pass it. **REFACTOR:** improve names, duplication or structure without altering behavior, re-running tests.
3. Use unit tests for business rules, integration tests for boundaries and E2E for critical user journeys when worthwhile. For UI, test real interaction and accessibility; do not write cosmetic unit tests.
   If UI exists, apply the [cross-platform responsive standard](02-responsive-cross-platform.md) to each increment and test the web/PWA or native branch of the agreed matrix; do not load it for backend or CLI without UI.
4. Avoid out-of-scope dependencies, abstractions or changes. Consult [code engineering](08-code-quality.md) for module and review decisions.
5. If a difficult bug appears, consult [systematic debugging](09-debugging.md) and reproduce before editing.
6. Inspect the diff, run existing test + lint + build and report **observed output**. If unable to run them, leave the task as not verified.
7. Check off the task only when acceptance criteria have evidence. If requested behavior changes, update the spec first.

**Gate:** Observable requirement, real test and easily maintainable code. The task does not pass on "I already coded everything".

**Prompt:** "Implement only the following task. Demonstrate valid RED, GREEN, REFACTOR and verification execution. Avoid unrequested code or libraries."

