# Contributing to Specspire

**English** · [Español](CONTRIBUTING.es.md) · [Back to README](README.md)

Improvements must demonstrate that they make the workflow **clearer and more reliable**, not merely larger or more complex.

1. Open an issue with the problem, a real-world scenario, and the expected outcome.
2. Work in a separate branch; keep the modification focused.
3. Update documentation and tests if installer behavior or file paths change.
4. Run `npm test`, `npm run check`, and `npm run test:package`; document any pending checks. On Windows PowerShell, use `npm.cmd`.
5. Submit the pull request structured as **problem → solution → evidence → risks**.

## Documentation Guidelines

- Write for someone opening the repository for the first time.
- Place the primary action before the theoretical explanation.
- Every guide must answer: **what to do**, **how to do it**, and **how to verify it worked**.
- Do not document non-existent commands or claim unverified compatibility.
- Use relative links, clear headings, and copyable examples.

## Third-Party Contributions & Licensing

To maintain the integrity and open-source nature of Specspire:

- **Right to Contribute:** Contributors must hold sufficient rights to the material they submit and agree that contributions intended for incorporation into Specspire can be distributed under the project's [MIT License](LICENSE).
- **External Licenses & Transparency:** Any reuse, adaptation, or translation of third-party documentation, code, or skill instructions must be clearly declared in the pull request. External license obligations must remain compatible with Specspire's distribution model. Copyleft licenses require case-by-case evaluation. All applicable copyright notices, upstream licenses, and enforceable conditions must be preserved.
- **Unauthorized Material & Secrets:** Unauthorized proprietary material must not be submitted. Contributions must never contain credentials, API keys, or real personal data.
- **Review Policy:** Submitting a pull request does not automatically certify the legal originality of the content; maintainers review all incoming contributions for technical quality, security, and licensing compatibility before merging.

## Testing & Quality Gates

Native symlink tests may report `BLOCKED` due to local platform permissions on Windows. These cases are not `PASS`: preserve the reported status and count. GitHub Actions CI requires their execution and fails if they remain blocked; to reproduce strict mode locally, set `SPECSPIRE_REQUIRE_NATIVE_LINKS=1` in your environment. Never alter global system execution policies to hide a failure.

`test:package` packs and installs offline in a temporary directory with an isolated cache; it prints its path and preserves test artifacts for inspection. It also verifies actual tarball contents: the Skill with its 15 references, templates, and linked guides must be present, and `docs/audits/` must be absent. It does not publish or install globally. The CI matrix covers Node 20.0.0, 22, and 24 on Linux, Windows, and macOS; only completed remote workflow runs allow declaring a combination verified. The `required` job serves as a mandatory gate for all pull requests.

## Historical Audits

Reports in `docs/audits/` (available only in the GitHub repository) record dated audits of the project. They represent historical evidence rather than operational agent instructions, and are excluded from the npm package via the `files` array in `package.json`. Do not rewrite past audit findings; add a new report when applicable and ensure no personal paths or secrets are included.
