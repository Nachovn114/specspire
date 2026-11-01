# Phase 1 · Understand and Specify

**Outcome:** `specs/<slug>/spec.md` with needs, scenarios and boundaries, without choosing architecture prematurely.

1. Read the request, the project, the existing code and the rubric. Summarize in a few lines what the user must achieve and **what is out of scope**.
2. Detect questions that would change behavior; ask only what is critical. Use `[ACLARAR: ...]` for pending uncertainties instead of assuming answers.
3. Extract stories and verifiable `RF-*` requirements. In each requirement write at least one **Given / When / Then** example; include an error/edge case where applicable.
4. Order by value: the first story must produce an end-to-end usable outcome, even with minimal UI or validation.
5. For academic activities, link requirements to the original rubric. Do not attribute non-existent criteria or scores.
6. Align domain vocabulary with real names; if terminology is complex and repeated, create `GLOSSARY.md` **only if it helps**.
7. If the feature captures personal data, identify categories, explicit purpose and jurisdiction; do not add privacy obligations if the feature does not process personal data.
8. Review the spec with the user in brief chunks before designing. Do not ask again about information that is already clear.

**Gate:** Verifiable requirements, finite scope, errors considered and zero blocking uncertainties. Do not install frameworks during this phase.

**Prompt:** "Turn this into verifiable acceptance criteria and a minimal MVP. Ask only critical decisions; state assumptions without inventing requirements."

