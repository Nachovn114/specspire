# Specspire Release Engineering & Maintenance Guide

[English README](../README.md) · [Español README](../README.es.md) · [Workflow](WORKFLOW.md)

This guide documents the formal release process, quality gates, and verification procedures for Specspire maintainers.

**Current status (Unreleased):** Phase 2 is implemented, evaluated, and merged into `main` via PR #5 (commit [`1ba9c54`](https://github.com/Nachovn114/specspire/commit/1ba9c549142274b4151a025b0f8f8dd0dbf8c8f9)). Post-merge CI passed all 9 matrix jobs (Node 20.0.0, 22, 24 on Ubuntu, Windows, macOS) and the required gate. Agent evaluations verified 2 PASS / 5 BLOCKED (quota) on Codex and 6 PASS / 1 NOT VERIFIED on Gemini 3.8 Flash; fallback under ambiguous input remains NOT VERIFIED. Historical v0.9.0-beta.1 evidence does not establish bilingual release availability. No npm publication is claimed. `skills/` already includes EN references in the package manifest; no additional files pattern is needed.

For legacy installation updates, use the reviewed comparison, backup and manual merge procedure in [Quick Start](en/QUICKSTART.md#updating-an-existing-installation). `init` never replaces the router. `doctor` returns 0 for a complete bilingual install, 2 for a recognized legacy router requiring migration, and 1 for incomplete/invalid installs.

Phase 3 is implemented and validated locally on `feat/english-project-templates`, not merged into `main` or published. GitHub Actions and the Node 20.0.0/22/24 matrix on Windows, Linux and macOS remain pending for Phase 3. Historical v0.9.0-beta.1 does not include this functionality.

Phase 3 local distribution: 68 files, 16 ES/EN templates, one Skill, 30 references, 34 installed files, offline installation verified, zero runtime dependencies. Phase 2 historically packaged 60 files. Phase 3 CI remains pending; the matrix below is an acceptance gate, not completed evidence.

## 1. Release Philosophy & Quality Gates

Specspire enforces disciplined, evidence-backed releases. Every release candidate must pass all quality gates across supported platforms before publication.

| Gate | Verification Command | Acceptance Standard |
|---|---|---|
| **Unit & Integration Tests** | `npm test` (`npm.cmd test`) | All platform tests pass. Local Windows environments without elevated privileges report 3 native symlink fixtures as `SKIPPED`/`BLOCKED`; never record skipped tests as `PASS`. In CI, `SPECSPIRE_REQUIRE_NATIVE_LINKS=1` mandates running them, and any blocked check causes job failure. |
| **Source Integrity** | `npm run check` | Exactly 1 Skill, 30 references (15 ES + 15 EN), 3 project templates and 5 feature templates per language (16 total). |
| **Packaging Smoke Test** | `npm run test:package` | Exactly 68 reviewed files, 15 ES/15 EN with matching names, 30 router links and 14 EN links resolved; offline installation and CLI smoke produce 34 project files and preserve custom documents. |
| **Format & Hygiene** | `git diff --check` | No whitespace errors in the diff; inspect untracked files separately and check conflict markers and git status independently. |
| **CI Matrix** | GitHub Actions `ci.yml` | 9/9 jobs pass on Linux, Windows, and macOS (Node 20.0.0, 22, 24) + `required` check. |

> [!NOTE]
> **Native Symlink Testing Policy:** On local Windows development environments lacking elevated symlink privileges, 3 native symlink security fixtures report as `SKIPPED` (`BLOCKED` status). A skipped test must never be counted as a `PASS`. In GitHub Actions CI, `SPECSPIRE_REQUIRE_NATIVE_LINKS=1` is enforced across all platforms; if any mandatory security check remains blocked or fails in CI, the entire workflow job fails.

## 2. Pre-Release Preparation Checklist

Before cutting a new release:

1. **Verify Base State:**
   - Ensure local `main` is synchronized with `origin/main`.
   - Ensure working tree is clean (`git status --short` returns empty).
2. **Review Documentation & Versioning:**
   - Bump version in `package.json` following semantic versioning.
   - Update `CHANGELOG.md`: convert relevant `[Unreleased]` entries into a new version section `[X.Y.Z] — YYYY-MM-DD`.
   - Ensure `README.md` and `README.es.md` badges and version notes accurately reflect the release.
3. **Execute Local Verification Suite:**
   ```bash
   npm test
   npm run check
   npm run test:package
   git diff --check
   ```
4. **Distribution Boundary Check:**
   - Verify that `docs/audits/`, `tests/`, and temporary scripts are excluded from the package tarball.
   - Confirm that exactly 1 public Skill (`skills/specspire/SKILL.md`) and 30 references (15 ES + 15 EN) are packed.

## 3. GitHub Release Workflow

Once the release PR or commit is approved and merged into `main`:

1. **Pull updated `main`:**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create and push annotated Git tag:**
   ```bash
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   git push origin vX.Y.Z
   ```
3. **Create GitHub Release:**
   - Associate with the tag `vX.Y.Z`.
   - Title: `Specspire vX.Y.Z` (or `Specspire vX.Y.Z-beta.N` during beta).
   - If in beta, check **Set as a pre-release**.
   - Paste release notes from `CHANGELOG.md`, including verified capabilities and explicit known limitations.
   - Attach or generate release notes.

## 4. Post-Release Verification

1. **Verify Remote Skill Installation:**
   ```bash
   npx skills add Nachovn114/specspire --skill specspire
   ```
   Confirm that `.agents/skills/specspire/` is installed with `SKILL.md` and all 30 references (15 ES + 15 EN).
2. **Package Registry Policy:**
   - Local packaging smoke tests verify tarball structure and offline installation only.
   - Publication to the npm registry is reserved for post-beta, production-validated milestones and requires explicit maintainer authorization.
