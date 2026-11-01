# Specspire Release Engineering & Maintenance Guide

[English README](../README.md) · [Español README](../README.es.md) · [Workflow](WORKFLOW.md)

This guide documents the formal release process, quality gates, and verification procedures for Specspire maintainers.

## 1. Release Philosophy & Quality Gates

Specspire enforces disciplined, evidence-backed releases. Every release candidate must pass all quality gates across supported platforms before publication.

| Gate | Verification Command | Acceptance Standard |
|---|---|---|
| **Unit & Integration Tests** | `npm test` (`npm.cmd test`) | All platform tests pass (Windows skips elevated symlink fixtures). |
| **Source Integrity** | `npm run check` | Exactly 1 Skill, 15 references, 3 project templates, 5 feature templates. |
| **Packaging Smoke Test** | `npm run test:package` | Tarball contains only distribution files; all relative links resolve; CLI smoke passes. |
| **Format & Hygiene** | `git diff --check` | Zero whitespace errors, zero conflict markers, clean working tree. |
| **CI Matrix** | GitHub Actions `ci.yml` | 9/9 jobs pass on Linux, Windows, and macOS (Node 20, 22, 24) + `required` check. |

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
   - Confirm that exactly 1 public Skill (`skills/specspire/SKILL.md`) and 15 references are packed.

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
   Confirm that `.agents/skills/specspire/` is installed with `SKILL.md` and all 15 references.
2. **Package Registry Policy:**
   - Local packaging smoke tests verify tarball structure and offline installation only.
   - Publication to the npm registry is reserved for post-beta, production-validated milestones and requires explicit maintainer authorization.
