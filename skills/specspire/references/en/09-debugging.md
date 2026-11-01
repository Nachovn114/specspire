# Annex · Systematic Debugging

Triggered upon encountering bugs, regressions, flaky tests or performance issues.

1. **Reproduce:** Record expected vs. observed, environment and minimal steps. If it cannot be reproduced, do not declare a root cause or fix.
2. **Isolate:** Reduce the test case; inspect logs, tests, data boundaries and recent changes. Use falsifiable hypotheses; do not edit blindly.
3. **Demonstrate:** For an automatable bug, write a test that reproduces the **symptom** and fails for the right reason (not due to a broken import, typo or setup failure).
4. **Fix:** Change the minimum necessary code and run the focused test case; do not weaken assertions or conceal failures.
5. **Full regression:** Run relevant integration, build and neighboring test cases. If signal loss, intermittent failures or performance issues occur, gather real observed evidence of the actual problem.
6. **Report:** Confirmed vs. probable cause, changes made, commands with observed output, constraints and residual risks. For requirement changes, update the spec.

Do not mix multiple theories and fixes into a single untraceable change. Do not claim a bug is fixed if the affected scenario could not be executed.

