# Annex · Proportional Security, Reliability and Operations

**All projects:** No secrets in Git; validate external inputs; escape/sanitize according to context; handle errors without leaking data; justified and maintained dependencies. In shared environments, log out and do not save credentials.

**With accounts, permissions or personal data:** Review server-side access control, per-resource authorization, secure storage, information disclosure, sessions, rate limiting if risk warrants, and recovery flows. Do not substitute real policies with placeholders.

**With API/database:** Contracts and error handling, reversible migrations, concurrency, server-side validation, integration and backups if applicable. Do not store sensitive data in logs.

**With real deployment:** Environment variables, CI tests, rollback, health checks, monitoring and risk-proportionate alerting. In critical software, evaluate abuse, threat modeling, least privilege, audit logging and incident recovery. Do not claim legal compliance simply by installing tools.

**Exit gate:** Document executed controls, results and unresolved risks; do not turn optional controls into claims of absolute security.

