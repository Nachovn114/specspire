# Security Policy

## Supported versions

Security fixes are targeted at the latest beta release until the first stable version.

## Reporting a vulnerability

Please do not publish exploitable details, credentials or private data in a public issue. If available, use the repository’s **Security → Report a vulnerability** private reporting feature. Otherwise contact the repository maintainer privately through an appropriate channel before disclosing details publicly.

## Scope

Specspire is a developer workflow tool. Review its scripts and project changes before execution. Never commit tokens, passwords or `.env` files containing secrets. Do not assume tests of the Specspire installer certify the security of applications built with AI agents.

Use a trusted project directory. The CLI rejects symbolic links and junctions in write destinations and ancestors, and creates final files exclusively. These checks are not an OS sandbox: a hostile process replacing ancestors concurrently can race path-based Node.js operations. Exclusive creation prevents overwriting a concurrently created final file; it does not guarantee confinement against hostile ancestor replacement. Do not run with elevated privileges on untrusted shared trees.

Security tests use directory junctions on Windows and directory symlinks on Unix. Native-link capability failures are reported as BLOCKED locally, never PASS; CI (or `SPECSPIRE_REQUIRE_NATIVE_LINKS=1`) fails on these blocks. No system privilege or global policy is changed by the tests.
