# Changelog

Notable changes to Specspire are documented here. This is a **beta release**; the toolkit has not been certified against a production application.

## [0.9.0-beta.1] — 2026-10-31

### Added
- **Single Public Agent Skill (`specspire`):** Router `SKILL.md` loading 15 specialized technical references on demand across 7 development phases.
- **Privacy by Design & Legal Compliance Gate:** Reference `12-data-privacy-compliance.md`, conditional routing (activated only when processing personal data), multi-jurisdictional separation (Chilean Ley 19.628 / reform Ley 21.719, GDPR, LGPD, CCPA), and P01–P06 evidence-backed controls in `review.md`.
- **Dependency-Free CLI:** `bin/specspire.mjs` providing `init`, `doctor`, `status`, `next`, and progressive `feature` scaffolding (`new`, `plan`, `design`, `tasks`, `review`).
- **Safety and Security Defense:** Conservative idempotent installation, dry-run mode, path traversal prevention, ancestor symlink validation, and cross-platform path normalization for macOS.
- **Evidence-Based Quality Gates:** Strict four-tier maturity recording (`PASS`, `FAIL`, `BLOCKED`, `NOT VERIFIED`) without simulated assertions.
- **UI & Accessibility Standards:** Visual direction and responsive cross-platform evidence matrices (`02-responsive-cross-platform.md`, `02-ui-quality.md`).
- **Comprehensive Documentation:** Task-oriented guides (`QUICKSTART.md`, `WORKFLOW.md`, `QUALITY.md`, `DESIGN.md`, `CLI.md`, `ARCHITECTURE.md`, `PUBLISH.md`), skill-only onboarding support, controlled update procedure, and worked academic example.
- **CI & Packaging Integrity:** GitHub Actions CI matrix covering 9 platform/runtime jobs (Ubuntu, Windows, macOS × Node.js 20, 22, 24) plus a gating `required` check; real tarball packaging verification excluding historical audit reports.

### Verified in Beta
- Local CLI and Skill operations on Windows, Linux, and macOS.
- Remote Skill installation via `npx skills add Nachovn114/specspire --skill specspire` (detects 1 public Skill, installs `SKILL.md` and 15 references).
- Agent activation tested in Google Antigravity across controlled Phase 0 scenarios (5 initial scenarios and 2 focused re-pilots).
- All 9 GitHub Actions CI matrix jobs and `required` security check on commit [`405d674`](https://github.com/Nachovn114/specspire/commit/405d674d79b1a222b0398ee3bba1010281ec941e).

### Known Limitations in Beta
- Full remote kit bootstrap via `npm exec --package=github:` remains not verified end to end.
- Broad agent compatibility across untested agents (e.g. Codex, Cursor, Claude Code) remains unverified.
- Phase 0 agent testing does not constitute end-to-end completion of a production application.
- Privacy guidance is contextual and does not constitute formal legal certification.
- Toolkit is in beta status and not yet published on the npm registry.

## Before 1.0.0

- Validate full kit remote bootstrap via `npm exec --package=github:`.
- Validate real agent behavior across additional environments (Codex, Cursor, etc.).
- Complete and audit a sample production application end-to-end through Phase 6 (Deliver).
