# Changelog

Notable changes to Specspire are documented here. This is a **beta release**; the toolkit has not been certified against a production application.

## [Unreleased]

### English project templates and CLI (Phase 3)
- Added eight English counterparts to the eight Spanish templates; explicit --lang es|en on init and feature, Spanish default, no persistence or automatic translation.
- Preserved 34 installed files, custom documents, exclusive writes and doctor exit codes 0/1/2; next recognizes English PROJECT placeholders.
- Hardened project document reads and validated both template inventories, markers and local links.
- Local Windows validation: 146 PASS, 0 FAIL, 3 native symlink fixtures SKIPPED (EPERM); source check and offline package smoke pass with 68 files, 16 templates, 30 references and zero runtime dependencies. Phase 2 packaged 60 files.
- Phase 3 is implemented in this source revision. For [PR #7](https://github.com/Nachovn114/specspire/pull/7), run [41364185917](https://github.com/Nachovn114/specspire/actions/runs/41364185917) (event `pull_request`, evaluated commit `6be8bbdca6677c3121a1268f23f63105de54b5d0`) completed all nine matrix jobs and `required` with SUCCESS: Node.js 20.0.0, 22 and 24 on Ubuntu, Windows and macOS. This evidence applies to that commit, not to later revisions or a future post-merge run on `main`. Historical v0.9.0-beta.1 does not include these capabilities; no npm publication is claimed. Phase 2 pilots below are not evidence for Phase 3.

### Added
- **Bilingual Developer Experience:** Language selector in READMEs, English translations for core guides (`docs/en/QUICKSTART.md`, `docs/en/WORKFLOW.md`, `docs/en/QUALITY.md`), and comprehensive i18n architectural roadmap (`docs/I18N_PLAN.md`).
- **Bilingual Contribution Guidelines:** Added English `CONTRIBUTING.md` as primary GitHub guide and created `CONTRIBUTING.es.md` with semantic equivalence.
- **Attribution & Licensing Policy:** Documented third-party contribution rules, case-by-case copyleft evaluation, and transparent attribution in `docs/REFERENCIAS.md`.
- **Release Engineering Guide:** Modernized `docs/PUBLISH.md` into a maintainer release and quality gate guide detailing CI matrix and native symlink testing policies.
- **Clarification on N/A in Privacy Controls:** Added explicit guidance in `docs/QUALITY.md` and `docs/en/QUALITY.md` restricting `N/A` strictly to P01–P06 controls with documented justification and prohibiting automatic inferences.

### Changed
- **Streamlined Repository Structure:** Removed unused hypothetical academic example (`examples/formulario-academico.md` and `examples/` directory) and cleaned up all internal documentation links across guides.
- **Portable Paths in CLI Examples:** Updated CLI invocation examples to use forward-slash paths for cross-platform portability.
- **Packaging & Test Maintenance:** Updated `package.json` manifest (`"files"`) and `tests/docs.test.mjs` to track `CONTRIBUTING.es.md` and reflect removal of `examples/`.
- **Packaging Smoke Test Clarification:** Clarified in `README.md` and `README.es.md` that local npm packaging smoke tests verify tarball structure and offline CLI installation and do not indicate publication to the npm registry.

### Bilingual Skill and installation (Phase 2, integrated in `main` via PR #5)
- Added 15 operational English references alongside the 15 Spanish originals under one public Skill.
- Added a bilingual router with explicit preference, unambiguous context and Spanish fallback; references load progressively in the selected language.
- Updated the CLI contract to 34 installed files, with exclusive writes and no automatic router replacement. Doctor distinguishes complete (0), recognized legacy/partially migrated (2), and incomplete/invalid (1) installations.
- Added privacy parity checks and real tarball assertions for 15 ES + 15 EN references, matching basenames, 30 router links, 14 EN links and offline installation with preservation checks.
- Documented controlled legacy updates using backups, clean comparison and manual integration of router customizations.
- Verification & Limitations: merged into `main` via PR #5 (commit `1ba9c54`) with all 9 CI matrix jobs passing on Ubuntu, Windows, and macOS (Node 20.0.0, 22, 24) and required check passing. Real-agent bilingual evaluations recorded 2 PASS / 5 BLOCKED (quota) on Codex and 6 PASS / 1 NOT VERIFIED on Gemini 3.8 Flash; Spanish fallback under completely ambiguous input remains NOT VERIFIED. Local native symlink fixtures can be blocked by permissions. Privacy checks do not certify legal compliance. At the Phase 2 milestone, templates were Spanish and English scaffolding was deferred to Phase 3. No npm publication or bilingual availability in historical v0.9.0-beta.1 is claimed.

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
