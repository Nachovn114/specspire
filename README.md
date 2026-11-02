# Specspire

**From prompt to proof.** One bilingual Agent Skill for spec-driven planning, test-first development, code review, and evidence-based software delivery.

[Español](README.es.md) • [Quick start](docs/en/QUICKSTART.md) ([es](docs/QUICKSTART.md)) • [Workflow](docs/en/WORKFLOW.md) ([es](docs/WORKFLOW.md)) • [Quality](docs/en/QUALITY.md) ([es](docs/QUALITY.md)) • [Case Study](https://github.com/Nachovn114/specspire/blob/main/docs/case-studies/TASKFLOW_ES_CASE_STUDY.md)

[![CI](https://github.com/Nachovn114/specspire/actions/workflows/ci.yml/badge.svg)](https://github.com/Nachovn114/specspire/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Node.js 20+](https://img.shields.io/badge/node-%3E%3D20-339933)
![Status: beta](https://img.shields.io/badge/status-beta-orange)

```bash
# Add the verified Agent Skill to your project:
npx skills add Nachovn114/specspire --skill specspire
```

> **Beta Notice:** Automated CI matrix passes across Ubuntu, Windows, and macOS (Node.js 20, 22, 24). Remote skill installation and Phase 0 activation in Google Antigravity are verified. Full remote kit bootstrap and unverified agents remain **NOT VERIFIED**. See [Changelog](CHANGELOG.md) for full audit history.

## Why Specspire

AI coding agents tend to jump straight to code, invent unrequested architecture, and claim tests passed that never ran. Specspire gives agents a single `SKILL.md` entrypoint that routes dynamically to 30 on-demand references (15 English + 15 Spanish) across seven disciplined phases.

```text
Context ➔ Specify ➔ Plan & Design ➔ Tasks ➔ Build (TDD) ➔ Verify ➔ Deliver
```

1. **Context (`PROJECT.md`):** Problem boundaries, users, and non-goals.
2. **Specify (`spec.md`):** Observable acceptance criteria and edge cases.
3. **Plan & Design (`plan.md`, `design.md`):** Minimal architecture and [responsive UI tokens](docs/DESIGN.md).
4. **Tasks (`tasks.md`):** Vertical, verifiable slices with testable gates.
5. **Build (TDD):** Strict RED ➔ GREEN ➔ REFACTOR cycles; real assertions only.
6. **Verify (`review.md`):** Reconcile requirements against reality; [quality gates](docs/QUALITY.md).
7. **Deliver:** Reproducible commands, audit receipts, and clean handover.

## Getting Started

- **Remote Skill (Recommended):** Run `npx skills add Nachovn114/specspire --skill specspire` and point your agent to `.agents/skills/specspire/SKILL.md`. See [Quickstart](docs/QUICKSTART.md).
- **Skill-only:** Use `SKILL.md` directly in conversation without installing local project files.
- **Full Kit (Source):** Run `node ./bin/specspire.mjs init --lang en` and `doctor` to scaffold project templates. See [CLI Reference](docs/CLI.md).

```text
Prompt your agent:
"Use the specspire skill. Read AGENTS.md and PROJECT.md.
I want to build [feature]. Identify the current phase, propose the next action, and how to verify it."
```

## Verified Compatibility & Showcase

| Platform / Agent | Status | Notes |
|---|---|---|
| **Google Antigravity** | PASS | Verified interactive discovery and multi-scenario phase routing. |
| **CI Matrix (Linux / Windows / macOS)** | PASS | Automated test matrix on Node.js 20, 22, and 24. |
| **Codex / Claude Code / Cursor** | NOT VERIFIED | Standard Skill format compatible; formal pilot pending. |

Explore our real-world pilot: [TaskFlow ES Case Study](https://github.com/Nachovn114/specspire/blob/main/docs/case-studies/TASKFLOW_ES_CASE_STUDY.md) demonstrates responsive UI (320px–1920px), privacy controls, and TDD evidence receipts.

## Documentation

| Guide | English | Español |
|---|---|---|
| Quick Start | [docs/en/QUICKSTART.md](docs/en/QUICKSTART.md) | [docs/QUICKSTART.md](docs/QUICKSTART.md) |
| Seven-Phase Workflow | [docs/en/WORKFLOW.md](docs/en/WORKFLOW.md) | [docs/WORKFLOW.md](docs/WORKFLOW.md) |
| Quality Gates & Evidence | [docs/en/QUALITY.md](docs/en/QUALITY.md) | [docs/QUALITY.md](docs/QUALITY.md) |
| Responsive UI Standards | [docs/DESIGN.md](docs/DESIGN.md) | [docs/DESIGN.md](docs/DESIGN.md) |
| CLI & Scaffolding | [docs/CLI.md](docs/CLI.md) | [docs/CLI.md](docs/CLI.md) |

[Contributing](CONTRIBUTING.md) • [Security](SECURITY.md) • [Changelog](CHANGELOG.md) • [MIT License](LICENSE)
