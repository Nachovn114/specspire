# PROJECT · Context and lightweight constitution

> Fill in what you know; one line per answer is enough. The agent must distinguish **facts** from **assumptions**.

| Field | Answer |
|---|---|
| Project | _Name_ |
| Objective | _What problem it solves_ |
| Users | _Who will use it_ |
| Requirements source | _Rubric, conversation, client, issue..._ |
| Required environment and stack | _If any; otherwise, “to be decided”_ |
| Includes | _What is needed_ |
| Excludes | _What we will NOT build_ |
| Risk profile | _Low / medium / high, and why_ |
| Personal data and privacy | _None / Contact details / Accounts / Sensitive data / Cookies or analytics (specify jurisdiction)_ |

## Engineering principles (constitution)

1. **Requirements before code:** every change maps to testable behavior.
2. **Simplicity and maintainability:** reuse what exists and avoid premature abstractions (KISS/YAGNI).
3. **Tests and evidence:** do not declare a check passed if it was not run. Use TDD when useful.
4. **Security and accessibility by design:** validate data and permissions; for UI, address keyboard interaction, states, and responsive design.
5. **Controlled changes:** small commits, reviews, and no secrets in the repository.

## Delivery conditions

- [ ] Requirements and relevant cases verified.
- [ ] Errors and edge cases handled; no obvious dead code.
- [ ] The project can be run by following its README.
- [ ] If applicable: interface reviewed on mobile and desktop, including accessibility and security.
- [ ] If applicable: rubric requirements and evidence complete.

## Current status

- **Current feature:** _to be defined_
- **Phase:** 0 — Prepare
- **Next action:** _the smallest verifiable action_
