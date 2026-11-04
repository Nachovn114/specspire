# Specspire Release Engineering & Maintenance Guide

[English README](../README.md) · [Español README](../README.es.md) · [Workflow](en/WORKFLOW.md)

This guide documents the formal release process, quality gates, and verification procedures for Specspire maintainers and release engineers.

---

## 1. Release Philosophy & Core Invariants

Specspire enforces disciplined, evidence-backed releases. Every release candidate must pass all quality gates across supported platforms before publication.

| Gate | Verification Command | Acceptance Standard |
|---|---|---|
| **Unit & Integration Tests** | `npm test` (`npm.cmd test`) | All platform tests pass. Local Windows environments without elevated privileges report 3 native symlink fixtures as `SKIPPED`/`BLOCKED`; never record skipped tests as `PASS`. In CI, `SPECSPIRE_REQUIRE_NATIVE_LINKS=1` mandates running them, and any blocked check causes job failure. |
| **Source Integrity** | `npm run check` | Exactly 1 Skill, 30 references (15 ES + 15 EN), 3 project templates and 5 feature templates per language (16 total). |
| **Packaging Smoke Test** | `npm run test:package` | Exactly 68 reviewed files, 15 ES/15 EN with matching names, 30 router links and 14 EN links resolved; offline installation and CLI smoke produce 34 project files and preserve custom documents; zero broken HTML or markdown links. |
| **Format & Hygiene** | `git diff --check` | No whitespace errors or conflict markers in the diff; clean working tree. |
| **CI Matrix** | GitHub Actions `ci.yml` | All matrix jobs pass on Linux, Windows, and macOS (Node.js 20.0.0, 22, 24) + `required` security check. |

> [!NOTE]
> **Native Symlink Testing Policy:** On local Windows development environments lacking elevated symlink privileges, 3 native symlink security fixtures report as `SKIPPED` (`BLOCKED` status). A skipped test must never be counted as a `PASS`. In GitHub Actions CI, `SPECSPIRE_REQUIRE_NATIVE_LINKS=1` is enforced across all platforms; if any mandatory security check remains blocked or fails in CI, the entire workflow job fails.

---

## 2. Pre-Release Preparation Checklist

Before cutting a new stable release:

1. **Verify Base State:**
   - Ensure local `main` is synchronized with `origin/main`.
   - Ensure working tree is clean (`git status --short` returns empty).
2. **Review Documentation & Versioning:**
   - Bump version in `package.json` following semantic versioning (`X.Y.Z`).
   - Update `CHANGELOG.md`: convert relevant `[Unreleased]` entries into a new version section `[X.Y.Z] — YYYY-MM-DD`.
   - Ensure `README.md` and `README.es.md` badges and version notes accurately reflect the release.
   - Update `tests/identity.test.mjs` to match the new package version.
3. **Execute Local Verification Suite:**
   ```bash
   npm test
   npm run check
   npm run test:package
   git diff --check
   ```
4. **Distribution Boundary Check:**
   - Verify that `docs/audits/`, `tests/`, and temporary scratch scripts are excluded from the package tarball.
   - Confirm that exactly 1 public Skill (`skills/specspire/SKILL.md`) and 30 references (15 ES + 15 EN) are packed.

---

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
   - Title: `Specspire vX.Y.Z`.
   - Paste release notes from `CHANGELOG.md`, including verified capabilities and explicit known limitations.
   - Attach or generate release notes.

---

## 4. Post-Release Verification

### Runtime Differentiation
- **Specspire CLI:** Requires Node.js `>=20.0.0` (validated in CI on Node.js 20.0.0, 22.x, and 24.x across Ubuntu, macOS, and Windows).
- **External Installer `npx skills`:** Requires Node.js `>=22.20.0` as declared in the `skills` CLI package engines specification (`npm view skills engines`). Developers on Node.js 20.x should install the CLI kit directly via repository clone (`git clone https://github.com/Nachovn114/specspire.git`) rather than `npx skills add`.

1. **Verify Remote Skill Installation:**
   ```bash
   npx skills add Nachovn114/specspire --skill specspire
   ```
   Confirm that `.agents/skills/specspire/` is installed with `SKILL.md` and all 30 references (15 ES + 15 EN).
2. **Package Registry Policy:**
   - Local packaging smoke tests verify tarball structure and offline installation only.
   - Publication to the npm registry requires explicit maintainer authorization and account ownership verification.
