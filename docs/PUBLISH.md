# Specspire Release Engineering & Maintenance Guide

[English README](../README.md) · [Español README](../README.es.md) · [Workflow](WORKFLOW.md)

This guide documents the formal release process, quality gates, and verification procedures for Specspire maintainers.

**Current status (v0.10.0-beta.1 Release Candidate):** Phase 2 (Bilingual Skill, PR #5), Phase 3 (Bilingual Templates & CLI, PR #7), Pilot 1 TaskFlow ES Improvements (PR #8), and Open Source Brand Kit V2 / Public Launch (PR #9) are merged into `main`. Release preparation PR #10 (commit [`049dba0`](https://github.com/Nachovn114/specspire/commit/049dba031baeb504dfe4ffa399d131e19d063180)) advances versioning to `0.10.0-beta.1` and passes all 10 CI jobs across Linux, Windows, and macOS (Node.js 20.0.0, 22, 24) and the `required` gate. Remote Agent Skill installation is verified via `npx skills add Nachovn114/specspire --skill specspire` (31 files: 1 `SKILL.md` + 30 references) and indexed on `skills.sh`. Local CLI packaging verifies 68 reviewed files, 16 templates, 30 references, and zero runtime dependencies.

For legacy installation updates, use the reviewed comparison, backup and manual merge procedure in [Quick Start](en/QUICKSTART.md#updating-an-existing-installation). `init` never replaces the router. `doctor` returns 0 for a complete bilingual install, 2 for a recognized legacy router requiring migration, and 1 for incomplete/invalid installs.

**Historical milestones:**
- **Phase 2 (Bilingual Skill):** Merged into `main` via PR #5 (commit [`1ba9c54`](https://github.com/Nachovn114/specspire/commit/1ba9c549142274b4151a025b0f8f8dd0dbf8c8f9)). Post-merge CI passed all 9 matrix jobs (Node 20.0.0, 22, 24 on Ubuntu, Windows, macOS) and the required gate. Agent evaluations verified 2 PASS / 5 BLOCKED (quota) on Codex and 6 PASS / 1 NOT VERIFIED on Gemini 3.8 Flash; fallback under ambiguous input remains NOT VERIFIED.
- **Phase 3 (Bilingual Templates & CLI):** For [PR #7](https://github.com/Nachovn114/specspire/pull/7), run [41364185917](https://github.com/Nachovn114/specspire/actions/runs/41364185917) (event `pull_request`, evaluated commit `6be8bbdca6677c3121a1268f23f63105de54b5d0`) completed all nine matrix jobs and `required` with SUCCESS: Node.js 20.0.0, 22 and 24 on Ubuntu, Windows and macOS. Phase 3 packaged 68 files (16 ES/EN templates, 1 Skill, 30 references, 34 installed files, zero runtime dependencies), expanding Phase 2's 60 files.
- **Pilot 1 (TaskFlow ES):** PR #8 merged into `main` (commit `19860cf`) with 10/10 CI jobs SUCCESS.
- **Brand Kit V2 & Launch:** PR #9 merged into `main` (commit `fb3e9b1`) with 10/10 CI jobs SUCCESS.

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

### Runtime Differentiation
- **Specspire CLI:** Requires Node.js `>=20.0.0` (validated in CI on Node.js 20.0.0, 22.x, and 24.x across Ubuntu, macOS, and Windows).
- **External Installer `npx skills`:** Requires Node.js `>=22.20.0` as declared in the `skills` CLI package engines specification (`npm view skills engines`). Developers on Node.js 20.x should install the CLI kit directly (`npm install -D specspire`) rather than `npx skills add`.

1. **Verify Remote Skill Installation:**
   ```bash
   npx skills add Nachovn114/specspire --skill specspire
   ```
   Confirm that `.agents/skills/specspire/` is installed with `SKILL.md` and all 30 references (15 ES + 15 EN).
2. **Package Registry Policy:**
   - Local packaging smoke tests verify tarball structure and offline installation only.
   - Publication to the npm registry is reserved for post-beta, production-validated milestones and requires explicit maintainer authorization.
