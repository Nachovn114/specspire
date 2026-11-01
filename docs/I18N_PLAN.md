# Specspire Internationalization (i18n) Strategy & Architecture

[English README](../README.md) · [Español README](../README.es.md) · [Workflow](en/WORKFLOW.md)

## Status and scope

Phase 1 documentation is complete. Phase 2 is implemented and tested locally on the bilingual branch, pending real-agent ES/EN pilots and branch CI. This is Unreleased work, not a bilingual capability shipped in historical v0.9.0-beta.1. Local tarball installation does not imply npm publication.

| Phase | Scope | Status |
|---|---|---|
| 1 | Bilingual READMEs, core guides and contribution guidance | Completed |
| 2 | 15 EN operational references, bilingual router, CLI integrity and distribution tests | Implemented locally; real-agent pilots and branch CI pending |
| 3 | English project templates and optional `specspire init --lang en` | Future; neither exists in Phase 2 |

## One Skill, progressive loading

Exactly one public Skill lives at `skills/specspire/`, with one `SKILL.md`. Spanish references remain in `references/`; their 15 English counterparts live in `references/en/`, with identical basenames. References are operational documents, not additional Skills with their own frontmatter.

Language priority:

1. Explicit user preference overrides project/request language: "Respond in English" selects `en`; "Responde en español" selects `es`.
2. Otherwise use the unambiguous language of the request and current project context. English technical terms within a Spanish request do not imply an English preference.
3. With insufficient signals or unresolved conflict, fall back to Spanish (`es`).

Load only references relevant to the phase and applicable disciplines, in the selected language. Do not automatically load both translations. ES/EN comparison is allowed for explicitly requested translation, equivalence audits or bilingual maintenance. This is an operational priority, not a guarantee of deterministic LLM behavior.

Use the negotiated language for explanations and appropriate artifacts while preserving filenames, identifiers and technical contracts. Existing CLI templates remain Spanish throughout Phase 2; do not promise English scaffolding.

## Verified local contracts

- `init`: 34 files — three project documents, one router, 15 ES and 15 EN references. Five progressive templates remain separate and are created on demand.
- `doctor`: exit 0 for a complete bilingual installation; 2 for a recognized legacy router requiring manual migration, with or without EN files; 1 for incomplete or invalid installations. Adding EN files does not update a legacy router.
- `validate-source`: one Skill, 30 references with 1:1 names and router links, three base templates and five progressive templates.
- Packaging: `skills/` already includes `references/en/` through the existing `package.json` files entry. No extra pattern is needed. The smoke test checks 60 reviewed files, 30 router links, 14 EN links, offline installation and preservation of custom content.
- Privacy tests preserve Spanish assertions and check English concepts, dates, jurisdiction boundaries and evidence controls. These checks are not legal certification or a new verification of statutory currency.

`init` never overwrites existing files, including `SKILL.md`. Follow the [controlled migration procedure](en/QUICKSTART.md#updating-an-existing-installation): backup, clean comparison, reviewed per-file integration and final diagnosis. Customized old routers may require manual integration even when their content is not recognized as the known legacy router. Symlink and traversal protections remain mandatory.

## Pending evidence

Run bilingual pilots with real agents and record agent/version, OS, source revision, prompt, files actually loaded, observed response language, gates, artifacts and limitations. Cover explicit overrides, unambiguous ES/EN, ambiguous input, Spanish requests with English technical terms, conditional privacy/UI and Skill-only use. Historical Antigravity Phase 0 evidence does not establish this branch's bilingual behavior or universal agent compatibility.

Run the branch CI matrix separately. Local Windows native symlink fixtures may be SKIPPED due to permissions; the strict CI policy remains unchanged. Full remote kit bootstrap and end-to-end production pilots remain unverified.
