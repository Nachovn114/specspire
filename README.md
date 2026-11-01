# Specspire

**One agent skill for spec-driven, test-first and verifiable software delivery.**

[![CI](https://github.com/Nachovn114/specspire/actions/workflows/ci.yml/badge.svg)](https://github.com/Nachovn114/specspire/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Node.js 20+](https://img.shields.io/badge/node-%3E%3D20-339933)
![Status: beta](https://img.shields.io/badge/status-beta-orange)

[Español](README.es.md) · [Quick start](docs/QUICKSTART.md) · [Workflow](docs/WORKFLOW.md) · [CLI](docs/CLI.md) · [Example](examples/formulario-academico.md)

> [!IMPORTANT]
> **Beta — 0.9.0-beta.1.** The CLI, Skill source, npm tarball and GitHub Actions CI passed all 9 matrix jobs on Linux, Windows and macOS with Node.js 20, 22 and 24 (commit [`405d674`](https://github.com/Nachovn114/specspire/commit/405d674d79b1a222b0398ee3bba1010281ec941e)). Remote Skill installation via `npx skills add` and Phase 0 activation in Google Antigravity are verified. Full remote kit bootstrap (`npm exec github:`), untested agents and full end-to-end production pilots remain **NOT VERIFIED**.

## What it is

AI coding agents tend to jump straight to code, add infrastructure nobody asked for and report tests they never ran. Specspire gives the agent a single `SKILL.md` that identifies the task, picks the current phase and loads only the reference that phase needs: specify, plan, design, build test-first, verify against the requirements and deliver.

An optional, dependency-free CLI installs the project guide and templates without touching existing files. Specspire is inspired by spec-driven development and disciplined engineering practice; it is **not affiliated** with GitHub Spec Kit, Superpowers or Matt Pocock Skills.

## Capabilities

- **One public skill** with 15 focused references, loaded on demand.
- **Spec before code:** observable acceptance criteria, a minimal plan and a stack justified with official sources when online.
- **UI only when there is a UI:** visual direction, accessibility and a responsive / cross-platform evidence matrix.
- **Test-first building:** RED → GREEN → REFACTOR for automatable behavior; systematic debugging for bugs.
- **Evidence gates:** results are recorded as PASS, FAIL, BLOCKED or NOT VERIFIED — never invented.
- **Conservative installer:** `init` never overwrites; `doctor` checks the installed documents.
- **Human control:** no push, merge, deploy or paid actions without explicit permission.

## Installation

**Requirements:** Node.js 20+ for the CLI, and an AI coding agent that can read Agent Skills.

With the `Specspire` folder next to your project, run from the project folder:

```powershell
node ..\Specspire\bin\specspire.mjs init
node ..\Specspire\bin\specspire.mjs doctor
```

This installs the full kit: `AGENTS.md`, `PROJECT.md`, `README-DESARROLLO.md` and the Skill under `.agents/skills/specspire/`. Running `init` again only adds missing files; existing files are kept as they are.

<details>
<summary><strong>Remote install from GitHub</strong></summary>

Pick **one** depending on whether you want just the Skill or the full project guide:

```bash
# Skill only (verified: installs 1 Skill and 15 references)
npx skills add Nachovn114/specspire --skill specspire

# Full kit: guide, rules, context template and local Skill (not verified end to end)
npm exec --yes --package=github:Nachovn114/specspire -- specspire init
```

</details>

- **PowerShell blocks `npm` or `npx`:** use `npm.cmd` / `npx.cmd` instead of changing execution policies.
- **Updating an older install:** `init` does not replace an existing Skill or `AGENTS.md`. Follow the controlled update steps in the [quick start](docs/QUICKSTART.md).

## Quick start

**Full kit** — open `README-DESARROLLO.md` in your project and tell your agent:

```text
Use the specspire skill. Read AGENTS.md, PROJECT.md and README-DESARROLLO.md.
I want to build [describe your project].
Identify the current phase, propose only the next action and explain how to verify it.
Avoid unnecessary frameworks, dependencies and infrastructure.
```

**Skill-only** — point the agent to the installed `SKILL.md` and describe the goal and constraints in chat. No CLI, `PROJECT.md`, `AGENTS.md` or project guide is assumed; the agent keeps context in the conversation and writes a context document only if you authorize it.

## How the workflow works

```text
Context → Specify → Plan & design → Tasks → Build → Verify → Deliver
```

Each phase ends with a gate backed by evidence, and depth adapts to the real scope: a form does not get microservices. Bugs skip the full cycle and follow **reproduce → diagnose → fix → regression-test**. Academic rubrics take precedence over defaults. See the phase-by-phase map in [docs/WORKFLOW.md](docs/WORKFLOW.md).

```text
my-project/
├── AGENTS.md
├── PROJECT.md
├── README-DESARROLLO.md
└── .agents/skills/specspire/
    ├── SKILL.md
    └── references/        # 15 references, loaded as needed
```

Feature documents under `specs/<feature>/` are created on demand. `doctor`, `status` and `next` check documents, not application correctness or UX quality.

## Documentation

> [!NOTE]
> This README is available in English and Spanish. The guides in `docs/`, the Skill, its references and the installed templates are written in Spanish. Full international support has not been verified.

| I want to… | Guide |
|---|---|
| Install and start a project | [Quick start](docs/QUICKSTART.md) |
| Understand the seven phases | [Workflow](docs/WORKFLOW.md) |
| Record evidence before approving | [Quality gates](docs/QUALITY.md) |
| Design an accessible, responsive UI | [UI/UX design](docs/DESIGN.md) |
| Look up a CLI command | [CLI reference](docs/CLI.md) |
| Understand the repository layout | [Architecture](docs/ARCHITECTURE.md) |
| Follow a worked example | [Academic form](examples/formulario-academico.md) |
| See sources and credits | [References](docs/REFERENCIAS.md) |

## Contributing, security and license

[Contributing](CONTRIBUTING.md) · [Security policy](SECURITY.md) · [Changelog](CHANGELOG.md) · [Publishing checklist](docs/PUBLISH.md) · [MIT License](LICENSE)
