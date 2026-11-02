# Specspire — agent rules

1. **Entry point:** activate only `.agents/skills/specspire/SKILL.md`; it governs the workflow and determines which reference to load for each phase. Consult `PROJECT.md` and `README-DESARROLLO.md`.
2. **Priority:** user instructions, confirmed requirements or rubric, and security > current `spec.md` > project constraints > agent suggestions. Do not invent functionality.
3. **Existing project:** respect its architecture, conventions, and tests. If `.specify/` exists, preserve the official Spec Kit artifacts and do not duplicate specifications.
4. **Pace:** one verifiable action per turn. TDD, UI, stack, privacy, and security follow the Skill's rules; do not redefine them here.
5. **Evidence:** do not claim tests, builds, visual reviews, or security checks without actually performing them. A pending test is not a success.
6. **Human control:** no push, merge, deployment, destructive migrations, or actions that incur costs without permission.
7. **Brief closing update:** **Phase → Next action → Observed evidence → Blocker**.

<!-- Add your project's own rules below. Specspire does not overwrite this file when init is repeated. -->
