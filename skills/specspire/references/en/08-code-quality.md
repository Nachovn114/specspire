# Annex · Code Engineering and Design

**Consulted during implementation, review or refactoring; not to generate abstract folder structures from scratch.**

1. **Clear boundaries:** Each module has a concrete responsibility and a small interface. High cohesion and low coupling; do not invent generic layers or repositories without a proven need.
2. **Shared language:** Code names, interface, tests and specification express the same domain. If repeated ambiguity exists, maintain a short `GLOSSARY.md`; for lasting structural decisions create an ADR **only if it truly helps**.
3. **Change-based design:** Identify which functions change together; separate side effects from business rules where it simplifies testing and comprehension. Prefer clear code over trendy patterns.
4. **Pragmatic rigor:** Types or contracts where the stack supports them, agreed lint/format, explicit error handling, boundary validation, useful logs without sensitive data.
5. **Scoped refactoring:** When tests are green, eliminate real duplication, dead code, superfluous branches or misleading names. Do not rewrite unrelated modules or alter behavior during a refactor.
6. **Two-axis diff review:** (A) requirements and acceptance scenarios; (B) quality, complexity, tests, security and consistency. Distinct reviewers or separate passes with clean context when capacity exists.
7. **At wrap-up:** Show what was modified, why, what tests were executed and what risks remain. Do not accept "looks good" as evidence.

**Alerts:** Unjustified new dependencies, single-use abstractions, multiple sources of truth, hard-to-test functions, comments stating the obvious, and tests that verify only mocked interactions rather than observable behavior.

**Criterion:** Another developer can understand the change and modify it later with controlled risk.

