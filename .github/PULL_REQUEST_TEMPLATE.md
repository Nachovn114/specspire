## Description

<!-- Brief summary of what this pull request changes and why. -->

## Changes Made

- 

## Verification & Evidence

<!-- Evidence must be honest. Record outcomes as PASS, FAIL, BLOCKED, or NOT VERIFIED. -->

- [ ] `npm test` passes (all unit, identity, docs link integrity, and privacy tests)
- [ ] `npm run check` (validate-source) passes
- [ ] `npm run test:package` passes (offline tarball packaging and installation smoke test)
- [ ] `git diff --check` reported no whitespace or conflict artifacts

## Quality & Guidelines Checklist

- [ ] **Bilingual Parity:** If an operational reference or template was changed, its ES and EN counterparts were updated synchronously.
- [ ] **Documentation Invariants:** Main README lines remain < 120; required documentation links resolve.
- [ ] **Zero Dependencies:** No new runtime dependencies added to `package.json`.
- [ ] **Privacy & Sanitization:** No private paths, user tokens, API keys, or confidential customer data exposed.
- [ ] **Truth in Reporting:** No simulated tests, inflated star claims, or unverified claims.
