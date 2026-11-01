# Specspire Internationalization (i18n) Strategy & Architecture

[English README](../README.md) · [Español README](../README.es.md) · [Workflow](en/WORKFLOW.md)

This document outlines the architectural plan to extend Specspire's bilingual developer experience (English and Spanish) to `SKILL.md`, the 15 operational references, and project templates **without fracturing the single public Agent Skill contract**.

---

## 1. Architectural Challenge & Design Constraints

1. **Single Public Skill Guarantee:** Tools like `npx skills add` and native agent registries scan for a single public skill directory (`skills/specspire`). Specspire must maintain exactly ONE public skill. Creating parallel skills (e.g. `specspire-en` and `specspire-es`) breaks discovery, confuses package consumers, and fractures community tooling. Bilingual references must be loaded dynamically on demand under this single public skill router.
2. **Context Window Efficiency:** Merging English and Spanish inline into each reference would duplicate content within individual files, imposing an unnecessary token overhead on every agent turn. Separate, on-demand reference loading preserves context efficiency by loading only the active language when needed.
3. **Legal and Technical Precision:** References like `12-data-privacy-compliance.md` cite statutory definitions (e.g. Chilean Ley 19.628 / Ley 21.719, GDPR, LGPD). Translations must maintain exact legal fidelity and cannot rely on runtime agent improvisation.

---

## 2. Target Architecture

### A. Single Canonical Router (`SKILL.md`)
The single root `skills/specspire/SKILL.md` remains the sole entry point. It incorporates a **Language Negotiation Protocol** with a deterministic default:

```text
Deterministic Default & Negotiation Protocol:
1. Retaining Spanish (`es`) as the canonical default serves as a compatibility strategy for existing installations and projects; this compatibility cannot be assumed automatically and must be verified through regression testing.
2. The agent detects the user's preferred language from the prompt context (e.g. English vs. Spanish).
3. If explicitly configured or requested, the agent switches language context:
   - Spanish (canonical default): loads skills/specspire/references/<filename>.md
   - English:                      loads skills/specspire/references/en/<filename>.md
4. Respond, plan, and scaffold artifacts in the negotiated language.
```

Bilingual references are loaded dynamically on demand under the single public skill router, ensuring the agent only consumes tokens for the requested language reference.

### B. Mirrored Reference Directory Structure
```text
skills/specspire/
├── SKILL.md                       # Single public router with language negotiation
└── references/
    ├── 00-prepare.md              # Spanish canonical references (default)
    ├── 01-specify.md
    ├── ...
    ├── 12-data-privacy-compliance.md
    └── en/                        # 1:1 English mirrored references (on-demand)
        ├── 00-prepare.md
        ├── 01-specify.md
        ├── ...
        └── 12-data-privacy-compliance.md
```

### C. Language-Aware Templates
Project templates are scaffolded according to project configuration:
```text
templates/
├── AGENTS.md                      # Spanish base templates (default)
├── PROJECT.md
├── README-DESARROLLO.md
├── feature/
└── en/                            # English base templates
    ├── AGENTS.md
    ├── PROJECT.md
    ├── README-DEVELOPMENT.md
    └── feature/
```
The CLI command `specspire init` will support an optional `--lang <es|en>` parameter (defaulting deterministically to Spanish `es`).

---

## 3. Phased Implementation Roadmap

| Phase | Scope | Status | Impact on Code / Skill |
|---|---|---|---|
| **Phase 1 (Current)** | Bilingual READMEs (`README.md`, `README.es.md`), English core guides (`docs/en/QUICKSTART.md`, `docs/en/WORKFLOW.md`, `docs/en/QUALITY.md`), and i18n architectural roadmap. | **In Progress** | Documentation only; no changes to CLI or `skills/specspire/`. |
| **Phase 2** | Translation and validation of the 15 operational references under `skills/specspire/references/en/`. Router update in `SKILL.md` to dispatch language paths dynamically. Updating and verifying tool contracts (`doctor`, `validate-source`, test suites, and packaging). | Next iteration | Preserves 1 public skill; CLI and test assertions updated for bilingual reference parity. |
| **Phase 3** | English template translations in `templates/en/`. CLI support for `specspire init --lang en`. | Future release | Backward-compatibility strategy defaulting to `es` (to be confirmed through regression tests). |

---

## 4. Verification & Tool Contracts for Phase 2

When Phase 2 introduces English references, the following tool contracts must be updated and verified:

1. **CLI Diagnostic Routines (`doctor` and `validate-source`):**
   - Update `doctor` to recognize the mirrored `references/en/` directory without failing or reporting false missing references.
   - Update `validate-source` to verify structural parity (15 canonical references in Spanish, 15 mirrored references in English).
2. **Test Suites:**
   - Update existing test suites such as `tests/docs.test.mjs` and `tests/cli.test.mjs` (and create a dedicated test file such as `tests/skills.test.mjs` if needed) to validate that all 15 English references exist, have valid frontmatter/headings, and contain no broken relative links.
   - Preserve test assertions ensuring that exactly **one** public skill directory exists under `skills/`.
3. **Packaging Integrity (`tests/package-smoke.mjs` & `package.json`):**
   - Update `"files"` in `package.json` to include `"skills/specspire/references/en/*.md"`.
   - Update `tests/package-smoke.mjs` to verify that both Spanish and English reference sets are included in the published tarball.
4. **Agent Evaluation:**
   - Controlled testing in AI agents (Antigravity, Codex, Cursor) to ensure the router cleanly selects the appropriate reference without cross-language pollution.
