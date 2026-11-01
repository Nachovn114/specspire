# Specspire

**One agent skill for spec-driven, test-first and verifiable software delivery.**

**English** · [Español](README.es.md) · [Quick start](docs/en/QUICKSTART.md) ([es](docs/QUICKSTART.md)) · [Workflow](docs/en/WORKFLOW.md) ([es](docs/WORKFLOW.md)) · [Quality](docs/en/QUALITY.md) ([es](docs/QUALITY.md)) · [CLI (es)](docs/CLI.md)

[![CI](https://github.com/Nachovn114/specspire/actions/workflows/ci.yml/badge.svg)](https://github.com/Nachovn114/specspire/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Node.js 20+](https://img.shields.io/badge/node-%3E%3D20-339933)
![Status: beta](https://img.shields.io/badge/status-beta-orange)

```bash
# Install the verified Skill directly from GitHub into any project:
npx skills add Nachovn114/specspire --skill specspire
```

> [!IMPORTANT]
> **Beta — 0.9.0-beta.1.** GitHub Actions CI passed all 9 matrix jobs on Linux, Windows and macOS with Node.js 20, 22 and 24 (commit [`f599ebd`](https://github.com/Nachovn114/specspire/commit/f599ebdd29aabdf6f12e55b005714e11e142880e)). Remote Skill installation via `npx skills add` and Phase 0 activation in Google Antigravity are verified. Full remote kit bootstrap (`npm exec github:`), untested agents and full end-to-end production pilots remain **NOT VERIFIED**. Local npm packaging smoke tests verify tarball structure and offline CLI installation and do not indicate publication to the npm registry.

**Bilingual Phase 2 (integrated in `main` via PR #5, unreleased):** Phase 1 documentation is complete; Phase 2 (single Skill, 15 ES and 15 EN references, bilingual router with Spanish fallback, CLI installing 34 files and packaging 60 files) is implemented, evaluated, and merged into `main` (commit [`1ba9c54`](https://github.com/Nachovn114/specspire/commit/1ba9c549142274b4151a025b0f8f8dd0dbf8c8f9)). Post-merge CI passed all 9 matrix jobs on Ubuntu, Windows, and macOS across Node.js 20.0.0, 22, and 24, plus the required check. Real-agent bilingual evaluations showed 2 PASS and 5 BLOCKED (quota) on Codex, and 6 PASS and 1 NOT VERIFIED (agent harness isolation) on Gemini 3.8 Flash; Spanish fallback under completely ambiguous input remains NOT VERIFIED. These changes are unreleased on npm and are not part of historical v0.9.0-beta.1; integration in `main` does not imply a new release or npm publication.

Language priority is explicit user preference → unambiguous request/project context → Spanish fallback. Technical English terms in Spanish requests do not change the language. Load only relevant references in that language; compare both only for explicitly requested translation, equivalence audits or bilingual maintenance. Project templates remain Spanish in Phase 2; `--lang` and English templates are future Phase 3 work.

## What it is

AI coding agents tend to jump straight to code, add infrastructure nobody asked for and report tests they never ran. Specspire gives the agent a single `SKILL.md` that identifies the task, picks the current phase and loads only the reference that phase needs: specify, plan, design, build test-first, verify against the requirements and deliver.

An optional, dependency-free CLI installs the project guide and templates without touching existing files. Specspire is inspired by spec-driven development and disciplined engineering practice; it is **not affiliated** with GitHub Spec Kit, Superpowers or Matt Pocock Skills.

## The Seven Phases

```text
Context → Specify → Plan & design → Tasks → Build → Verify → Deliver
```

1. **Context:** Problem, users, boundaries, and scope (`PROJECT.md` or conversation context).
2. **Specify:** Observable acceptance criteria and edge cases (`spec.md`).
3. **Plan & design:** Minimal architecture, official stack research, and UI matrix (`plan.md`, `design.md`).
4. **Tasks:** Measurable vertical increments with verification criteria (`tasks.md`).
5. **Build:** Test-first (RED → GREEN → REFACTOR) or systematic debugging.
6. **Verify:** Reconcile requirements against reality; diff review (`review.md`).
7. **Deliver:** Reproducible run instructions, evidence receipts, and handover.

## Capabilities

- **One public skill** with 30 references (15 Spanish + 15 English), loaded on demand.
- **Privacy by Design:** Contextual gate (P01–P06) covering Chilean law (Ley 19.628 / 21.719), GDPR, LGPD, and CCPA.
- **Spec before code:** Observable acceptance criteria, minimal plans, and justified stack choices.
- **UI & Accessibility:** Visual direction, responsive standards, and cross-platform evidence matrices.
- **Test-first building:** Verifiable tests; evidence recorded as PASS, FAIL, BLOCKED, or NOT VERIFIED.
- **Conservative safety:** `init` never overwrites; ancestor symlink and traversal defenses.
- **Human control:** No push, merge, deploy, or paid actions without explicit permission.

## Quick start

**Remote Skill (recommended):** Run `npx skills add Nachovn114/specspire --skill specspire`. Point your agent to `.agents/skills/specspire/SKILL.md`.

**Full kit (local, this branch):** `init` installs 34 files (3 project documents + 1 router + 30 references). Run `node ../Specspire/bin/specspire.mjs init` and `doctor`. Open `README-DESARROLLO.md` in your project and tell your agent:

```text
Use the specspire skill. Read AGENTS.md, PROJECT.md and README-DESARROLLO.md.
I want to build [describe your project]. Identify the current phase, propose the next action and how to verify it.
```

**Skill-only:** Point the agent to `SKILL.md` and describe constraints in chat. No CLI or project files assumed; context stays in conversation.

## Documentation

Core guides are available in English under `docs/en/` and Spanish under `docs/`. See our [i18n plan](docs/I18N_PLAN.md).

| Topic | English | Español |
|---|---|---|
| Quick start | [docs/en/QUICKSTART.md](docs/en/QUICKSTART.md) | [docs/QUICKSTART.md](docs/QUICKSTART.md) |
| Seven-phase workflow | [docs/en/WORKFLOW.md](docs/en/WORKFLOW.md) | [docs/WORKFLOW.md](docs/WORKFLOW.md) |
| Quality & evidence gates | [docs/en/QUALITY.md](docs/en/QUALITY.md) | [docs/QUALITY.md](docs/QUALITY.md) |
| UI/UX & responsive design | [docs/DESIGN.md (es)](docs/DESIGN.md) | [docs/DESIGN.md](docs/DESIGN.md) |
| CLI reference | [docs/CLI.md (es)](docs/CLI.md) | [docs/CLI.md](docs/CLI.md) |
| Architecture & layout | [docs/ARCHITECTURE.md (es)](docs/ARCHITECTURE.md) | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |

[Contributing](CONTRIBUTING.md) · [Security](SECURITY.md) · [Changelog](CHANGELOG.md) · [Publishing](docs/PUBLISH.md) · [MIT License](LICENSE)
