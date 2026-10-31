# Specspire — Open Source Polish Report

Date: 2026-10-31 · Local version: 0.9.0-beta.1 · Scope: editorial and packaging changes authorized after [SPECSPIRE_REPOSITORY_STRUCTURE_AUDIT.md](SPECSPIRE_REPOSITORY_STRUCTURE_AUDIT.md). No commit, push, tag, release or npm publish was performed.

## 1. Executive Summary

Recommendation A (Minimal Professional) from the structure audit has been applied. All paths stay the same, and the repository still has one Skill with 14 references, the CLI, the templates, the tests and CI. The six documents marked SIMPLIFY have been rewritten. `docs/audits/` is now excluded from the npm package, and the package smoke test checks this against the real tarball. The personal Windows path has been removed. CLI behavior and security controls are unchanged.

**Verdict: READY WITH CONDITIONS FOR FIRST PUSH** (conditions in section 8).

## 2. Changes made

| Area | Change |
|---|---|
| Packaging | `package.json` → `files`: `"docs/"` became `"docs/*.md"`. Public guides are still shipped and `docs/audits/` is left out. No `.npmignore` and no `private` flag |
| Packaging test | `tests/package-smoke.mjs` checks the real `npm pack` output. It asserts that no `docs/audits/*` file is packed, that the 14 references are present, and that `SKILL.md`, the CLI, the 8 templates, the 8 guides and both READMEs are included. It also asserts that every relative link in packed Markdown resolves inside the installed package |
| Privacy | `SPECSPIRE_PRE_RELEASE_AUDIT.md:15`: the workspace path became `<workspace>`. No conclusion was changed |
| README.md / README.es.md | Both now follow the same order: identity, status, what it is, capabilities, installation, quick start, workflow, documentation, community. Remote commands sit in a collapsible block marked *not verified*. Both include a language note |
| Onboarding | `docs/QUICKSTART.md` now covers four topics: the installation modes and their verification status, starting without context documents, a controlled update procedure for an existing install (tested in a temporary folder), and `npm.cmd` for PowerShell |
| 00-prepare ambiguity | Context is written to `PROJECT.md` only when the file exists. Otherwise it stays in the conversation until the developer authorizes a file. The `SKILL.md` routing cell now matches. Human control is unchanged |
| templates/AGENTS.md | Now covers only the entry point, priority, existing projects, evidence, human control and the closing format. Technical rules (TDD, UI, stack, security) are left to the Skill. The `specspire` path that `doctor` and `init` check is kept |
| 07-maintain | The bug cycle now points to `09-debugging`, which remains the canonical source. Scope-change and refactor guidance stay. Headings fixed (H3 directly under H1 → H2) |
| WORKFLOW / QUALITY | WORKFLOW stays the process map and links change situations to 07/09/05. QUALITY stays the evidence protocol and now uses PASS / FAIL / BLOCKED / NOT VERIFIED, the same states as `review.md` and the responsive standard |
| Supporting | ARCHITECTURE tree shows `docs/audits/` (GitHub only). CONTRIBUTING describes the tarball assertions and the audit history policy. CHANGELOG has an `[Unreleased]` entry |

## 3. Files modified

