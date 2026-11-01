# Publish Specspire on GitHub

**Target repository:** `https://github.com/Nachovn114/specspire`.

## 1. Create the empty repository

At [GitHub → New repository](https://github.com/new), enter:

| Setting | Value |
|---|---|
| Repository name | `specspire` |
| Description | `One AI agent skill to plan, design, build, test, review, and ship maintainable software.` |
| Visibility | `Public` |
| Add a README | **Off** |
| Add .gitignore | **None** |
| Choose a license | **None** (already included in this ZIP) |

## 2. Upload the source (PowerShell)

Before uploading, run `npm.cmd test`, `npm.cmd run check` and `npm.cmd run test:package` (use `npm` outside PowerShell). Review BLOCKED security controls explicitly; they are not passes. Review staged files before committing. Uploading or publishing requires the maintainer's authorization.

**Unzip** the download first: GitHub does **not** extract ZIP files for you. In VS Code, open the folder that directly contains `README.md`, `package.json` and `skills/`.

```powershell
git init
git add .
git commit -m "feat: initial Specspire beta release"
git branch -M main
git remote add origin https://github.com/Nachovn114/specspire.git
git push -u origin main
```

These commands assume an empty remote repository and a configured Git identity. Do not run `git init` inside a project that already has a different Git history.

## 3. Repository verification status

- [x] GitHub renders `README.md` on the main page.
- [x] `.github/workflows/ci.yml` passed all 9 matrix jobs (Ubuntu, Windows, macOS × Node 20, 22, 24) and the `required` check on `main`.
- [x] The repository includes `LICENSE`, `SECURITY.md`, `skills/specspire/SKILL.md`, and 15 references including `12-data-privacy-compliance.md`.
- [x] Repository topics: `agent-skills`, `spec-driven-development`, `software-engineering`, `ai-coding`, `tdd`, `developer-tools`, `ui-ux`.
- [x] Verified remote Skill installation via `npx skills add Nachovn114/specspire --skill specspire`.
- [x] Tested Phase 0 agent activation in Google Antigravity (5 initial scenarios and 2 focused re-pilots).
- [ ] Full kit remote bootstrap via `npm exec --package=github:` (pending independent verification).
- [ ] End-to-end agent pilots across other agents (Codex, Cursor, etc.).

## 4. Publish a beta release

Create a GitHub release with tag `v0.9.0-beta.1`, title `Specspire v0.9.0-beta.1`, marking it as a **prerelease** with the prepared release notes and known beta limitations. Do not label it a stable, production, or enterprise-certified release before running full real-world pilots.
