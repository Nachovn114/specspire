# Phase 5 · Convergence and Independent Review

**Outcome:** `review.md` with requirement-by-requirement verification and real tests, not impressions.

1. Compare each `RF-*` criterion against files, executed behavior and evidence. Differentiate **verified**, **pending**, **blocked** and **not applicable**.
2. Conduct technical review in two independent passes: **spec fidelity** and **diff quality** (modules, duplication, types, simplicity, errors and tests). Consult [standards](08-code-quality.md).
3. Run real test, lint, build and relevant regression commands; record output, number of failures and limitations. `doctor` or `status` do not substitute the test suite.
4. Review security and data via [proportional controls](10-security-operations.md). If personal data or trackers are processed, audit data flows, storage and notices via [privacy and data](12-data-privacy-compliance.md) (controls P01–P06 in `review.md`).
   If UI exists, inspect at least mobile and desktop viewports, keyboard, focus, contrast, loading/error/success and real navigation. If a browser is unavailable, declare it.
   **Only with UI**, also execute the [cross-platform responsive gate](02-responsive-cross-platform.md) R01–R06 and record evidence per required combination. Do not substitute physical/keyboard testing with viewport emulation; FAIL, BLOCKED or NOT VERIFIED on mandatory controls prevents declaring the UI complete.
5. If a gap emerges, record a new corrective task with concrete criteria; re-implement and **repeat verification**. Do not lower criteria to close tasks.
6. Before declaring "ready", verify that tests on the *latest version* actually passed and that the final diff is the one reviewed.

**Gate:** No mandatory requirement without evidence, no silenced failures and residual risks disclosed. If it does not converge, continue the loop.

**Prompt:** "Review the change along two axes: spec compliance and engineering quality. Run available verifications and record failures, evidence and next actions without fabricating results."

