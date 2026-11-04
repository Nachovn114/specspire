# Specspire Internationalization (i18n) Strategy & Architecture

[English README](../README.md) · [Español README](../README.es.md) · [Workflow](en/WORKFLOW.md)

## Status and scope

The internationalization (i18n) roadmap for Specspire is fully delivered and operational in stable release `v1.0.0`. The system operates with a single unified Skill router, 30 bilingual technical references (15 ES + 15 EN), and 16 bilingual project and feature templates.

| Component | Scope | Status |
|---|---|---|
| Core Onboarding | Bilingual READMEs, core guides, workflow, and quality policies | COMPLETED (v1.0.0) |
| Operational References | 15 ES references in `references/` and 15 EN references in `references/en/` with router routing | COMPLETED (v1.0.0) |
| Project Scaffolding | Bilingual project templates (`--lang es` / `--lang en`) and progressive feature templates | COMPLETED (v1.0.0) |

## One Skill, progressive loading

Exactly one public Skill lives at `skills/specspire/`, with one `SKILL.md`. Spanish references remain in `references/`; their 15 English counterparts live in `references/en/`, with identical basenames. References are operational documents, not additional Skills with their own frontmatter.

Language priority:

1. Explicit user preference overrides project/request language: "Respond in English" selects `en`; "Responde en español" selects `es`.
2. Otherwise use the unambiguous language of the request and current project context. English technical terms within a Spanish request do not imply an English preference.
3. With insufficient signals or unresolved conflict, fall back to Spanish (`es`).

Load only references relevant to the phase and applicable disciplines, in the selected language. Do not automatically load both translations. ES/EN comparison is allowed for explicitly requested translation, equivalence audits or bilingual maintenance. This is an operational priority, not a guarantee of deterministic LLM behavior.

Use the negotiated language for explanations and appropriate artifacts while preserving filenames, identifiers and technical contracts.

Eight original ES templates and eight EN counterparts are available. `init` installs 34 files, not 42: three documents in the selected language, one router and 30 references. The package tarball contains 68 files. Spanish is the default. Use `init --lang en` and repeat `--lang en` for every `feature` command. Language is not persisted or inferred; existing documents are preserved, never automatically translated. CLI selection accepts only `--lang es|en` on init and feature; it is independent of agent language negotiation.

## Verified local contracts

- `init`: 34 files — three project documents, one router, 15 ES and 15 EN references. Five progressive templates remain separate and are created on demand.
- `doctor`: exit 0 for a complete bilingual installation; 2 for a recognized legacy router requiring manual migration, with or without EN files; 1 for incomplete or invalid installations. Adding EN files does not update a legacy router.
- `validate-source`: one Skill, 30 references with 1:1 names and router links, three base templates and five progressive templates per language (16 total).
- Packaging: `skills/` already includes `references/en/` through the existing `package.json` files entry. No extra pattern is needed. The smoke test checks 68 reviewed files (60 in Phase 2), 30 router links, 14 EN links, offline installation and preservation of custom content.
- Privacy tests preserve Spanish assertions and check English concepts, dates, jurisdiction boundaries and evidence controls. These checks are not legal certification or a new verification of statutory currency.

`init` never overwrites existing files, including `SKILL.md`. Follow the [controlled migration procedure](en/QUICKSTART.md#updating-an-existing-installation): backup, clean comparison, reviewed per-file integration and final diagnosis. Customized old routers may require manual integration even when their content is not recognized as the known legacy router. Symlink and traversal protections remain mandatory.

## Evaluation evidence and remaining limits

Phase 2 empirical pilots evaluated real agent behavior across bilingual scenarios:
- **Codex:** 2 PASS, 5 BLOCKED due to environment API quota limits.
- **Gemini 3.8 Flash (in Google Antigravity):** 6 PASS, 1 NOT VERIFIED (attributed to harness tool isolation in an unseeded run).
- **Spanish fallback under completely ambiguous input:** remains NOT VERIFIED.

For Phase 2 only, post-merge GitHub Actions CI verified cross-platform compatibility across 9 matrix jobs (Ubuntu, Windows, macOS on Node.js 20.0.0, 22, and 24) plus the required gate. On local Windows development without elevated privileges, 3 native symlink security fixtures may be reported as SKIPPED (`BLOCKED`); in CI, `SPECSPIRE_REQUIRE_NATIVE_LINKS=1` mandates running them without exception. Full remote kit bootstrap (`npm exec github:`) and full end-to-end production pilots remain unverified.
