# Maintenance · Changes and Bugs

**Do not restart the project:** enter where the problem is and choose the route according to the type of change.

## Bug or regression

Follow [09-debugging](09-debugging.md), the canonical source for diagnosis: reproduce → isolate → demonstrate with regression test → fix → full regression → report. Upon closing, update `review.md` or the issue log. If the bug reveals an ill-defined requirement, update `spec.md` as well.

## Scope change

1. Update `spec.md` and criteria; if architecture changes, update `plan.md`.
2. Update `tasks.md` and check for inconsistencies before implementing.
3. Implement the change, carry out the convergence review and document the outcome. Do not overwrite previous decisions without an explanation.

## Pure technical improvement

1. Identify debt and measurable risk; do not refactor for fashion.
2. Lock down existing behavior with relevant tests; refactor in small increments.
3. Run regression tests, review diffs and record the decision only if it matters.

**In production:** Sensitive changes require proportional deployment, monitoring and rollback controls.

