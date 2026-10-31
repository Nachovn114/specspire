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

## 3. Check the public repository

- [ ] GitHub renders `README.md` on the main page.
- [ ] `.github/workflows/ci.yml` runs `npm test` and `npm run check` successfully.
- [ ] The repository includes `LICENSE`, `SECURITY.md` and `skills/specspire/SKILL.md`.
- [ ] Set repository topics: `agent-skills`, `spec-driven-development`, `software-engineering`, `ai-coding`, `tdd`, `developer-tools`, `ui-ux`.
- [ ] Verify the GitHub installation commands documented in `README.md` **after** publishing.
- [ ] Require the `required` CI job in branch protection; confirm all OS/Node jobs and native-link checks ran without BLOCKED results.
- [ ] Validate remote Skill discovery and a real-agent pilot before advertising those channels as verified.

## 4. Publish a beta release

Create a GitHub release with tag `v0.9.0-beta.1`, title `Specspire v0.9.0-beta.1` and a short description of the workflow and beta limitations. Do not label it a stable or enterprise-certified release before running a real end-to-end pilot.
