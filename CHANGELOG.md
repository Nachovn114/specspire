# Changelog

Notable changes to Specspire are documented here. This is a **beta release**; the toolkit has not been certified against a production application.

## [Unreleased]

- Reorganized the English and Spanish READMEs around status, capabilities, installation, quick start and documentation; remote install commands are marked as not verified.
- Documented skill-only onboarding, missing context documents and a controlled update procedure in the quick start.
- Simplified `templates/AGENTS.md`, `07-maintain` (routes bugs to `09-debugging`), `docs/WORKFLOW.md` and `docs/QUALITY.md` (PASS / FAIL / BLOCKED / NOT VERIFIED).
- Clarified that phase 0 records context in `PROJECT.md` only when it exists or the developer authorizes it.
- Excluded `docs/audits/` from the npm package; the package smoke test now asserts the real tarball contents.
- Added Privacy by Design and Legal Compliance Gate (15 references): `12-data-privacy-compliance.md`, conditional routing in `SKILL.md`, P01–P06 evidence controls in `review.md`, and dedicated `tests/privacy.test.mjs`.

## [0.9.0-beta.1] — 2026-10-31

- Rebranded the toolkit, command and single public Agent Skill as **Specspire**.
- Added a concise English-first GitHub README and a Spanish quick-reference README.
- Kept task-oriented documentation, a progressive seven-phase workflow and per-feature templates.
- Retained safety checks: idempotent installs, dry-run, path validation and source integrity tests.
- Included GitHub Actions CI, contribution guidelines, MIT license, security reporting and publication checklist.

## Before 1.0.0

- Validate skill discovery and remote bootstrap directly from GitHub.
- Validate real agent behavior with Codex, Antigravity and other supported tools.
- Complete and audit a sample project end-to-end, including UI, testing and security checks.