`package.json`, `tests/package-smoke.mjs`, `README.md`, `README.es.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `docs/QUICKSTART.md`, `docs/WORKFLOW.md`, `docs/QUALITY.md`, `docs/ARCHITECTURE.md`, `templates/AGENTS.md`, `skills/specspire/SKILL.md` (one table cell), `skills/specspire/references/00-prepare.md`, `skills/specspire/references/07-maintain.md`, `docs/audits/SPECSPIRE_PRE_RELEASE_AUDIT.md` (one line). New: this report.

Untouched: `bin/specspire.mjs`, `cli.test`, `docs.test`, `identity.test`, `hardening.test`, CI workflow, the other 12 references, feature templates, `PROJECT.md`, `README-DESARROLLO.md`, the example, SECURITY, LICENSE.

## 4. Documentation improvements

- One H1 per document and no heading jumps across all repository Markdown. Every code fence declares a language, every image has alt text, and no unsupported HTML is used. Only `<details>`, `<summary>`, `<strong>` and `<code>` appear.
- GitHub-specific syntax used: alerts (`> [!IMPORTANT]`, `> [!NOTE]`) and collapsible sections. Both are documented in GitHub's "Basic writing and formatting syntax" and "Organizing information with collapsed sections".
- Badges are limited to the real CI workflow, MIT, `engines.node >=20` and beta status. No test-result badges, logos or banners were added.
- Navigation: the READMEs link guides by intent, and WORKFLOW / QUALITY / QUICKSTART link back to the README.
- Both READMEs are 113 lines, under the existing `< 120` brevity test, and match on capabilities, requirements, installation, status, limitations and documentation paths.

## 5. Tarball before / after

Measured with real `npm pack` (dry-run JSON before; actual `.tgz` listed with `tar -tzf` after).

| Metric | Before | After |
|---|---:|---:|
| Files | 45 | 40 |
| Unpacked size | 187,860 B | 109,856 B |
| Packed size | 67,841 B | 40,881 B |
| `docs/audits/*` | 5 (incl. structure audit) | 0 |
| Skill `SKILL.md` + references | 1 + 14 | 1 + 14 |
| Templates | 8 | 8 |
| Root guides `docs/*.md` | 8 | 8 |

Negative check: temporarily restoring `"docs/"` made `test:package` fail with `Historical audit reports must stay out of the npm package`. `package.json` was then restored, and the guard was confirmed working.

## 6. Tests and actual results

| Check | Result |
|---|---|
| `npm.cmd test` (baseline, before edits) | 48 tests: 45 pass, 0 fail, 3 skipped (BLOCKED) |
| `npm.cmd test` (final) | 48 tests: 45 pass, 0 fail, 3 skipped (BLOCKED) |
| Native Windows symlink tests | **BLOCKED** (EPERM) — directory, file, dangling-file. Classification unchanged; strict mode untouched |
| `npm.cmd run check` | PASS: 1 Skill, 14 references, 3 install templates, 5 progressive templates |
| `npm.cmd run test:package` | PASS: 40 files packed, audits absent, packaged links resolve, tarball installed twice, init twice, doctor, next, feature new, preservation |
| Internal Markdown links | PASS — `docs.test` plus a scratch linter (headings, fences, alt text, HTML, links) over all repository Markdown |
| Controlled update procedure (QUICKSTART) | PASS in a temporary project: fresh `init --target`, `git diff --no-index`, copy, `doctor` PASS |
| Personal-path / secret pattern scan | No profile paths, emails or credential patterns. One false positive: the `tokenFor` TODO marker in the CLI. Audits use `%TEMP%` placeholders only |
| GitHub rendering (light/dark, mobile) | **NOT VERIFIED** — repository not yet public; only local structural checks |

Environment: Windows x64, PowerShell, Node v24.19.0, npm 11.17.0, Git 2.55.0.

## 7. Pending risks

- Remote install (`npx skills add`, `npm exec github:`), Skill discovery by specific agents and an end-to-end agent pilot: NOT VERIFIED.
- CI matrix (Linux/macOS/Windows × Node 20.0.0/22/24) and strict native-link gate: NOT VERIFIED until the first remote run. The CI badge shows no status until then.
- The 3 native-link tests remain BLOCKED locally; only CI can show they PASS.
- Guides, Skill and templates are in Spanish. The READMEs state this, but international support is not verified.
- Installs made before these changes keep the old `AGENTS.md` and references until updated with the documented procedure.
- Git has no commits yet, so this pass has no diff baseline. All 15 top-level entries are untracked; review the staged selection before the first commit.

## 8. First-push status

**READY WITH CONDITIONS FOR FIRST PUSH.** Conditions:

1. The maintainer reviews the staged file list (nothing outside the repository tree, no temporary artifacts).
2. After pushing, confirm that GitHub renders both READMEs, the alerts and the collapsible block in light and dark modes.
3. Before advertising them, confirm that the CI `required` job passes with no BLOCKED native-link results and that the remote install commands work.

