<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Nachovn114/specspire/main/assets/brand/logo-with-tagline-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Nachovn114/specspire/main/assets/brand/logo-with-tagline-light.svg">
    <img alt="Specspire — From prompt to proof" src="https://raw.githubusercontent.com/Nachovn114/specspire/main/assets/brand/logo-with-tagline-light.svg" width="560">
  </picture>
</p>

<p align="center">
  <strong>From prompt to proof. One Agent Skill for verifiable software engineering.</strong>
</p>

<p align="center">
  <a href="README.es.md">Español</a> •
  <a href="docs/en/QUICKSTART.md">Quick Start</a> (<a href="docs/QUICKSTART.md">es</a>) •
  <a href="docs/en/WORKFLOW.md">Workflow</a> (<a href="docs/WORKFLOW.md">es</a>) •
  <a href="docs/en/QUALITY.md">Quality</a> (<a href="docs/QUALITY.md">es</a>) •
  <a href="https://github.com/Nachovn114/specspire/blob/main/docs/BRAND.md">Brand</a> •
  <a href="https://github.com/Nachovn114/specspire/blob/main/docs/case-studies/TASKFLOW_ES_CASE_STUDY.md">Case Studies</a>
</p>

<p align="center">
  <a href="https://github.com/Nachovn114/specspire/actions/workflows/ci.yml"><img src="https://github.com/Nachovn114/specspire/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/node-%3E%3D20-339933" alt="Node.js 20+">
</p>

Specspire stops AI coding agents from jumping straight to code, inventing unrequested architecture, or hallucinating test runs. It provides a single Agent Skills standard entrypoint (`SKILL.md`) that dynamically routes to 30 on-demand references across seven disciplined phases.

---

## Quick Install

Add the verified Agent Skill to your repository or agent environment:

```bash
npx skills add Nachovn114/specspire --skill specspire
```

Requires Node.js `>= 22.20.0` for the `skills` CLI installer. Alternatively, copy `skills/specspire/` into your agent's skills directory.

---

## Try It

Once installed, prompt your agent in any conversation:

```text
Use the specspire skill. Review our project goals and identify the current phase before writing any code.
```

Your agent steps back, adopts the 4-line protocol, and establishes boundaries before touching files:

```text
Phase: 0 · Context & Discovery
Next action: Review problem statement, target users, and non-goals in conversation.
Verification: Confirm agreed scope with developer before creating any files.
Blockers: None.
```

---

## How It Works

Specspire organizes software development into seven verifiable phases with human approval gates:

```text
Context → Specify → Plan & Design → Tasks → Build (TDD) → Verify → Deliver
```

1. **Context (`PROJECT.md`):** Problem boundaries, target users, constraints, and explicit non-goals.
2. **Specify (`spec.md`):** User stories with observable acceptance criteria and edge cases.
3. **Plan & Design (`plan.md`, `design.md`):** Minimal architecture, stack justification, and [responsive UI tokens](docs/DESIGN.md).
4. **Tasks (`tasks.md`):** Vertical, verifiable work slices with testable completion gates.
5. **Build (TDD):** Strict RED → GREEN → REFACTOR cycles; tests fail on requirements, not import crashes.
6. **Verify (`review.md`):** Reconcile requirements against diff; execute [quality gates](docs/QUALITY.md) and privacy controls (P01–P06).
7. **Deliver:** Reproducible execution commands, cold-start runbooks, and audit receipts.

---

## Skill-only vs Full Kit

Specspire adapts to how you work:

| Feature | Skill-only Mode | Full Kit Mode |
|---|---|---|
| **Best for** | Fast adoption in any coding agent chat | Complete repository specification management |
| **Setup command** | `npx skills add Nachovn114/specspire --skill specspire` | `node ./bin/specspire.mjs init --lang en` |
| **Files installed** | `.agents/skills/specspire/` (Skill + 30 references) | Skill + CLI (`doctor`, `next`, `feature`) + 16 templates |
| **Context storage** | Conversational chat memory | Markdown documents (`PROJECT.md`, `AGENTS.md`, `specs/`) |
| **Overwrites files** | Never | Never; existing project files are preserved |

---

## Real-World Examples

Specspire was tested and validated on real-world reference implementations:

- [**TaskFlow ES Case Study**](https://github.com/Nachovn114/specspire/blob/main/docs/case-studies/TASKFLOW_ES_CASE_STUDY.md): Responsive web client (320px–1440px), client-side privacy controls (P01–P06), and Vitest/Playwright E2E suites.
- [**LogLens CLI Case Study**](https://github.com/Nachovn114/specspire/blob/main/docs/case-studies/LOGLENS_CLI_CASE_STUDY.md): High-throughput streaming log parser with zero runtime dependencies, POSIX CLI, and 40 Node.js test runner assertions.

---

## Documentation

| Guide | English | Español |
|---|---|---|
| Quick Start | [docs/en/QUICKSTART.md](docs/en/QUICKSTART.md) | [docs/QUICKSTART.md](docs/QUICKSTART.md) |
| Seven-Phase Workflow | [docs/en/WORKFLOW.md](docs/en/WORKFLOW.md) | [docs/WORKFLOW.md](docs/WORKFLOW.md) |
| Quality Gates & Evidence | [docs/en/QUALITY.md](docs/en/QUALITY.md) | [docs/QUALITY.md](docs/QUALITY.md) |
| Responsive UI Standards | [docs/DESIGN.md](docs/DESIGN.md) | [docs/DESIGN.md](docs/DESIGN.md) |
| CLI & Scaffolding | [docs/CLI.md](docs/CLI.md) | [docs/CLI.md](docs/CLI.md) |
| Brand Identity Manual | <a href="https://github.com/Nachovn114/specspire/blob/main/docs/BRAND.md">docs/BRAND.md</a> | <a href="https://github.com/Nachovn114/specspire/blob/main/docs/BRAND.md">docs/BRAND.md</a> |

---

## Compatibility & Requirements

- **Runtime:** Node.js `>= 20.0.0` (LTS 20, 22, 24). Zero runtime dependencies (`dependencies: {}`).
- **Skills Installer:** `npx skills` requires Node.js `>= 22.20.0`.
- **Platform Matrix:** Validated across Ubuntu, macOS, and Windows.

| Platform / Agent | Status | Notes |
|---|---|---|
| **T3 Code / Antigravity ACP** | PASS | Full 7-phase lifecycle verified across web and CLI reference pilots. |
| **Google Antigravity** | PASS | Interactive discovery and multi-scenario phase routing verified. |
| **CI Matrix (Linux / Windows / macOS)** | PASS | Automated unit, CLI, package, and link test matrix on Node.js 20, 22, 24. |
| **OpenAI Codex** | BLOCKED | CLI 0.166.0 & Skill structure verified; live inference blocked by account quota. |
| **Claude Code / Cursor** | NOT VERIFIED | Standard Agent Skills format compatible; no live automated execution verified. |

---

## Contributing, Security and License

Specspire is an open-source project welcoming community participation:

- [Contributing Guide](CONTRIBUTING.md) ([es](CONTRIBUTING.es.md))
- [Security Policy](SECURITY.md)
- [Changelog](CHANGELOG.md)
- [Brand Guidelines](https://github.com/Nachovn114/specspire/blob/main/docs/BRAND.md)
- [MIT License](LICENSE)
